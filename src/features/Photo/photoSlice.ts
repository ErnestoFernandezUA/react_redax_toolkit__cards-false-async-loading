import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { PhotoElement } from '../../type/PhotoElement';
// eslint-disable-next-line import/no-cycle
import { loadNextPhoto } from '../Server/serverSlice';

function isElementInList(
  array: PhotoElement[],
  requestId: string,
):boolean {
  return array.findIndex(el => el.requestId === requestId) >= 0;
}

function replaceDownloadedPhoto(
  array: PhotoElement[],
  requestId: string,
  photo: PhotoElement,
): PhotoElement[] {
  return array.map((el: PhotoElement) => (el.requestId !== requestId
    ? el
    : {
      ...el,
      ...photo as PhotoElement,
      status: 'idle',
      requestId: null,
    }));
}

export interface PhotosState {
  list: PhotoElement[];
  deleted: PhotoElement[];
  onFill: boolean;
  onFillLoadingStatus: 'idle' | 'loading';
}

const initialState: PhotosState = {
  list: [] as PhotoElement[],
  deleted: [] as PhotoElement[],
  onFill: false,
  onFillLoadingStatus: 'idle',
};

export const falseLoadingPhotoAsync = createAsyncThunk(
  'photo/fetchPhoto',
  async (_, thunkAPI) => {
    // console.log('falseLoadingPhotoAsync body async function');
    const state = thunkAPI.getState() as RootState;
    // eslint-disable-next-line prefer-destructuring
    const server = state.server;
    const loadingPhoto = server.storage[server.nextLoadingPhotoIndex];

    thunkAPI.dispatch(loadNextPhoto());

    let delay = 300;

    if (state.server.randomDelayLoading) {
      delay = 1000 + 3000 * Math.random();
    }

    const response = await new Promise(resolve => {
      setTimeout(() => {
        return resolve(
          {
            ...loadingPhoto,
            requestId: thunkAPI.requestId,
            status: 'loading',
          } as PhotoElement,
        );
      }, delay);
    });

    return response;
  },
  // {
  //   condition: (_, { getState }) => {
  //     const { photos } = getState() as RootState;

  //     console.log('condition cancelling',
  //     photos.onFillLoadingStatus === 'loading' && photos.onFill);

  //     return !(photos.onFillLoadingStatus === 'loading' && photos.onFill);
  //   }
  // }
);

const photosSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    changePhotoByRequestId: (state: PhotosState, action: PayloadAction<{
      requestId: string,
      photo: PhotoElement,
      status: 'idle' | 'loading' | 'failed',
    }>) => {
      state.list.forEach((el: PhotoElement) => (el.requestId !== action.payload.requestId
        ? el
        : { ...el, ...action.payload.photo, status: action.payload.status }
      ));
    },
    deletePhoto: (state: PhotosState, action:PayloadAction<string | null | undefined>) => {
      if (action.payload || action.payload === '0') {
        const deletedIndex = state.list.findIndex(photo => photo.id === action.payload);

        if (deletedIndex >= 0) {
          state.deleted.push(...state.list.splice(deletedIndex, 1));
        }
      } else {
        // if action.payload is undefined
        // eslint-disable-next-line no-lonely-if
        if (state.list.length) {
          state.deleted.push(state.list[state.list.length - 1]);

          // eslint-disable-next-line no-plusplus, no-param-reassign
          state.list.length--;
        }
      }
    },
    restorePhoto: (state: PhotosState, action: PayloadAction<string>) => {
      if (action.payload || action.payload === '0') {
        const restoreIndex = state.deleted.findIndex(photo => photo.id === action.payload);

        // eslint-disable-next-line no-console
        console.log(restoreIndex);

        if (restoreIndex >= 0) {
          state.list.push(...state.deleted.splice(restoreIndex, 1));
        }
      }
    },
    restoreAll: (state: PhotosState) => {
      state.list.push(...state.deleted);
      // eslint-disable-next-line no-param-reassign
      state.deleted.length = 0;
    },
    setOnFill: (state: PhotosState, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.onFill = action.payload;
    },
    clear: (state) => {
      state.deleted.push(...state.list.splice(1));
    },
    reset: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      // get photo from server - false load data from server
      .addCase(falseLoadingPhotoAsync.pending, (state, action) => {
        // console.log('falseLoadingPhotoAsync.pending');

        if (state.onFill) {
          // eslint-disable-next-line no-param-reassign
          state.onFillLoadingStatus = 'loading';
        }

        const loadingPhoto: PhotoElement = {
          id: null,
          author: null,
          width: null,
          height: null,
          url: null,
          download_url: null,
          requestId: action.meta.requestId,
          status: 'loading',
        };

        state.list.push(loadingPhoto);
      })
      .addCase(falseLoadingPhotoAsync.fulfilled, (state, action) => {
        // console.log('falseLoadingPhotoAsync.fulfilled');
        const { requestId } = action.meta;

        if (state.onFill) {
          // eslint-disable-next-line no-param-reassign
          state.onFillLoadingStatus = 'idle';
        }

        if (isElementInList(state.list, requestId)) {
          // eslint-disable-next-line no-param-reassign
          state.list = replaceDownloadedPhoto(
            state.list,
            requestId,
            action.payload as PhotoElement,
          );
        } else if (isElementInList(state.deleted, requestId)) {
          // eslint-disable-next-line no-param-reassign
          state.deleted = replaceDownloadedPhoto(
            state.deleted,
            requestId,
            action.payload as PhotoElement,
          );
        }

        if (state.onFill && state.onFillLoadingStatus === 'loading') {
          // eslint-disable-next-line no-param-reassign
          state.onFillLoadingStatus = 'idle';
        }
      })
      .addCase(falseLoadingPhotoAsync.rejected, () => {
      });
  },
});

export default photosSlice.reducer;
export const {
  changePhotoByRequestId,
  deletePhoto,
  restorePhoto,
  restoreAll,
  setOnFill,
  clear,
} = photosSlice.actions;

export const selectVisible = (state: RootState) => state.photos.list;
export const selectDeleted = (state: RootState) => state.photos.deleted;
export const selectOnFill = (state: RootState) => state.photos.onFill;
export const selectOnFillLoadingStatus = (state: RootState) => state.photos.onFillLoadingStatus;
