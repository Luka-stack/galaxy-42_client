import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import type { NextPage } from 'next/types';

import ProfileImg from '../../assets/profile.jpg';
import { useState } from 'react';
import { PlanetCard } from '../../components/planet-card';
import { Tabs } from '../../components/tabs';
import { UserPreview } from '../../components/user-preview';

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation`;

const USER = {
  uuid: 'uuid',
  username: 'Tester',
  email: 'Email',
  bio: text,
  topics: 'ReactJs NestJs NextJs',
  planets: null,
};

const PLANET_EX = [
  {
    uuid: 'uuid',
    name: 'Planet Name',
    bio: text,
    requirements: text,
    topics: 'ReactJs NestJs NextJs',
    isPublic: true,
  },
  {
    uuid: 'uuid2',
    name: 'Planet Name2',
    bio: text,
    requirements: text,
    topics: 'ReactJs NestJs NextJs',
    isPublic: true,
  },
];

const UserProfile: NextPage = () => {
  const router = useRouter();
  const username = router.query.username;

  const [showPlanets, setShowPlanets] = useState(true);

  return (
    <div className="h-screen mt-10 ml-32">
      <Head>
        <title>{`${username} | Galaxy 42`}</title>
      </Head>

      <main className="justify-center w-full h-full">
        <section className="fixed right-0 px-4 w-72 top-10 shrink-0">
          <UserPreview user={USER} />
        </section>

        <section className="h-full px-10 border-r border-gx-purple-500/40 mr-72">
          <Tabs
            fstTab="Stories"
            secTab="Planets"
            fstSelected={showPlanets}
            setFstSelected={setShowPlanets}
          />

          {showPlanets ? (
            <div className="space-y-5 divide-y divide-gx-purple-500">
              {PLANET_EX.map((planet) => (
                <PlanetCard planet={planet} showBio={true} key={planet.uuid} />
              ))}
            </div>
          ) : (
            <div className="text-white">Stories</div>
          )}
        </section>
      </main>
    </div>
  );
};

export default UserProfile;
