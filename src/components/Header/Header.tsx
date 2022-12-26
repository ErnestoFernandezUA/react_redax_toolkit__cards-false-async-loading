import React, {
  FunctionComponent,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { persistor } from '../../app/store';
import { setVisible, selectIsVisibleOptions, someFunction } from '../../features/Options/optionSlice';
import {
  clear,
  deletePhoto,
  falseLoadingPhotoAsync,
  selectOnFill,
  setOnFill,
} from '../../features/Photo/photoSlice';
import { selectServerStorage } from '../../features/Server/serverSlice';
import './Header.scss';
import '../../layout/button.scss';

export const Header: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const isVisibleOptions = useAppSelector(selectIsVisibleOptions);
  const onFillByThunk = useAppSelector(selectOnFill);
  const isOptionsVisible = useAppSelector(selectIsVisibleOptions);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // eslint-disable-next-line no-console
  console.log(useAppSelector(selectServerStorage));

  const onFillCallBack = () => dispatch(falseLoadingPhotoAsync());
  const [onFillSetTimeOut, setOnFillSetTimeOut] = useState(false);

  const startOnFillSetTimeOut = (status: boolean) => {
    if (status) {
      timerRef.current = setInterval(onFillCallBack, 3000);
    } else {
      clearInterval(timerRef.current as NodeJS.Timeout);
    }
  };

  const onFillHandler = (status: boolean) => {
    setOnFillSetTimeOut(!status);
    startOnFillSetTimeOut(!status);
  };

  const purge = () => {
    persistor.purge();
    window.location.reload();
  };

  return (
    <header className="Header">
      <button
        type="button"
        onClick={() => dispatch(falseLoadingPhotoAsync())}
        className={classNames('Header__button', 'button')}
      >
        Add
      </button>

      <button
        type="button"
        onClick={() => dispatch(deletePhoto())}
        className={classNames('Header__button', 'button')}
      >
        Delete
      </button>

      <button
        type="button"
        onClick={() => {
          dispatch(setOnFill(!onFillByThunk));
        }}
        className={classNames('Header__button', 'button',
          { 'button--active': onFillByThunk })}
      >
        FillByThunk
      </button>

      <button
        type="button"
        onClick={() => onFillHandler(onFillSetTimeOut)}
        className={classNames('Header__button', 'button',
          { 'button--active': onFillSetTimeOut })}
      >
        FillBySetTimeInterval
      </button>

      <button
        type="button"
        onClick={() => dispatch(clear())}
        className={classNames('Header__button', 'button')}
      >
        Clear
      </button>

      <button
        type="button"
        onClick={() => dispatch(setVisible(!isVisibleOptions))}
        className={classNames('Header__button', 'button',
          { 'button--active': isOptionsVisible })}
      >
        Options
      </button>

      <button
        type="button"
        onClick={() => dispatch(someFunction())}
        className={classNames('Header__button', 'button')}
      >
        Show Deleted
      </button>

      <button
        type="button"
        onClick={() => purge()}
        className={classNames('Header__button', 'button')}
      >
        Purge
      </button>
    </header>
  );
};
