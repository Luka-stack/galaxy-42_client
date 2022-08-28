import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import type { NextPage } from 'next/types';

import { authState } from '../../lib/recoil/atoms/auth-atom';
import { CREATE_PLANET, Planet, PlanetInput } from '../../lib/graphql/planets';
import { PlanetForm } from '../../components/planet-form';

const NewPlanet: NextPage = () => {
  const router = useRouter();
  const authUser = useRecoilValue(authState);

  const [variables, setVariables] = useState<PlanetInput | null>(null);

  const [createPlanet, { loading, error }] = useMutation<
    {
      createPlanet: Planet;
    },
    { userId: String; planet: PlanetInput }
  >(CREATE_PLANET, {
    update: (_cache, { data }) => router.push('/profile'),
    onError: (err) => console.log(err.message),
  });

  useEffect(() => {
    if (variables) {
      console.log('Inside If in UseEffect');

      createPlanet({
        variables: {
          userId: authUser!.uuid,
          planet: variables,
        },
      });

      setVariables(null);
    }
  }, [variables]);

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
