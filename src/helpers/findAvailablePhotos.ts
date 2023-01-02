import { Photo } from '../type/Photo';

export const findAvailable = (
  storage: Photo[],
  loaded: string[],
) => {
  for (let i = 0; i < storage.length; i = +1) {
    if (!loaded.includes(String(i))) {
      return storage[i];
    }
  }

  return 'all has loaded';
};
