import Image from 'next/image';

import Placeholder from '../assets/placeholder-1.png';
import { Planet } from '../lib/graphql/planets';

interface Props {
  planet: Planet;
  index: number;
  tabIndex?: number;
  style?: any;
}

export const Card = ({ planet, index, tabIndex, style = {} }: Props) => {
  const settings = {
    index,
    tabIndex,
    style,
  };

  return (
    <div className="w-full h-full" {...settings}>
      <div className="mx-auto my-4 overflow-hidden border shadow-md w-96 lg:w-72 shadow-gx-purple-500 border-gx-purple-500/50 rounded-2xl hover:scale-105">
        <div className="relative w-full h-28">
          <Image src={Placeholder} layout="fill" alt="" />
        </div>
        <div className="p-3">
          <h1 className="mt-2 text-lg font-bold leading-3 text-gx-purple-500">
            {planet.name}
          </h1>
          <span className="text-xs italic font-light text-purplish-500">
            Jul 6 2022
          </span>
          <p className="mt-2 text-purplish-500">{planet.bio}</p>

          <div className="flex flex-wrap mt-3 space-x-2">
            {planet.topics.split(',').map((topic: string) => (
              <span
                key={topic}
                className="px-3 py-1 text-sm text-blue-400 rounded-full bg-blue-900/50"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
