import Head from 'next/head';
import type { NextPage } from 'next/types';

import { ALL_PLANETS, Planet } from '../../lib/graphql/planets';
import { initializeApollo } from '../../lib/apollo';
import { PlanetSearch } from '../../features/planets/planet-search';

interface PageProps {
  planets: Planet[];
}

const PlanetsPage: NextPage<PageProps> = ({ planets }) => {
  return (
    <div className="w-full mt-10">
      <Head>
        <title>Planets | Galaxy 42</title>
      </Head>

      <PlanetSearch planets={planets} />
    </div>
  );
};

export const getStaticProps = async () => {
  const client = initializeApollo();

  try {
    const { data } = await client.query<{ planets: Planet[] }>({
      query: ALL_PLANETS,
    });

    return {
      props: {
        planets: data.planets,
      },
      revalidate: 60,
    };
  } catch {
    return {
      props: {
        planets: [],
      },
      revalidate: 60,
    };
  }
};

export default PlanetsPage;
