import { useMemo, useState } from 'react';
import { PlanetCard } from '../../components/planets/planet-card';
import { Tabs } from '../../components/tabs';
import { UserPreview } from '../../components/user-preview';
import { User } from '../../lib/graphql/users';

interface PageProps {
  user: User;
}

export const UserDetails = ({ user }: PageProps) => {
  const [showPlanets, setShowPlanets] = useState(true);

  const planets = useMemo(() => {
    return user.planets.filter((p) => p.role === 'ADMIN').map((p) => p.planet);
  }, [user]);

  return (
    <main className="flex flex-row-reverse justify-between w-full">
      <section className="sticky top-0 flex-none h-screen pl-6 border-l w-60 border-gx-purple-500/40">
        <UserPreview user={user} />
      </section>

      <section className="w-11/12 h-full px-10 mx-auto mt-10 xl:w-3/4">
        <Tabs
          fstTab="Stories"
          secTab="Planets"
          fstSelected={showPlanets}
          setFstSelected={setShowPlanets}
        />

        {showPlanets ? (
          <div className="px-4 space-y-5 divide-y divide-gx-purple-500">
            {planets.map((planet) => (
              <PlanetCard
                planet={planet}
                showBio={true}
                showTopics={false}
                key={planet.uuid}
              />
            ))}
          </div>
        ) : (
          <div className="text-white">Stories</div>
        )}
      </section>
    </main>
  );
};
