import { useQuery } from '@apollo/client';
import Head from 'next/head';
import type { NextPage } from 'next/types';
import { useSetRecoilState } from 'recoil';

import { Jumbotron } from '../components/jumbotron';
import { LatestPlanets } from '../components/latest-planets';
import { PlanetList } from '../components/planet-list';
import { SectionSeparator } from '../components/section-separator';
import { ALL_PLANETS } from '../lib/graphql/planets';
import { planetsState } from '../lib/recoil/atoms/planets-atom';

const Home: NextPage = () => {
  const setPlanets = useSetRecoilState(planetsState);

  const { loading, data } = useQuery(ALL_PLANETS, {
    onCompleted: ({ planets }) => {
      setPlanets(planets);
    },
  });

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
        <PlanetList loading={loading} planets={data?.planets} />
      </main>
    </div>
  );
};

export default Home;
