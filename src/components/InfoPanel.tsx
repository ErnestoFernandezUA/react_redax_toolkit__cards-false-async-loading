import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { selectServerStorage, selectServerStatusLoading } from '../features/Server/serverSlice';

interface SizeContainerProps {
}

export const InfoPanel: FunctionComponent<SizeContainerProps> = () => {
  const serverCount = useSelector(selectServerStorage).length;
  const serverLoading = useSelector(selectServerStatusLoading);

  return (
    <div
        style={{ 
        position: 'fixed', 
        top: '10px', 
        left: '10px',
        opacity: '0.2',
        lineHeight: '20px'
      }}>
      <h3>Width: {window.innerWidth}</h3>
      <h3>Height: {window.innerHeight}</h3>
      
      <h3>Server:&nbsp;
        {(serverLoading === 'loading') && 'loading... '}
        {(serverLoading === 'idle') && serverCount + ' photos'} 
      </h3>

    </div>
  );
}


