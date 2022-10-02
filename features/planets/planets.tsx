import { useQuery } from '@apollo/client';
import { Bubbles } from '../../components/loading/bubbles';
import { PlanetCard } from '../../components/planets/planet-card';
import { QuickSearch } from '../../components/quick-search';
import { ALL_PLANETS, Planet } from '../../lib/graphql/planets';

export const Planets = () => {
  const { data, loading, error } = useQuery<{ planets: Planet[] }>(
    ALL_PLANETS,
    {
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first',
    }
  );

  // TODO Add Loading
  // if (loading) {
  //   return (
  //     <div className="flex justify-center mt-10">
  //       <Bubbles />
  //     </div>
  //   );
  // }

  // TODO Handle Error

  return (
    <div className="grid grid-cols-4 px-4 gap-x-4">
      <div className="col-span-3 divide-y divide-gx-purple-500">
        {data?.planets.map((planet: Planet) => (
          <PlanetCard planet={planet} showBio={true} key={planet.uuid} />
        ))}
      </div>

      <QuickSearch />
    </div>
  );
};
