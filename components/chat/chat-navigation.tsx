import Image from 'next/image';
import { useState } from 'react';
import Popup from 'reactjs-popup';

import { useAuthState } from '../../context/auth-provider';

export const ChatNavigation = () => {
  const { user } = useAuthState();

  const [selected, setSelected] = useState(0);

  return (
    <div className="sticky top-0 flex flex-col items-center flex-none w-24 h-screen py-4 overflow-y-auto border-r border-gx-purple-500/50 scrollbar-hide">
      {user?.planets.map((userPlanet) => (
        <Popup
          key={userPlanet.planet.uuid}
          on={['hover', 'focus']}
          arrow
          position="right center"
          trigger={
            <div
              key={userPlanet.planet.uuid}
              className="my-2 overflow-hidden rounded-md shadow-sm cursor-pointer w-14 h-14 shadow-gx-purple-200 bg-bg-500 hover:scale-105"
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
      ))}
    </div>
  );
};
