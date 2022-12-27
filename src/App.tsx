import React, { FunctionComponent, useEffect } from 'react';
import { useAppDispatch } from './app/hooks';
import { loadDataOnServer } from './features/Server/serverSlice';
import { HomePage } from './HomePage';
import './App.scss';

const App: FunctionComponent = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadDataOnServer);
  }, []);

  return (
    <HomePage />
  );
};

export default App;
