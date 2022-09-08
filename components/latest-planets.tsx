import { useQuery } from '@apollo/client';
import { ALL_PLANETS, Planet } from '../lib/graphql/planets';

import { useRouter } from 'next/router';
import { PlanetLeaflet } from './planets/planet-leaflet';

export const LatestPlanets = () => {
  const router = useRouter();

  const { loading, data } = useQuery(ALL_PLANETS);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-3 grid-rows-2 px-4 mt-6 gap-y-6">
      {data.planets.slice(0, 6).map((planet: Planet, id: number) => (
        <PlanetLeaflet
          key={planet.uuid}
          index={id}
          name={planet.name}
          image={planet.imageUrl}
          onClick={() => router.push(`/planets/${planet.uuid}`)}
        />
      ))}
    </div>
  );
};
