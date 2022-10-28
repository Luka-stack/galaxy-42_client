import Head from 'next/head';
import type { GetServerSidePropsContext, NextPage } from 'next/types';

import { PlanetEdit } from '../../../features/planets/planet-edit';
import { addApolloState, initializeApollo } from '../../../lib/apollo';
import { GET_PLANET_AUTH, Planet } from '../../../lib/graphql/planets';

interface PageProps {
  planet: Planet;
}

const EditPlanet: NextPage<PageProps> = ({ planet }) => {
  return (
    <div className="w-full my-10">
      <Head>
        <title>{planet.name} | Galaxy 42</title>
      </Head>

      <PlanetEdit planet={planet} />
    </div>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const client = initializeApollo({ headers: context?.req?.headers });

  console.log('HEADERS', context?.req?.headers);

  try {
    const {
      data: { getPlanetAuth: planet },
    } = await client.query({
      query: GET_PLANET_AUTH,
      variables: { planetUuid: context?.query?.uuid as string },
    });

    return addApolloState(client, {
      props: {
        planet,
      },
    });
  } catch (err: any) {
    if (err.graphQLErrors[0].extensions.response.statusCode === 401) {
      return {
        props: {},
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    if (err.graphQLErrors[0].extensions.response.statusCode === 403) {
      return {
        props: {},
        redirect: {
          destination: `/planets/${context?.query?.uuid as string}`,
          permanent: false,
        },
      };
    }

    return {
      notFound: true,
    };
  }
};
export default EditPlanet;
