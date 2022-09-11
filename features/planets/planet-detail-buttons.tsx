import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

import { RequestModal } from '../../components/modals/request-modal';
import { CREATE_REQUEST, RequestInput } from '../../lib/graphql/requests';
import { User } from '../../lib/graphql/users';

interface PageProps {
  uuid: string;
  user: User;
}

export const PlanetDetailButtons = ({ uuid, user }: PageProps) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  const planetRelation = useMemo(() => {
    const foundPlanet = user.planets.find((p) => p.planet.uuid === uuid);
    return foundPlanet ? foundPlanet.role : 'NO_CONNECTION';
  }, [uuid, user]);

  const sendRequest = (content: string) => {
    createRequest({
      variables: {
        request: {
          planetUuid: uuid,
          content,
        },
      },
    });
  };

  const [createRequest, { loading, error }] = useMutation<
    {
      createRequest: Request;
    },
    {
      request: RequestInput;
    }
  >(CREATE_REQUEST, {
    update: (_cache, { data }) => console.log(data),
    onError: (err) => console.log(err),
  });

  // TODO add loading
  // TODO add error

  if (planetRelation === 'USER') {
    return null;
  }

  return (
    <>
      <RequestModal
        open={openModal}
        setOpen={setOpenModal}
        setContent={sendRequest}
      />

      {planetRelation === 'ADMIN' ? (
        <button
          className="absolute right-0 top-1 gx-btn"
          onClick={() => router.push(`${router.asPath}/edit`)}
        >
          Edit Planet
        </button>
      ) : (
        <button
          className="absolute right-0 top-1 gx-btn"
          onClick={() => setOpenModal(true)}
        >
          Send Request to Join
        </button>
      )}
    </>
  );
};
