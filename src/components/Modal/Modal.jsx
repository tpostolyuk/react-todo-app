import React, { useState } from 'react'
import s from './Modal.module.scss'

const useModal = initial => {
  const [open, setOpen] = useState(initial);
  const toggleModal = () => setOpen(!open);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  return [open, toggleModal, openModal, closeModal];
};

export const Modal = ({ title, description }) => {
  const [open, closeModal] = useModal(false);
  if (open) {
    return (
      <div className={s.overlay}>
        <div className={s.modal}>
          <div>
            <h1>{title}</h1>
            <h1>{description}</h1>
          </div>
          <div>
            <h1 onClick={closeModal}>Close</h1>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};