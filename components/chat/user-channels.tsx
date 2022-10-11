import classNames from 'classnames';
import Image from 'next/image';
import { useState } from 'react';
import LogoImg from '../../assets/black-hole_64.png';

const USER = ['Luka Stack', 'Takacchi', 'LiLisa', 'Luka', 'Taka'];

export const UserChannels = () => {
  const [selected, setSelected] = useState('Takacchi');

  return (
    <div className="flex flex-col px-4 pb-5 center-center h-2/3">
      <div className="flex justify-between font-semibold uppercase cursor-default text-purplish-500">
        Users
      </div>

      <div className="h-full overflow-y-auto scrollbar-hide">
        {USER.map((user) => (
          <div
            key={user}
            className={classNames(
              'flex items-center p-1 my-1 space-x-1 rounded-md text-purplish-500 hover:bg-bg-300 cursor-pointer',
              { 'bg-bg-300': selected === user }
            )}
          >
            {/* ICON */}
            <div className="relative border rounded-full w-7 h-7 border-gx-purple-500">
              <Image
                src={LogoImg}
                alt=""
                layout="fill"
                className="rounded-full"
              />
            </div>
            <h1>{user}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};
