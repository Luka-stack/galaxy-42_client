import Head from 'next/head';
import Link from 'next/link';
import type { NextPage } from 'next/types';
import { useMemo } from 'react';

import { PlanetCard } from '../../components/planets/planet-card';
import { SectionSeparator } from '../../components/section-separator';
import { useAuthState } from '../../context/auth-provider';
import { Planet } from '../../lib/graphql/planets';

const Profile: NextPage = () => {
  const { user } = useAuthState();

  const { ownPlanets, planets } = useMemo(() => {
    const ownPlanets: Planet[] = [];
    const planets: Planet[] = [];

    user?.planets.forEach((relation) => {
      if (relation.role === 'ADMIN') {
        ownPlanets.push(relation.planet);
        return;
      }

      planets.push(relation.planet);
    });

    return { ownPlanets, planets };
  }, [user]);

  return (
    <div className="w-full mt-10">
      <Head>
        <title>{user?.username} | Galaxy 42</title>
      </Head>

      <main className="w-11/12 mx-auto xl:w-3/4">
        <div className="px-4 py-2 mx-auto space-x-4 border rounded-lg w-fit border-gx-purple-500">
          <Link href="/planets/new">
            <button className="gx-btn">Create New Planet</button>
          </Link>
          <Link href="/profile/edit">
            <button className="gx-btn">Edit Profile</button>
          </Link>
          <Link href="/profile/settings">
            <button className="gx-btn">Change Password</button>
          </Link>
        </div>

        <section className="grid grid-cols-2 mx-auto max-w-screen-2xl gap-14 lg:gap-40">
          <article>
            <SectionSeparator
              title="Planets you belong to"
              style="mt-20 pl-4"
            />
            <div className="px-5 mt-5 divide-y divide-gx-purple-500/50">
              {!planets.length && (
                <h1 className="text-xl font-bold text-center text-gx-purple-500">
                  No planets you belong to
                </h1>
              )}
              {planets.map((planet) => (
                <PlanetCard
                  planet={planet}
                  showBio={false}
                  showTopics={false}
                  key={planet.uuid}
                />
              ))}
            </div>
          </article>
          <article>
            <SectionSeparator title="Planets you own" style="mt-20 pl-4" />
            <div className="px-5 mt-5 divide-y divide-gx-purple-500/50">
              {!ownPlanets.length && (
                <h1 className="text-xl font-bold text-center text-gx-purple-500">
                  No planets you own
                </h1>
              )}
              {ownPlanets.map((planet) => (
                <PlanetCard
                  planet={planet}
                  showBio={false}
                  showTopics={false}
                  key={planet.uuid}
                />
              ))}
            </div>
          </article>
        </section>
      </main>
    </div>
  );
};

export default Profile;
