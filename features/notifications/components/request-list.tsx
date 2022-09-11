import { useRouter } from 'next/router';
import { useState } from 'react';
import { RequestDetail } from '../../../components/modals/request-detail';
import { Request } from '../../../lib/graphql/requests';
import { RequestCard } from '../request-card';

interface Props {
  tab: string;
  myRequests: Request[];
  planetsRequests: Request[];
}

export const RequestList = ({ tab, myRequests, planetsRequests }: Props) => {
  const router = useRouter();

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

  const options = (
    <div className="flex justify-between font-medium text-gx-purple-500">
      <div className="flex space-x-2">
        <button className="hover:text-gx-purple-600 active:scale-105">
          Select All
        </button>
        <button className="hover:text-gx-purple-600 active:scale-105">
          Deselect All
        </button>
      </div>
      <button className="hover:text-gx-purple-600 active:scale-105">
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
              showModal={setUpModal}
              goTo={router.push}
              request={req}
              showActions={true}
              selected={selectedRequests.includes(req.uuid)}
              select={() =>
                setSelectedRequests([...selectedRequests, req.uuid])
              }
              unselect={() =>
                setSelectedRequests(
                  selectedRequests.filter((uuid) => uuid !== req.uuid)
                )
              }
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
