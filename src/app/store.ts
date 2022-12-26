import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// eslint-disable-next-line import/no-cycle
import photosReducer from '../features/Photo/photoSlice';
// eslint-disable-next-line import/no-cycle
import optionsReducer from '../features/Options/optionSlice';
// eslint-disable-next-line import/no-cycle
import serverReducer from '../features/Server/serverSlice';

const rootReducer = combineReducers({
  photos: photosReducer,
  options: optionsReducer,
  server: serverReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['photos', 'options'],
  // blacklist: ['server', 'viewport'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, 'server'],
    },
  }),
});

export default store;

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
