import { useQuery } from '@apollo/client';
import { QUERY_PLANETS, Planet } from '../../lib/graphql/planets';

import { useRouter } from 'next/router';
import { PlanetLeaflet } from '../../components/planets/planet-leaflet';
import { Bubbles } from '../../components/loading/bubbles';

export const PlanetsLatest = () => {
  const router = useRouter();

  const { loading, data } = useQuery(QUERY_PLANETS, {
    variables: {
      query: {
        limit: 6,
        order: 'createdAt',
      },
    },
  });

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <Bubbles />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 grid-rows-2 px-4 mt-6 gap-y-6">
      {data.queryPlanets.map((planet: Planet, id: number) => (
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
