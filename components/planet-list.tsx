import { Planet } from '../lib/graphql/planets';
import { PlanetCard } from './planet-card';

interface Props {
  planets: Planet[];
  loading: boolean;
}

export const PlanetList = ({ planets, loading }: Props) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mt-7 place-items-center h-max">
      {planets.map((planet: Planet) => (
        <PlanetCard planet={planet} key={planet.uuid} />
      ))}
    </div>
  );
};
