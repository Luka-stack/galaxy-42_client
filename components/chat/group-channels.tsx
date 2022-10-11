import classNames from 'classnames';
import { PlusIcon, AtSymbolIcon } from '@heroicons/react/solid';
import { useState } from 'react';

const GROUPS = ['general', 'newbies', 'react v17', 'react v18'];

export const GroupChannels = () => {
  const [selected, setSelected] = useState('general');

  return (
    <div className="flex flex-col px-4 mb-4 center-center h-1/3">
      <div className="flex justify-between font-semibold uppercase cursor-default text-purplish-500">
        Group channels
        <PlusIcon className="w-5 h-5 cursor-pointer hover:text-white" />
      </div>

      <div className="h-full overflow-y-auto scrollbar-hide">
        {GROUPS.map((group) => (
          <div
            key={group}
            className={classNames(
              'flex items-center p-1 my-1 space-x-1 rounded-md text-purplish-500 hover:bg-bg-300 cursor-pointer',
              { 'bg-bg-300': selected === group }
            )}
          >
            {/* ICON */}
            <AtSymbolIcon className="w-5 h-5" />
            <h1>{group}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};
