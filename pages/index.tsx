import { useQuery } from '@apollo/client';
import { SearchIcon } from '@heroicons/react/outline';
import Head from 'next/head';
import { useRouter } from 'next/router';
import type { NextPage } from 'next/types';
import { useRef, KeyboardEvent } from 'react';
import { useSetRecoilState } from 'recoil';

import { Jumbotron } from '../components/jumbotron';
import { LatestPlanets } from '../components/latest-planets';
import { PlanetCard } from '../components/planet-card';
import { SectionSeparator } from '../components/section-separator';
import { ALL_PLANETS, Planet } from '../lib/graphql/planets';
import { planetsState } from '../lib/recoil/atoms';

const Home: NextPage = () => {
  const router = useRouter();
  const setPlanets = useSetRecoilState(planetsState);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const { loading, data } = useQuery(ALL_PLANETS, {
    onCompleted: ({ planets }) => {
      setPlanets(planets);
    },
  });

  const onEnter = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      const input = inputRef.current;

      if (input) {
        search(input.value);
      }
    }
  };

  const search = (term: string) => {
    router.push({
      pathname: '/planets',
      query: { search: term },
    });
  };

  return (
    <div className="mt-10 ml-32">
      <Head>
        <title>Galaxy 42</title>
        <meta
          name="Galaxy 42"
          content="Galaxy 42 is a place where you can connect with people"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-11/12 mx-auto">
        <Jumbotron />

        <SectionSeparator title="The latest creations" style="mt-20 pl-4" />
        <LatestPlanets />

        {/* Section Wrapper */}
        <SectionSeparator
          title="Explore different planets"
          style="mt-20 pl-4"
        />

        <div className="grid grid-cols-4 px-4 gap-x-4">
          <div className="col-span-3 divide-y divide-gx-purple-500">
            {data?.planets.map((planet: Planet) => (
              <PlanetCard planet={planet} showBio={true} key={planet.uuid} />
            ))}
          </div>
          <div className="pl-4 mt-10 border-l border-gx-purple-500/50">
            <h1 className="self-start text-xl font-bold text-gx-purple-500">
              Discover more
            </h1>
            <div className="flex items-center py-1 mt-4 border rounded-full border-slate-500 w-fit">
              <SearchIcon className="h-5 px-2 text-purplish-500" />
              <input
                type="text"
                ref={inputRef}
                onKeyDown={onEnter}
                placeholder="search"
                className="w-40 bg-transparent rounded-r-full focus:outline-none text-purplish-500"
              />
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {['ReactJs', 'NestJs', 'NextJs', 'SolidJs', 'JavaScript'].map(
                (topic) => (
                  <span
                    key={topic}
                    className="px-3 py-1 text-sm text-blue-400 rounded-full cursor-pointer bg-blue-900/50 hover:bg-blue-900"
                    onClick={() => search(topic)}
                  >
                    {topic}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
