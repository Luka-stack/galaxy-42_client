import Image from 'next/image';
import { useRouter } from 'next/router';
import { Planet } from '../../lib/graphql/planets';

import clip from 'text-clipper';
import classNames from 'classnames';

interface Props {
  planet: Planet;
  showBio: boolean;
}

export const PlanetCard = ({ planet, showBio }: Props) => {
  const router = useRouter();

  return (
    <div className="py-10">
      <div className="flex space-x-20">
        <div className="w-full">
          <h1
            className="text-2xl font-bold cursor-pointer text-gx-purple-500 hover:text-gx-purple-300"
            onClick={() => router.push(`/planets/${planet.uuid}`)}
          >
            {planet.name}
          </h1>
          {showBio && (
            <p className="mt-5 text-purplish-500">
              {clip(planet.bio, 250, { html: true, maxLines: 3 })}
            </p>
          )}
          <p className="mt-4 text-sm font-light text-purplish-500">
            Jul 6 2022
          </p>
        </div>
        <div
          className={classNames(
            'relative w-40 h-40 overflow-hidden border rounded-3xl shrink-0 border-gx-purple-500/50',
            { '!w-28 !h-28': !showBio }
          )}
        >
          <Image src={planet!.imageUrl} layout="fill" alt="" />
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-5">
        {planet.topics.split(' ').map((topic) => (
          <span
            key={topic}
            className="px-3 py-1 text-sm text-blue-400 rounded-full cursor-pointer bg-blue-900/50 hover:bg-blue-900"
            onClick={() =>
              router.push({
                pathname: '/planets',
                query: { search: topic },
              })
            }
          >
            {topic}
          </span>
        ))}
      </div>
    </div>
  );
};
