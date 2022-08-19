import { atom } from 'recoil';
import { Planet } from '../../graphql/planets';

export const planetsState = atom<Planet[]>({
  key: 'PlanetsState',
  default: [],
});
