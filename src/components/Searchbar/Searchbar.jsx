import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImSearch } from 'react-icons/im';
import css from './SearchBar.module.css';


export const SearchBar = ({ onSubmit }) => {
  const [imageName, setImageName] = useState('');

  const handleNameChange = event => {
    setImageName(event.currentTarget.value.toLowerCase());
  };

  const resetForm = () => {
    setImageName('');
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (imageName.trim() === '') {
      toast.warn('Enter the name of images or photos!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      return;
    }
    onSubmit(imageName);
    resetForm();
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.Form} onSubmit={handleSubmit}>
        <button type="submit" className={css.Button}>
          <ImSearch />
        </button>
        <input
          className={css.Input}
          type="text"
          value={imageName}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
};
