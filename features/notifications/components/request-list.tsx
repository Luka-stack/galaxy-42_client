import { useMutation } from '@apollo/client';
import { onError } from 'apollo-link-error';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { RequestDetail } from '../../../components/modals/request-detail';
import { useAuthDispatch } from '../../../context/auth-provider';
import {
  Request,
  RESOLVE_REQUEST,
  SET_REQUESTS_VIEWED,
} from '../../../lib/graphql/requests';
import { RequestCard } from '../request-card';

interface Props {
  tab: string;
  myRequests: Request[];
  planetsRequests: Request[];
}

export const RequestList = ({ tab, myRequests, planetsRequests }: Props) => {
  const router = useRouter();
  const dispatch = useAuthDispatch();

  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedReq, setSelectedReq] = useState<{
    title: string;
    content: string;
  } | null>(null);

  const setUpModal = (title: string, content: string) => {
    setSelectedReq({
      title,
      content,
    });

    setOpenModal(true);
  };

  const selectAll = () => {
    if (tab === 'myReq') {
      setSelectedRequests(myRequests.map((req) => req.uuid));
    } else {
      setSelectedRequests(planetsRequests.map((req) => req.uuid));
    }
  };

  const [requestsViewed] = useMutation(SET_REQUESTS_VIEWED, {
    update: (_cache, { data }) => {
      dispatch('UPDATE_PLANETSREQUESTS', data.requestsViewed);
      setSelectedRequests([]);
    },
    onError: (err) => console.log(err),
  });

  const [resolveRequest] = useMutation(RESOLVE_REQUEST, {
    update: (_cache, { data }) => {
      dispatch('DELETE_PLANETSREQUEST', data.resolveRequest);
    },
    onError: (err) => console.log(err),
  });

  const markAsSeen = () => {
    requestsViewed({
      variables: {
        requestUuids: selectedRequests,
      },
    });
  };

  const handleRequest = (uuid: string, rejected: boolean) => {
    resolveRequest({
      variables: {
        requestUuid: uuid,
        rejected,
      },
    });
  };

  const options = (
    <div className="flex justify-between font-medium text-gx-purple-500">
      <div className="flex space-x-2">
        <button
          className="hover:text-gx-purple-600 active:scale-105"
          onClick={selectAll}
        >
          Select All
        </button>
        <button
          className="hover:text-gx-purple-600 active:scale-105"
          onClick={() => setSelectedRequests([])}
        >
          Deselect All
        </button>
      </div>
      <button
        className="hover:text-gx-purple-600 active:scale-105"
        disabled={selectedRequests.length === 0}
        onClick={markAsSeen}
      >
        Mark as seen
      </button>
    </div>
  );

  const renderRequests = () => {
    if (tab === 'myReq') {
      return (
        <>
          {myRequests.map((req) => (
            <RequestCard
              key={req.uuid}
              myRequests
              showModal={setUpModal}
              goTo={router.push}
              request={req}
              showActions={false}
            />
          ))}
        </>
      );
    }

    if (tab === 'planetsReq') {
      return (
        <>
          {options}
          {planetsRequests.map((req) => (
            <RequestCard
              key={req.uuid}
              myRequests={false}
              showActions={true}
              showModal={setUpModal}
              goTo={router.push}
              request={req}
              selected={selectedRequests.includes(req.uuid)}
              select={() =>
                setSelectedRequests([...selectedRequests, req.uuid])
              }
              unselect={() =>
                setSelectedRequests(
                  selectedRequests.filter((uuid) => uuid !== req.uuid)
                )
              }
              handleRequest={handleRequest}
            />
          ))}
        </>
      );
    }

    return null;
  };

  return (
    <div>
      <RequestDetail
        open={openModal}
        setOpen={setOpenModal}
        request={selectedReq!}
      />

      {renderRequests()}
    </div>
  );
};
