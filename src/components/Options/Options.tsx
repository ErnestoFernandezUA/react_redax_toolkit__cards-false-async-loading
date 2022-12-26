import React, { FunctionComponent, useState } from 'react';
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
  setVisible,
} from '../../features/Options/optionSlice';
import { selectRandomDelay, setRandomDelay } from '../../features/Server/serverSlice';
import './Options.scss';
import '../../layout/custom_checkbox.scss';

export const Options: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const visible = useAppSelector(selectIsVisibleOptions);
  const initialWidth = useAppSelector(selectOptionsWidth);
  const initialHeight = useAppSelector(selectOptionsHeight);
  const initialBorderRadius = useAppSelector(selectOptionsBorderRadius);
  const isRandomDelay = useAppSelector(selectRandomDelay);

  const [{
    width, height, 'border-radius': borderRadius,
  }, setValues] = useState({
    width: initialWidth,
    height: initialHeight,
    'border-radius': initialBorderRadius,
  });

  // useEffect(() => {
  //   setValues({
  //     width: initialWidth,
  //     height: initialHeight,
  //   })
  // }, [initialWidth, initialHeight])

  // const resetValues = () => {
  //   setValues({
  //     width: initialWidth,
  //     height: initialHeight,
  //     'border-radius': initialBorderRadius,
  //   });
  // };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name: field, value } = event.target;

    setValues(current => ({ ...current, [field]: +value }));
    // setErrors(current => ({ ...current, [field]: false }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(setWidth(width));
    dispatch(setHeight(height));
    dispatch(setBorderRadius(borderRadius));
    dispatch(setVisible(false));
  };

  return (
    visible
      ? (
        <form
          onSubmit={(event) => handleSubmit(event)}
          className="Options"
        >
          <div>
            <div className="Options__field">
              <label htmlFor="width">
                width&nbsp;
                <input
                  type="text"
                  name="width"
                  id="width"
                  onChange={handleChange}
                  className="Options__input"
                  value={width}
                />
                &nbsp;px
              </label>
            </div>

            <div className="Options__field">
              <label htmlFor="height">
                height&nbsp;
                <input
                  type="text"
                  name="height"
                  id="height"
                  onChange={handleChange}
                  className="Options__input"
                  value={height}
                />
                &nbsp;px
              </label>
            </div>

            <div className="Options__field">
              <label htmlFor="height">
                border-radius&nbsp;
                <input
                  type="text"
                  name="border-radius"
                  id="height"
                  onChange={handleChange}
                  className="Options__input"
                  value={borderRadius}
                />
                &nbsp;px
              </label>
            </div>

            <div className="Options__field">
              {/* <label htmlFor="delay"> */}
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
              {/* </label> */}
            </div>

            <div className="Options__field">
              <button type="submit" className="Options__bottom">Submit</button>
            </div>
          </div>
        </form>
      ) : null
  );
};
