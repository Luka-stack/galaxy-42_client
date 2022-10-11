import Image from 'next/image';

import LogoImg from '../../assets/black-hole_64.png';
import { AnotherMessage } from './another-message';
import { FirstMessage } from './first-message';

const MESSAGES = [
  {
    id: '1',
    content: 'Hello Everyone!',
    author: 'Takacchi',
    createdAt: '08/08/2008 20:10',
    img: LogoImg,
  },
  {
    id: '2',
    content: 'Hi Takacchi. Whats up?',
    author: 'Luka-stack',
    createdAt: '08/08/2008 20:20',
    img: LogoImg,
  },
  {
    id: '3',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    author: 'LaLisa',
    createdAt: '08/09/2008 05:05',
    img: LogoImg,
  },
  {
    id: '4',
    content: 'Are you good?',
    author: 'LaLisa',
    createdAt: '08/09/2008 10:00',
    img: LogoImg,
  },
  {
    id: '4',
    content: 'Are you good?',
    author: 'Takacchi',
    createdAt: '08/09/2008 10:00',
    img: LogoImg,
  },
];

export const Chat = () => {
  let lastMsgAuthor = '';

  return (
    <div className="w-full">
      {MESSAGES.map((m) => {
        if (m.author === lastMsgAuthor) {
          return <AnotherMessage message={m} key={m.id} />;
        }

        lastMsgAuthor = m.author;
        return <FirstMessage message={m} key={m.id} />;
      })}
    </div>
  );
};
