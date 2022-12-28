import { Photo } from '../type/Photo';

export function findAllPhotos(author: string, storage: Photo[]) {
  return storage.filter(photo => photo.author === author);
}
