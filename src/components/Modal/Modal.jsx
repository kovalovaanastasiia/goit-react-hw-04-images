import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ closeModal, children }) => {
  useEffect(() => {
    const keyDown = event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', keyDown);

    return () => {
      window.removeEventListener('keydown', keyDown);
    };
  }, [closeModal]);

  const handleClose = event => {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  };

  return createPortal(
    <div onClick={handleClose} className={css.Overlay}>
      <div className={css.Modal}>{children}</div>
    </div>,
    modalRoot
  );
};
