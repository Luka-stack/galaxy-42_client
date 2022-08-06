import Image from 'next/image';
import { useMemo } from 'react';

import CosmoBg from '../assets/BG-Cosmo-Section.png';

interface Props {
  title?: string;
  style?: string;
}

export const SectionSeparator = ({ title, style }: Props) => {
  const wrapper = useMemo(() => {
    return `relative flex items-center w-full h-12 overflow-hidden border border-transparent rounded-full ${
      style && style
    }`;
  }, [style]);

  return (
    <div className={wrapper}>
      <Image
        src={CosmoBg}
        alt="separator"
        layout="fill"
        className="absolute opacity-40 -z-50"
      />

      {title && (
        <h1 className="mx-4 text-2xl font-bold text-gx-purple-500">{title}</h1>
      )}
      <div className="flex-1 w-full h-1 bg-gx-purple-500"></div>
    </div>
  );
};
