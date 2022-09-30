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
    <main className="justify-center w-full h-full">
      <section className="fixed right-0 px-4 w-72 top-10 shrink-0">
        <UserPreview user={user} />
      </section>

      <section className="h-full px-10 border-r border-gx-purple-500/40 mr-72">
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
