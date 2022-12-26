import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { getPhotos } from '../../api/photo';
// eslint-disable-next-line import/no-cycle
import {
  AppDispatch,
  RootState,
} from '../../app/store';
import { Photo } from '../../type/Photo';

export interface ServerState {
  storage: Photo[];
  statusLoading: 'idle' | 'loading' | 'failed';
  error: unknown;

  nextLoadingPhotoIndex: number;
  randomDelayLoading: boolean;
}

const initialState: ServerState = {
  storage: [] as Photo[],
  statusLoading: 'idle',
  error: null,
  nextLoadingPhotoIndex: 0,
  randomDelayLoading: false,
};

export const getToServerAsync = createAsyncThunk(
  'server/fetchPhotos',
  async (
    { page, limit = 100 }: {page: number; limit: number},
    // { dispatch, rejectWithValue },
  ) => {
    // const responseFinal: Photo[] = [];

    const response: Photo[] = await getPhotos(page, limit);

    // responseFinal.push(...response);

    return response;
  },
);

const serverSlice = createSlice({
  name: 'server',
  initialState,
  reducers: {
    add: (state: ServerState, action) => {
      state.storage.push(...action.payload);
    },
    sortById: (state: ServerState) => {
      state.storage.sort((a, b) => Number(a.id) - Number(b.id));
    },
    setStatusLoading: (
      state: ServerState,
      action: PayloadAction<'idle' | 'loading' | 'failed'>,
    ) => {
      // eslint-disable-next-line no-param-reassign
      state.statusLoading = action.payload;
    },
    setError: (
      state: ServerState,
      action: PayloadAction<unknown>,
    ) => {
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.statusLoading = 'failed';
    },
    loadNextPhoto: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.nextLoadingPhotoIndex += 1;
    },
    setRandomDelay: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.randomDelayLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getToServerAsync.pending, (
        state: ServerState,
        // action: PayloadAction<'idle' | 'loading' | 'failed'>
      ) => {
        // eslint-disable-next-line no-param-reassign
        state.statusLoading = 'loading';
      })
      .addCase(getToServerAsync.fulfilled, (state, action) => {
        action.payload.sort((a, b) => Number(a.id) - Number(b.id));

        state.storage.push(...action.payload);
        // eslint-disable-next-line no-param-reassign
        state.statusLoading = 'idle';
      })
      .addCase(getToServerAsync.rejected, (state) => {
        // eslint-disable-next-line no-param-reassign
        state.statusLoading = 'failed';
      });
  },
});

export default serverSlice.reducer;
export const {
  add,
  sortById,
  setStatusLoading,
  setError,
  loadNextPhoto,
  setRandomDelay,
} = serverSlice.actions;

export const selectServerStorage = (state: RootState) => state.server.storage;
export const selectServerStatusLoading = (state: RootState) => state.server.statusLoading;
export const selectError = (state: RootState) => state.server.error;
export const selectRandomDelay = (state: RootState) => state.server.randomDelayLoading;

export const loadDataOnServer = (dispatch: AppDispatch) => {
  try {
    dispatch(getToServerAsync({ page: 1, limit: 100 }));
  } catch (error) {
    dispatch(setError(error));
  }
};
