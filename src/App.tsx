import React, { FunctionComponent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { loadDataOnServer, selectServerStorage } from './features/Server/serverSlice';
import { HomePage } from './HomePage';
import './App.scss';

const App: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const storage = useAppSelector(selectServerStorage);
  const [virgin, setVirgin] = useState(true);

  useEffect(() => {
    dispatch(loadDataOnServer);
  }, []);

  if (storage.length > 0 && virgin) {
    setVirgin(false);
  }

  return (
    <HomePage />
  );
};

export default App;
