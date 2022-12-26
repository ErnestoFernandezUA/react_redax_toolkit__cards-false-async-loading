import React, { FunctionComponent, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch } from '../../app/hooks';
import { restoreAll, restorePhoto } from '../../features/Photo/photoSlice';
import { PhotoElement } from '../../type/PhotoElement';
import { Card } from '../Card';
import './Modal.scss';

interface ModalProps {
  closeModal: (value: boolean) => void;
  content: PhotoElement[];
}

const Modal: FunctionComponent<ModalProps> = ({
  closeModal,
  content,
}) => {
  const dispatch = useAppDispatch();
  const restore = (id:string | null) => (id ? dispatch(restorePhoto(id)) : null);
  const [isEmpty, setIsEmpty] = useState(false);

  const onRestore = () => {
    if (!content.length) {
      setIsEmpty(true);
      setTimeout(() => setIsEmpty(false), 3000);
    } else {
      dispatch(restoreAll());
    }
  };

  return (
    <div className="Modal">
      <div className="Modal__header">
        <h2>Deleted</h2>

        <div className="Modal__container">
          <button
            type="button"
            onClick={() => closeModal(false)}
            className={classNames('Modal__button', 'button')}
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => onRestore()}
            className={classNames('Modal__button', 'button')}
          >
            Restore All
          </button>
        </div>
      </div>

      {isEmpty && <h2 className="Modal__title-empty">Deleted is empty</h2>}

      <ul className="Modal__list">
        {content.map((item: PhotoElement) => (
          <li key={item.id || item.requestId}>
            <Card
              content={item}
              onCross={() => restore(item.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Modal;
