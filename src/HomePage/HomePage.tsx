import React, { FunctionComponent } from 'react';
import { Loader } from '../components/Loader';
import { Container } from '../components/Container';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Header } from '../components/Header';
import { Options } from '../components/Options';
import { selectServerStatusLoading } from '../features/Server/serverSlice';
import { selectDeleted } from '../features/Photo/photoSlice';
import { selectIsDeletedVisible, changeVisibleDeleted } from '../features/Options/optionSlice';
import { Modal } from '../components/Modal';
import './HomePage.scss';

export const HomePage: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const statusLoading = useAppSelector(selectServerStatusLoading);
  const deleted = useAppSelector(selectDeleted);
  const isVisibleDeleted = useAppSelector(selectIsDeletedVisible);
  // const [isScrollDown, setScrollDown] = useState(false);

  // const headerHeight = 66;
  // const titleHeight = 24.900 * 2 + 40;
  // const rest = window.innerHeight - titleHeight;
  // console.log('rest', rest, window.innerWidth);

  // useEffect(() => {
  //   if (onFill && onFillStatus === 'idle') {
  //     dispatch(falseLoadingPhotoAsync());
  //   }
  // });

  // useEffect(() => {
  //   document.addEventListener('scroll', scrollHandler)

  //   return () => document.removeEventListener('scroll', scrollHandler);
  // }, []);

  // const scrollHandler = (e: any) => {
  //   console.log(e.target.documentElement.scrollHeight);
  //   console.log(e.target.documentElement.scrollTop);
  //   console.log(window.innerHeight);
  //   if (e.target.documentElement.scrollHeight
  //   - window.innerHeight - e.target.documentElement.scrollTop < 100 ) {
  //     console.log('scroll');
  //   };

  // };

  // console.log('render HomePage');

  return (
    <>
      <Header />
      <Options />
      <main className="HomePage__main">
        {(statusLoading === 'loading') && (
          <Loader />
        )}

        {(statusLoading === 'failed') && (
          <>Error</>
        )}

        {(statusLoading === 'idle') && (
          <Container />
        )}
      </main>

      {isVisibleDeleted && (
        <Modal
          closeModal={() => dispatch(changeVisibleDeleted(false))}
          content={deleted}
        />
      )}
    </>
  );
};
