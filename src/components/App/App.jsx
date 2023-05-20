import {useEffect, useState} from "react";
import {ToastContainer} from 'react-toastify';

import {SearchBar} from "../Searchbar/Searchbar";
import {ImageGallery} from "../ImageGallery/ImageGallery";
import {getSearch} from "../../services/api";
import {Loader} from "../Loader/Loader";
import {Button} from "../Button/Button";
import {Modal} from "../Modal/Modal";

import css from './App.module.css'

export const App = () => {
  const [imageName, setImageName] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [alt, setAlt] = useState('');
  const [empty, setEmpty] = useState(false);

  const handleFormSubmit = imageName => {
    setImageName(imageName);
    setImages([]);
    setPage(1);
    setTotal(1);
    setLoading(false);
    setError(null);
    setEmpty(false);
  };

  const clickLoad = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = (largeImageURL, alt) => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
    setAlt(alt);
  };

  const closeModal = () => {
    setShowModal(!showModal);
  };

  // Было так
  // fetchImages = (text, page) => {
  //     this.setState({loading: true});
  //
  //     getSearch(text, page)
  //       .then(resp => resp.json())
  //       .then(data => {
  //
  //         if (data.hits.length === 0) {
  //           this.setState({empty: true});
  //         }
  //         this.setState(prevState => ({
  //           page: prevState.page,
  //           images: [...prevState.images, ...data.hits],
  //           total: data.total,
  //         }));
  //       })
  //       .catch(error => {
  //         this.setState({error: error.message});
  //       })
  //       .finally(() => {
  //         this.setState({loading: false});
  //       });
  //   };

  //  я переделала функцию с хуком соответственно к переделанному коду на axios в api.js
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getSearch();
        setImages(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();

  }, []);

  // НО ЭТО НЕ РАБОТАЕТ! 😭
  // Как пееределать следующий блок - тоже понятия не имею 😔

  componentDidUpdate(prevProps, prevState, snapshot)
  {
    if (
      prevState.imageName !== this.state.imageName ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages(this.state.imageName, this.state.page);
    }
  }
  return (
    <div className={css.App}>
      <ToastContainer/>
      <SearchBar onSubmit={handleFormSubmit}/>
      {error && (
        <h2 style={{textAlign: 'center'}}>
          Something went wrong: ({error})!
        </h2>
      )}
      <ImageGallery toggleModal={openModal} images={images}/>
      {loading && <Loader/>}
      {empty &&
        <h2
          style={{textAlign: 'center'}}>
          There are no pictures for your request "{imageName}"</h2>}
      {total / 12 > page && <Button clickLoad={clickLoad}/>}
      {showModal && (
        <Modal closeModal={closeModal}>
          <img src={largeImageURL} alt={alt}/>
        </Modal>
      )}
    </div>
  )
}


// старый код, классовый компонент
// export class App extends Component {
//   state = {
//     imageName: '',
//     images: [],
//     page: 1,
//     total: 1,
//     loading: false,
//     error: null,
//     showModal: false,
//     empty: false,
//   }
//   handleFormSubmit = imageName => {
//     this.setState({
//       imageName,
//       images: [],
//       page: 1,
//       total: 1,
//       loading: false,
//       error: null,
//       empty: false
//     });
//   };
//   fetchImages = (text, page) => {
//     this.setState({loading: true});
//
//     getSearch(text, page)
//       .then(resp => resp.json())
//       .then(data => {
//
//         if (data.hits.length === 0) {
//           this.setState({empty: true});
//         }
//         this.setState(prevState => ({
//           page: prevState.page,
//           images: [...prevState.images, ...data.hits],
//           total: data.total,
//         }));
//       })
//       .catch(error => {
//         this.setState({error: error.message});
//       })
//       .finally(() => {
//         this.setState({loading: false});
//       });
//   };
//   clickLoad = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };
//
//   openModal = (largeImageURL, alt) => {
//     this.setState(({showModal}) => {
//       return {showModal: !showModal, largeImageURL, alt};
//     });
//   };
//   closeModal = () => {
//     this.setState(({showModal}) => {
//       return {showModal: !showModal};
//     });
//   };
//
//   componentDidUpdate(prevProps, prevState, snapshot) {
//
//     if (
//       prevState.imageName !== this.state.imageName ||
//       prevState.page !== this.state.page
//     ) {
//       this.fetchImages(this.state.imageName, this.state.page);
//     }
//   }
//
//   render() {
//     const {imageName, error, loading, images, total, page, empty, showModal} = this.state;
//     return (
//       <div className={css.App}>
//         <ToastContainer/>
//         <SearchBar onSubmit={this.handleFormSubmit}/>
//         {error && (
//           <h2 style={{textAlign: 'center'}}>
//             Something went wrong: ({error})!
//           </h2>
//         )}
//         <ImageGallery toggleModal={this.openModal} images={images}/>
//         {loading && <Loader/>}
//         {empty &&
//           <h2
//             style={{textAlign: 'center'}}>
//             There are no pictures for your request "{imageName}"</h2>}
//         {total / 12 > page && <Button clickLoad={this.clickLoad}/>}
//         {showModal && (
//           <Modal closeModal={this.closeModal}>
//             <img src={this.state.largeImageURL} alt={this.state.alt}/>
//           </Modal>
//         )}
//       </div>
//
//     )
//   }
// }
