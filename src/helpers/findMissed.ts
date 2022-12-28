import { useAppSelector } from '../app/hooks';
import { selectServerStorage } from '../features/Server/serverSlice';

export const FindMissed = () => {
  const arr = useAppSelector(selectServerStorage).map(el => +el.id);

  const missedIds = [];

  let current = 0;
  let i = 0;

  while (i < arr[arr.length - 1]) {
    if (arr[current] === i) {
      // eslint-disable-next-line no-plusplus
      current++;
    } else {
      missedIds.push(i);
    }

    // eslint-disable-next-line no-plusplus
    i++;
  }

  return missedIds;
};
