/* eslint-disable no-param-reassign */
import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';

export interface OptionsState {
  isOptionsVisible: boolean;
  isDeletedVisible: boolean;
  width: number;
  height: number;
  'border-radius': number;
}

const initialState: OptionsState = {
  isOptionsVisible: false,
  isDeletedVisible: false,
  width: 350,
  height: 250,
  'border-radius': 5,
};

const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    setVisible: (state: OptionsState, action: PayloadAction<boolean>) => {
      state.isOptionsVisible = action.payload;
    },
    setWidth: (state: OptionsState, action: PayloadAction<number>) => {
      if (action.payload > 0 && action.payload <= 350) {
        state.width = action.payload;
      }
    },
    setHeight: (state: OptionsState, action: PayloadAction<number>) => {
      if (action.payload > 0 && action.payload <= 350) {
        state.height = action.payload;
      }
    },
    setBorderRadius: (state: OptionsState, action: PayloadAction<number>) => {
      if (action.payload >= 0 && action.payload <= 50) {
        state['border-radius'] = action.payload;
      }
    },
    resetOptions: (state: OptionsState) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = initialState;
    },
    changeVisibleDeleted: (state: OptionsState, action: PayloadAction<boolean>) => {
      state.isDeletedVisible = action.payload;
    },
  },
});

export default optionsSlice.reducer;

export const {
  setVisible,
  setWidth,
  setHeight,
  setBorderRadius,
  resetOptions,
  changeVisibleDeleted,
} = optionsSlice.actions;

export const selectIsVisibleOptions = (state: RootState) => state.options.isOptionsVisible;
export const selectOptionsHeight = (state: RootState) => state.options.height;
export const selectOptionsWidth = (state: RootState) => state.options.width;
export const selectOptionsBorderRadius = (state: RootState) => state.options['border-radius'];
export const selectIsDeletedVisible = (state: RootState) => state.options.isDeletedVisible;
