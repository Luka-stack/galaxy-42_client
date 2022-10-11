import Image from 'next/image';
import { useState } from 'react';
import Popup from 'reactjs-popup';

import LogoImg from '../../assets/black-hole_64.png';

const PLANETS = ['Planet 1', 'Planet 2', 'Super Duper Planet 3'];

export const PlanetChatList = () => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex flex-col items-center flex-none w-24 h-screen py-4 overflow-y-auto border-r border-gx-purple-500/50 scrollbar-hide">
      {PLANETS.map((planet, id) => (
        <Popup
          key={id}
          on={['hover', 'focus']}
          arrow
          position="right center"
          trigger={
            <div
              key={id}
              className="my-2 rounded-md shadow-sm cursor-pointer w-14 h-14 shadow-gx-purple-200 bg-bg-500 hover:scale-105"
            >
              <Image src={LogoImg} alt="" />
            </div>
          }
        >
          <div>{planet}</div>
        </Popup>
      ))}
    </div>
  );
};
