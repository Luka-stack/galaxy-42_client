import { atom } from 'recoil';
import { Message } from '../../graphql/messages';
import { User } from '../../graphql/users';

export const authState = atom<null | User>({
  key: 'AuthState',
  default: null,
});

export const hasNewNotifications = atom<boolean>({
  key: 'NewNotifications',
  default: false,
});

export const chatId = atom<string>({
  key: 'ChatId',
  default: '',
});

export const chatMessages = atom<Message[]>({
  key: 'ChatMessages',
  default: [],
});
