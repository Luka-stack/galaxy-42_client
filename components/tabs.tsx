import classNames from 'classnames';
import Image from 'next/image';

import CosmoBg from '../assets/BG-Cosmo-Section.png';

interface Props {
  fstTab: string;
  secTab: string;
  fstSelected: boolean;
  setFstSelected: (value: boolean) => void;
}

export const Tabs = ({
  fstTab,
  secTab,
  fstSelected,
  setFstSelected,
}: Props) => {
  return (
    <div className="relative h-12 mb-20 w-fll">
      <Image
        src={CosmoBg}
        alt="separator"
        layout="fill"
        className="absolute rounded-full opacity-40 -z-50"
      />

      <div className="z-10 flex w-full h-full">
        <div
          className={classNames(
            'z-10 flex items-center justify-center w-1/2 h-full text-3xl font-bold rounded-l-full cursor-pointer text-gx-purple-500 border-gx-purple-500/50',
            { 'border-b-2': !fstSelected },
            {
              'bg-bg-500 opacity-50 hover:bg-bg-500/40 hover:opacity-75':
                fstSelected,
            }
          )}
          onClick={() => setFstSelected(false)}
        >
          <h2>{fstTab}</h2>
        </div>
        <div
          className={classNames(
            'flex items-center justify-center w-1/2 h-full text-3xl font-bold cursor-pointer text-gx-purple-500 rounded-r-full border-gx-purple-500/50',
            { 'border-b-2': fstSelected },
            {
              'bg-bg-500 opacity-50 hover:bg-bg-500/40 hover:opacity-75':
                !fstSelected,
            }
          )}
          onClick={() => setFstSelected(true)}
        >
          <h2>{secTab}</h2>
        </div>
      </div>
    </div>
  );
};
