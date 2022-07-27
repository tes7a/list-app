import React from 'react';
import { useSelector } from 'react-redux';
import { AppRootType } from '../../bll/store';
import s from './Modal.module.scss';

type ModalType = {
    // eslint-disable-next-line no-unused-vars
  setShow: (value: boolean) => void,
}

function Modal({ setShow }: ModalType) {
  const modalData = useSelector<AppRootType, string[] | null>((state) => state.list.modalData);

  const closeModal = () => {
    setShow(false);
  };

  return (
    <div className={s.modal}>
      <div className={s.modal_container}>
        <button className={s.modal_close_btn} type="button" onClick={closeModal}>X</button>
        <div className={s.modal_data}>
          {modalData}
        </div>
      </div>
    </div>

  );
}

export default Modal;
