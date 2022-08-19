import { useQuery } from '@apollo/client';
import { useSetRecoilState } from 'recoil';

import { ALL_PLANETS, Planet } from '../lib/graphql/planets';
import { planetsState } from '../lib/recoil/atoms/planets-atom';
import { PlanetCard } from './planet-card';

export const PlanetList = () => {
  const setPlanets = useSetRecoilState(planetsState);

  const { loading, data } = useQuery(ALL_PLANETS, {
    onCompleted: ({ planets }) => {
      setPlanets(planets);
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mt-7 place-items-center h-max">
      {data.planets.map((planet: Planet) => (
        <PlanetCard planet={planet} key={planet.uuid} />
      ))}
    </div>
  );
};
