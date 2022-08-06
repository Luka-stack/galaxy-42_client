import Head from 'next/head';
import { NextPage } from 'next/types';
import { Jumbotron } from '../components/jumbotron';
import { LatestPlanets } from '../components/latest-planets';
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

      <header className="w-48 border h-80 border-gx-purple-500"></header>

      <main className="w-3/4 mx-auto">
        {/* Jumbotron */}
        <Jumbotron />

        {/* Section Wrapper */}
        <SectionSeparator title="The latest creations" style="mt-20" />
        <LatestPlanets />
        {/* Latest 5 Planets */}

        {/* Section Wrapper */}
        {/* <SectionSeparator /> */}
        {/* Explore different Planets */}
      </main>
    </div>
  );
};

export default Home;
