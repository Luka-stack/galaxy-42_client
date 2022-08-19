import { useMutation } from '@apollo/client';
import Head from 'next/head';
import { useRouter } from 'next/router';
import type { NextPage } from 'next/types';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { PlanetForm } from '../../../components/planet-form';
import {
  Planet,
  PlanetInput,
  UpdatePlanetInput,
  UPDATE_PLANET,
} from '../../../lib/graphql/planets';
import { planetsState } from '../../../lib/recoil/atoms/planets-atom';

const EditPlanet: NextPage = () => {
  const router = useRouter();
  const planets = useRecoilValue(planetsState);
  const planetUuuid = router.query.uuid;

  const [variables, setVariables] = useState<PlanetInput | null>(null);

  const planet = useMemo(() => {
    return planets.find((planet) => planet.uuid === planetUuuid);
  }, [planets, planetUuuid]);

  const [updatePlanet, { loading, error }] = useMutation<
    {
      updatePlanet: Planet;
    },
    { planetUuid: String; planet: UpdatePlanetInput }
  >(UPDATE_PLANET, {
    update: (_cache, { data }) => router.push('/profile'),
    onError: (err) => console.log(err.message),
  });

  useEffect(() => {
    if (variables) {
      updatePlanet({
        variables: {
          planetUuid: planet!.uuid,
          planet: variables,
        },
      });

      setVariables(null);
    }
  }, [variables, updatePlanet]);

  return (
    <div className="my-10 ml-32">
      <Head>
        <title>{planet!.name} | Galaxy 42</title>
      </Head>

      <PlanetForm
        planet={planet}
        setVariables={setVariables}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default EditPlanet;
