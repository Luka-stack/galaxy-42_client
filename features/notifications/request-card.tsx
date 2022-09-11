import { Request } from '../../lib/graphql/requests';
import clip from 'text-clipper';
import { ThumbDownIcon, ThumbUpIcon } from '@heroicons/react/outline';

interface Props {
  request: Request;
  showModal: (title: string, content: string) => void;
  goTo: (path: string) => void;
  showActions: boolean;
  selected?: boolean;
  select?: () => void;
  unselect?: () => void;
}

export const RequestCard = ({
  request,
  selected,
  showActions,
  showModal,
  goTo,
  select,
  unselect,
}: Props) => {
  const requestClicked = () => {
    if (!select || !unselect) return;

    if (selected) {
      unselect();
      return;
    }

    select();
  };

  return (
    <div
      key={request.uuid}
      className="flex justify-between w-full py-4 border-t border-b border-gx-purple-500/50 hover:bg-bg-600"
      onClick={requestClicked}
    >
      <div>
        <h2 className="ml-4 font-bold text-gx-purple-500">
          Joining Request from{' '}
          <span
            className="underline cursor-pointer underline-offset-4 hover:text-gx-purple-200"
            onClick={() => goTo(`/profile/${request.user.username}`)}
          >
            {request.user.username}
          </span>{' '}
          to{' '}
          <span
            className="underline cursor-pointer underline-offset-4 hover:text-gx-purple-200"
            onClick={() => goTo(`/planets/${request.planet.uuid}`)}
          >
            {request.planet.name}
          </span>
        </h2>
        {request.content ? (
          <p
            className="mx-4 mt-2 cursor-pointer text-purplish-500"
            onClick={() =>
              showModal(
                `Joining Request to ${request.planet.name} from ${request.user.username}`,
                request.content!
              )
            }
          >
            {clip(request.content, 220, { maxLines: 3 })}
          </p>
        ) : (
          <p className="mx-4 mt-2 cursor-pointer text-purplish-500">
            No content send.
          </p>
        )}
      </div>
      {showActions && (
        <div className="flex items-center mr-2 space-x-4">
          <ThumbUpIcon className="w-6 text-green-700 cursor-pointer hover:text-green-500 active:scale-105 h-fit"></ThumbUpIcon>
          <ThumbDownIcon className="w-6 text-red-700 cursor-pointer hover:text-red-500 active:scale-105"></ThumbDownIcon>
        </div>
      )}
    </div>
  );
};
