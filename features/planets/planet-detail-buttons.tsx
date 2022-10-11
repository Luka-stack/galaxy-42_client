import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { RequestModal } from '../../components/modals/request-modal';
import { useAuthState } from '../../context/auth-provider';
import { CREATE_REQUEST } from '../../lib/graphql/requests';
import { User } from '../../lib/graphql/users';

interface PageProps {
  uuid: string;
  user: User;
}

export const PlanetDetailButtons = ({ uuid, user }: PageProps) => {
  const router = useRouter();
  const { myRequests } = useAuthState();

  const [openModal, setOpenModal] = useState(false);

  const planetRelation = useMemo(() => {
    const foundPlanet = user.planets.find((p) => p.planet.uuid === uuid);

    if (foundPlanet) {
      return foundPlanet.role;
    }

    const thisReqeust = myRequests.find((req) => req.planet.uuid === uuid);

    return thisReqeust ? 'PENDING' : 'NO_CONNECTION';
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const [createRequest, { error }] = useMutation(CREATE_REQUEST, {
    update: (_cache, { data }) => {
      if (data.createRequest) {
        toast.info('Request sucessfully send.');
      } else {
        toast.error("Couldn't send request. Try again later.");
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  // TODO add error

  if (planetRelation === 'USER' || planetRelation === 'PENDING') {
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
