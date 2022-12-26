/* eslint-disable no-param-reassign */
import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Photo } from '../../type/Photo';

export interface ModalState {
  storage: Photo[];
  statusLoading: 'idle' | 'loading' | 'failed';
  error: unknown;

  nextLoadingPhotoIndex: number;
  randomDelayLoading: boolean;
};

const initialState: ModalState = {
  storage: [] as Photo[],
  statusLoading: 'idle',
  error: null,
  nextLoadingPhotoIndex: 0,
  randomDelayLoading: false,
};

export const getToServerAsync = createAsyncThunk(
  'modal/fetch',
  async () => {

  },
);

const modalSlice = createSlice({
  name: 'server',
  initialState,
  reducers: {
    add: (state: ModalState, action) => {
      state.storage.push(...action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getToServerAsync.pending, (
        state,
      ) => {
        state.statusLoading = 'loading';
      })
      .addCase(getToServerAsync.fulfilled, (state) => {
        state.statusLoading = 'idle';
      })
      .addCase(getToServerAsync.rejected, (state) => {
        state.statusLoading = 'failed';
      })
  },
});

export default modalSlice.reducer;
export const { add } = modalSlice.actions;

export const selectServerStorage = (state: RootState) => state.server.storage;
