import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { RequestModal } from '../components/modals/request-modal';
import { CREATE_REQUEST, RequestInput } from '../lib/graphql/requests';
import { User } from '../lib/graphql/users';
import { authState } from '../lib/recoil/atoms';

interface PageProps {
  uuid: string;
  user?: User;
}

const doesPlanetBelonsToUser = (planetUuid: string, user: User) => {
  const foundPlanet = user.planets.find((p) => p.planet.uuid === planetUuid);
  return foundPlanet ? foundPlanet.role : 'NO_CONNECTION';
};

export const PlanetDetailButtons = ({ uuid }: PageProps) => {
  const router = useRouter();
  const user = useRecoilValue(authState);
  const [openModal, setOpenModal] = useState(false);

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

  if (!user) {
    return null;
  }

  return (
    <>
      <RequestModal
        open={openModal}
        setOpen={setOpenModal}
        setContent={sendRequest}
      />

      {doesPlanetBelonsToUser(uuid!, user) ? (
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
