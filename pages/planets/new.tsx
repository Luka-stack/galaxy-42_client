import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import type { NextPage } from 'next/types';

import { CREATE_PLANET, PlanetInput } from '../../lib/graphql/planets';
import { PlanetForm } from '../../components/planets/planet-form';
import { CoverLoading } from '../../components/loading/cover-loading';
import { ME } from '../../lib/graphql/users';

const NewPlanet: NextPage = () => {
  const router = useRouter();

  const [variables, setVariables] = useState<PlanetInput | null>(null);

  const [createPlanet, { loading, error }] = useMutation(CREATE_PLANET, {
    update(_cache, { data }) {
      router.replace(`/planets/${data.createPlanet.uuid}`);
    },
    refetchQueries: [ME],
    onQueryUpdated(observableQuery) {
      return observableQuery.refetch();
    },
  });

  useEffect(() => {
    if (variables) {
      createPlanet({
        variables: {
          planet: variables,
        },
      });

      setVariables(null);
    }
  }, [variables, createPlanet]);

  return (
    <div className="my-10 ml-32">
      <Head>
        <title>New Planet | Galaxy 42</title>
      </Head>

      {loading && <CoverLoading title={'creating...'} />}

      <PlanetForm setVariables={setVariables} loading={loading} error={error} />
    </div>
  );
};

export default NewPlanet;
