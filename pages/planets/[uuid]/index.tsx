import Head from 'next/head';
import { useRouter } from 'next/router';
import type { NextPage } from 'next/types';
import { PlanetDetail } from '../../../features/planets/planet-detail';

import { initializeApollo } from '../../../lib/apollo';
import { ALL_PLANETS, GET_PLANET, Planet } from '../../../lib/graphql/planets';

interface StaticProps {
  params: { uuid: string | undefined };
}

interface PageProps {
  planet: Planet;
}

const client = initializeApollo();

const PlanetPage: NextPage<PageProps> = ({ planet }) => {
  const router = useRouter();
  if (router.isFallback) {
    console.log('LOADING!!!!!!!!!!!!!!!!!');
  }

  if (!planet) {
    // TODO ADD ERROR
    return null;
  }

  return (
    <div className="mt-10 mb-10 ml-32">
      <Head>
        <title>{planet.name} | Galaxy 42</title>
      </Head>

      <PlanetDetail planet={planet} />
    </div>
  );
};

export const getStaticPaths = async () => {
  const {
    data: { planets },
  } = await client.query<{ planets: Planet[] }>({ query: ALL_PLANETS });
  const uuids = planets?.map((planet) => planet.uuid);
  const paths = uuids?.map((uuid) => ({ params: { uuid } }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params: { uuid } }: StaticProps) => {
  if (!uuid) {
    throw new Error('Parameter is invalid');
  }

  try {
    const {
      data: { getPlanet: planet },
    } = await client.query({
      query: GET_PLANET,
      variables: { planetUuid: uuid },
    });

    return {
      props: {
        planet,
      },
      revalidate: 60,
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default PlanetPage;
