import { atom } from 'recoil';
import { User } from '../../graphql/users';

export const authState = atom<null | User>({
  key: 'AuthState',
  default: null,
});

export const hasNewNotifications = atom<boolean>({
  key: 'NewNotifications',
  default: false,
});
