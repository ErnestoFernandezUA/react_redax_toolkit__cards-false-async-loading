import React, {
  FunctionComponent,
} from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectOptionsHeight,
  selectOptionsWidth,
  selectIsVisibleOptions,
  setHeight,
  setWidth,
  setBorderRadius,
  selectOptionsBorderRadius,
} from '../../features/Options/optionSlice';
import { selectRandomDelay, setRandomDelay } from '../../features/Server/serverSlice';
import './Options.scss';
import '../../layout/custom_checkbox.scss';
import { Scale } from '../Scale';

export const Options: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const visible = useAppSelector(selectIsVisibleOptions);
  const isRandomDelay = useAppSelector(selectRandomDelay);

  return (
    <>
      { visible && (
        <div className="Options">
          <div>
            <Scale
              title="width"
              min={150}
              max={350}
              currentSelector={selectOptionsWidth}
              setCurrent={setWidth}
            />

            <Scale
              title="height"
              min={150}
              max={250}
              currentSelector={selectOptionsHeight}
              setCurrent={setHeight}
            />
            <Scale
              title="border-radius"
              min={0}
              max={20}
              currentSelector={selectOptionsBorderRadius}
              setCurrent={setBorderRadius}
            />

            <div className="Options__field">
              random delay&nbsp;
              <div
                role="checkbox"
                aria-checked="false"
                aria-labelledby="delay"
                tabIndex={0}
                className={classNames('custom-checkbox',
                  { 'custom-checkbox--checked': isRandomDelay })}
                onClick={() => dispatch(setRandomDelay(!isRandomDelay))}
                onKeyDown={() => {}}
              >
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
