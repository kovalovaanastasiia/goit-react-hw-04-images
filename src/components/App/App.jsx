import React, {useState, useEffect} from 'react';
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
  const [empty, setEmpty] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [alt, setAlt] = useState('');

  const fetchImages = async (text, page) => {
    setLoading(true);

    try {
      const response = await getSearch(text, page);
      if (response.data.hits.length === 0) {
        setEmpty(true);
      }
      setImages((prevImages) => [...prevImages, ...response.data.hits]);
      setTotal(response.data.total);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (imageName !== '' || page !== 1) {
      fetchImages(imageName, page);
    }
  }, [imageName, page]);

  const handleFormSubmit = (imageName) => {
    setImageName(imageName);
    setImages([]);
    setPage(1);
    setTotal(1);
    setLoading(false);
    setError(null);
    setEmpty(false);
  };

  const clickLoad = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (largeImageURL, alt) => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
    setAlt(alt);
  };

  const closeModal = () => {
    setShowModal(false);
  };

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
      {empty && (
        <h2 style={{textAlign: 'center'}}>
          There are no pictures for your request "{imageName}"
        </h2>
      )}
      {total / 12 > page && <Button clickLoad={clickLoad}/>}
      {showModal && (
        <Modal closeModal={closeModal}>
          <img src={largeImageURL} alt={alt}/>
        </Modal>
      )}
    </div>
  );
};
