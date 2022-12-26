import React, { FunctionComponent } from 'react';
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
            onClick={() => dispatch(restoreAll())}
            className={classNames('Modal__button', 'button')}
          >
            Restore All
          </button>
        </div>
      </div>

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
