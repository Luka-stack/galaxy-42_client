import Image from 'next/image';
import { useMemo, FunctionComponent } from 'react';

import CosmoBg from '../assets/BG-Cosmo-Section.png';

type WithChildren<T = {}> = T & { children?: React.ReactNode };

type Props = WithChildren<{
  title?: string;
  style?: string;
}>;

export const SectionSeparator: FunctionComponent<Props> = ({
  title,
  style,
  children,
}) => {
  const wrapper = useMemo(() => {
    return `relative flex items-center w-full h-12 border border-transparent rounded-full ${
      style && style
    }`;
  }, [style]);

  return (
    <div className={wrapper}>
      <Image
        src={CosmoBg}
        alt="separator"
        layout="fill"
        className="absolute rounded-full opacity-40 -z-50"
      />

      {title && (
        <h1 className="mr-5 text-2xl font-bold text-gx-purple-500">{title}</h1>
      )}

      {children ? (
        <div className="z-10 flex space-x-5">{children}</div>
      ) : (
        <div className="flex-1 w-full h-1 bg-gx-purple-500"></div>
      )}
    </div>
  );
};
