import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { useAppSelector } from '../../app/hooks';
import { selectOptionsBorderRadius, selectOptionsHeight, selectOptionsWidth } from '../../features/Options/optionSlice';
import { PhotoElement } from '../../type/PhotoElement';
import './Card.scss';

interface CardProps {
  content: PhotoElement;
  onCross: () => void;
}

export const Card: FunctionComponent<CardProps> = ({
  content,
  // onCross,
}) => {
  const {
    // id,
    author,
    // url,
    download_url,
    status,
  } = content;

  const cardStyle = {
    width: useAppSelector(selectOptionsWidth),
    minWidth: '200px',
    // 'width' : !download_url ? '200px' : '',
    height: useAppSelector(selectOptionsHeight),
    borderRadius: useAppSelector(selectOptionsBorderRadius),
    backgroundImage: `url(${download_url})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div
      className={classNames('Card',
        { CardLoader: status === 'loading' })}
      style={cardStyle}
    >
      { status === 'loading' && (
        <div className="CardLoader__content" />
      )}

      {(status === 'idle') && (
        <div className="Card--visible">
          <div className="Card__title">{author}</div>

          {/* <div
            className="Card__button-cross"
            onClick={onCross}
            onKeyPress={onKeyPressHandler}
            role="button"
          >
          </div> */}
        </div>
      )}
    </div>
  );
};
