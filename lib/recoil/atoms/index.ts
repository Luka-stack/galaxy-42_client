import { atom } from 'recoil';
import { Planet } from '../../graphql/planets';
import { User } from '../../graphql/users';
import { Request } from '../../graphql/requests';

export const planetsState = atom<Planet[]>({
  key: 'PlanetsState',
  default: [],
});

export const authState = atom<null | User>({
  key: 'AuthState',
  default: null,
});

export const requestsState = atom<Request[]>({
  key: 'RequestsState',
  default: [],
});
