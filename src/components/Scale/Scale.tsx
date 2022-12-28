import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import React, { FunctionComponent, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import './Scale.scss';

interface ScaleProps {
  title: string;
  min: number;
  max: number;
  currentSelector: (State: RootState) => number;
  setCurrent: ActionCreatorWithPayload<number, string>;
}

const array = [
  '#48ff05',
  '#6aff00',
  '#98ff00',
  '#b9ff01',
  '#dcf600',
  '#daf601',
  '#e5c808',
  '#f09900',
  '#f52f02',
  '#bf3217',
];

export const Scale: FunctionComponent<ScaleProps> = ({
  title,
  min,
  max,
  currentSelector,
  setCurrent,
}) => {
  const dispatch = useAppDispatch();

  const width = 250;
  const current: number = useAppSelector(currentSelector);

  const currentValue = useCallback((i: number) => min + (((max - min) * i) / 10), []);

  const styleButton = (item: string, i: number) => ({
    width: width / 10,
    backgroundColor: item,
    opacity: currentValue(i) < current ? 1 : 0.5,
  });

  const onButton = (i: number) => {
    dispatch(setCurrent(min + (((max - min) * i) / 10)));
  };

  return (
    <div
      className="Scale"
    >
      <div className="Scale__title">{title}</div>
      <div
        className="Scale__base"
      >
        {array.map((item, i) => (
          <button
            type="button"
            className="Scale__button"
            onClick={() => onButton(i + 1)}
            key={item}
            style={styleButton(item, i)}
          >
          </button>
        ))}
      </div>

      <div
        className="Scale__current-value"
      >
        {current}
      </div>
    </div>
  );
};
