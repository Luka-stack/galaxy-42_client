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
import { authState, planetsState } from '../../../lib/recoil/atoms';

const EditPlanet: NextPage = () => {
  const router = useRouter();
  const planets = useRecoilValue(planetsState);
  const authUser = useRecoilValue(authState);
  const planetUuuid = router.query.uuid;

  if (
    !authUser ||
    !authUser.planets.some(
      (p) => p.planet.uuid === planetUuuid && p.role === 'ADMIN'
    )
  ) {
    router.push('/');
  }

  const planet = useMemo(() => {
    return planets.find((planet) => planet.uuid === planetUuuid);
  }, [planets, planetUuuid]);

  const [variables, setVariables] = useState<PlanetInput | null>(null);

  const [updatePlanet, { loading, error }] = useMutation<
    {
      updatePlanet: Planet;
    },
    { planetUuid: String; planet: UpdatePlanetInput }
  >(UPDATE_PLANET, {
    update: (_cache, { data }) => router.back(),
    onError: (err) => console.log(err),
  });

  useEffect(() => {
    if (variables) {
      const { bio, requirements, isPublic, topics, image } = variables;

      updatePlanet({
        variables: {
          planetUuid: planet!.uuid,
          planet: {
            bio,
            requirements,
            topics,
            isPublic,
            image: image || null,
          },
        },
      });

      setVariables(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variables]);

  return (
    <div className="my-10 ml-32">
      <Head>
        <title>{planet?.name || 'Edit Planet'} | Galaxy 42</title>
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
