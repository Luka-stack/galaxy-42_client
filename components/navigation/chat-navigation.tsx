import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Popup from 'reactjs-popup';

import { User } from '../../lib/graphql/users';

interface Props {
  user: User;
}

export const ChatNavigation = ({ user }: Props) => {
  const router = useRouter();

  const [selected, setSelected] = useState(user?.planets[0].planet.uuid || '');

  return (
    <div className="sticky top-0 flex flex-col items-center flex-none w-24 h-screen py-4 overflow-y-auto border-r border-gx-purple-500/50 scrollbar-hide">
      {user?.planets.map((userPlanet) => (
        <div
          className="relative flex justify-center w-full"
          key={userPlanet.planet.uuid}
        >
          {selected === userPlanet.planet.uuid &&
            router.pathname.includes('chat') && (
              <div className="absolute left-0 w-1 my-2 bg-gx-purple-500 h-14 rounded-r-3xl"></div>
            )}
          <Popup
            on={['hover', 'focus']}
            arrow
            position="right center"
            trigger={
              <div
                key={userPlanet.planet.uuid}
                className="my-2 overflow-hidden rounded-md shadow-sm cursor-pointer w-14 h-14 shadow-gx-purple-200 bg-bg-500 hover:scale-105"
                onClick={() => {
                  router.push(`/chat/${userPlanet.planet.uuid}`);
                  setSelected(userPlanet.planet.uuid);
                }}
              >
                <Image
                  src={userPlanet.planet.imageUrl}
                  alt=""
                  width="56px"
                  height="56px"
                />
              </div>
            }
          >
            <div>{userPlanet.planet.name}</div>
          </Popup>
        </div>
      ))}
    </div>
  );
};
