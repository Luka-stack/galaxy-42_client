import { Request } from '../../lib/graphql/requests';
import clip from 'text-clipper';
import { ThumbDownIcon, ThumbUpIcon } from '@heroicons/react/outline';
import classNames from 'classnames';

interface Props {
  myRequests: boolean;
  request: Request;
  showModal: (title: string, content: string) => void;
  goTo: (path: string) => void;
  showActions: boolean;
  selected?: boolean;
  select?: () => void;
  unselect?: () => void;
  handleRequest?: (uuid: string, rejected: boolean) => void;
}

export const RequestCard = ({
  myRequests,
  request,
  selected,
  showActions,
  showModal,
  goTo,
  select,
  unselect,
  handleRequest,
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
      className={classNames(
        'flex justify-between w-full py-4 border-t border-b border-gx-purple-500/50 hover:bg-bg-600 cursor-pointer',
        { 'bg-bg-600': selected }
      )}
      onClick={requestClicked}
    >
      <div className="flex">
        {!request.viewed && !myRequests && (
          <div className="w-3 h-3 mr-4 rounded-full bg-gx-purple-500"></div>
        )}
        <div>
          <h2 className="font-bold text-gx-purple-500">
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
      </div>
      {showActions && (
        <div className="flex items-center mr-2 space-x-4">
          <ThumbUpIcon
            className="w-6 text-green-700 cursor-pointer hover:text-green-500 active:scale-105 h-fit"
            onClick={() => handleRequest!(request.uuid, false)}
          ></ThumbUpIcon>
          <ThumbDownIcon
            className="w-6 text-red-700 cursor-pointer hover:text-red-500 active:scale-105"
            onClick={() => handleRequest!(request.uuid, true)}
          ></ThumbDownIcon>
        </div>
      )}
    </div>
  );
};
