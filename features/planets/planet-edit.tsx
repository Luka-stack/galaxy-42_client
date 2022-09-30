import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CoverLoading } from '../../components/loading/cover-loading';
import { PlanetForm } from '../../components/planets/planet-form';
import {
  Planet,
  PlanetInput,
  UpdatePlanetInput,
  UPDATE_PLANET,
} from '../../lib/graphql/planets';

export const PlanetEdit = ({ planet }: { planet: Planet }) => {
  const router = useRouter();

  const [variables, setVariables] = useState<PlanetInput | null>(null);

  const [updatePlanet, { loading, error }] = useMutation<
    {
      updatePlanet: Planet;
    },
    { planetUuid: String; planet: UpdatePlanetInput }
  >(UPDATE_PLANET, {
    update: (_cache, { data }) => router.replace(`/planets/${planet.uuid}`),
    onError: (err) => console.log(err),
  });

  // TODO ADD ERROR

  useEffect(() => {
    if (variables) {
      const { bio, requirements, isPublic, topics, image } = variables;

      updatePlanet({
        variables: {
          planetUuid: planet.uuid,
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
    <>
      {loading && <CoverLoading title={'updating...'} />}

      <PlanetForm
        planet={planet}
        setVariables={setVariables}
        loading={loading}
        error={error}
      />
    </>
  );
};
