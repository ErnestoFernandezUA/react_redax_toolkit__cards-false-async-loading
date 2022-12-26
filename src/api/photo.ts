import { Photo } from '../type/Photo';
import { client } from '../utils/axiosClient';

export const getPhotos = (page: number, limit: number) => {
  return client.get<Photo[]>(`v2/list?page=${page}&limit=${limit}`);
};
