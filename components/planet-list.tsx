import { useQuery } from '@apollo/client';

import { ALL_PLANETS, Planet } from '../lib/graphql/planets';
import { PlanetCard } from './planet-card';

export const PlanetList = () => {
  const { loading, data } = useQuery(ALL_PLANETS);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mosaic mt-7 place-items-center h-max">
      {data.planets.map((planet: Planet) => (
        <PlanetCard planet={planet} key={planet.uuid} />
      ))}
    </div>
  );
};
