import React, {
  FunctionComponent,
  useEffect,
  // useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { Card } from '../Card';
import {
  deletePhoto,
  falseLoadingPhotoAsync,
  selectOnFill,
  selectOnFillLoadingStatus,
  selectVisible,
} from '../../features/Photo/photoSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import './Container.scss';
import { selectOptionsHeight, selectOptionsWidth } from '../../features/Options/optionSlice';

export const Container: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const onFill = useAppSelector(selectOnFill);
  const onFillStatus = useAppSelector(selectOnFillLoadingStatus);
  const photos = useAppSelector(selectVisible);
  const widthCard = useAppSelector(selectOptionsWidth);
  const heightCard = useAppSelector(selectOptionsHeight);

  const [countPlaces, setCountPlaces] = useState(0);

  const widthWindow = window.innerWidth < 1280 ? window.innerWidth : 1280;
  const countW = Math.floor((widthWindow - 40 + 20) / (widthCard + 20));

  const heightWindow = window.innerHeight - 66 - 40 - 24.900 * 2;
  const countH = Math.floor((heightWindow + 20) / (heightCard + 20));

  useEffect(() => {
    if (onFill && onFillStatus === 'idle' && photos.length < countPlaces) {
      dispatch(falseLoadingPhotoAsync());
    }
  });

  useEffect(() => {
    setCountPlaces(countW * (countH + 1));

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    document.addEventListener('scroll', () => scrollHandler);

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return () => document.removeEventListener('scroll', () => scrollHandler);
  }, []);

  const scrollHandler = (
    e: { target: { documentElement: { scrollHeight: number; scrollTop: number; }; }; },
  ) => {
    if (e.target.documentElement.scrollHeight
    - window.innerHeight
    - e.target.documentElement.scrollTop < 100
    && onFill) {
      setCountPlaces(countPlaces + countW);
    }
  };

  return (
    <>
      <ul
        className={classNames('Container')}
      >
        {photos.map(el => (
          <li key={el.requestId || el.id}>
            <Card
              content={el}
              onCross={() => dispatch(deletePhoto(el.id))}
            />
          </li>
        ))}
      </ul>
    </>
  );
};
