import Head from 'next/head';
import type { NextPage } from 'next/types';

import { Navbar } from '../components/navbar';
import { Jumbotron } from '../components/jumbotron';
import { LatestPlanets } from '../components/latest-planets';
import { PlanetList } from '../components/planet-list';
import { SectionSeparator } from '../components/section-separator';

const Home: NextPage = () => {
  return (
    <div className="flex mt-10">
      <Head>
        <title>Galaxy 42</title>
        <meta
          name="Galaxy 42"
          content="Galaxy 42 is a place where you can connect with people"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="w-3/4 mx-auto">
        <Jumbotron />

        <SectionSeparator title="The latest creations" style="mt-20" />
        <LatestPlanets />

        {/* Section Wrapper */}
        <SectionSeparator title="Explore different planets" style="mt-20" />
        <PlanetList />
      </main>
    </div>
  );
};

export default Home;
