import Head from 'next/head';
import type { NextPage } from 'next/types';

import { Jumbotron } from '../components/jumbotron';
import { SectionSeparator } from '../components/section-separator';
import { useAuthState } from '../context/auth-provider';
import { Planets } from '../features/planets/planets';
import { PlanetsLatest } from '../features/planets/planets-latest';
import { addApolloState, initializeApollo } from '../lib/apollo';
import { ALL_PLANETS, Planet } from '../lib/graphql/planets';

const Home: NextPage = () => {
  const { user } = useAuthState();

  return (
    <div className="w-full mt-10">
      <Head>
        <title>Galaxy 42</title>
        <meta
          name="Galaxy 42"
          content="Galaxy 42 is a place where you can connect with people"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-11/12 mx-auto xl:w-3/4">
        {user ? (
          <SectionSeparator title="The latest creations" style="mt-10 pl-4" />
        ) : (
          <>
            <Jumbotron />
            <SectionSeparator title="The latest creations" style="mt-20 pl-4" />
          </>
        )}

        <PlanetsLatest />

        <SectionSeparator
          title="Explore different planets"
          style="mt-10 pl-4"
        />
        <Planets />
      </main>
    </div>
  );
};

export const getStaticProps = async () => {
  const client = initializeApollo();

  try {
    await client.query<{ getPlanets: Planet[] }>({
      query: ALL_PLANETS,
    });

    return addApolloState(client, {
      props: {},
      revalidate: 60,
    });
  } catch {
    return {
      notFound: true,
    };
  }
};

export default Home;
