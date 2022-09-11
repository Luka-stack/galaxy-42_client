import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import type { NextPage } from 'next/types';

import { CREATE_PLANET, Planet, PlanetInput } from '../../lib/graphql/planets';
import { PlanetForm } from '../../components/planets/planet-form';

const NewPlanet: NextPage = () => {
  const router = useRouter();

  const [variables, setVariables] = useState<PlanetInput | null>(null);

  const [createPlanet, { loading, error }] = useMutation<
    {
      createPlanet: Planet;
    },
    { planet: PlanetInput }
  >(CREATE_PLANET, {
    update: (_cache, { data }) =>
      router.push(`/planets/${data?.createPlanet.uuid}`),
    onError: (err) => console.log(err.message),
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

      <PlanetForm setVariables={setVariables} loading={loading} error={error} />
    </div>
  );
};

export default NewPlanet;
