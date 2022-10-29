import classNames from 'classnames';
import Image from 'next/image';
import { useAuthState } from '../../context/auth-provider';

interface Props {
  users: {
    role: 'ADMIN' | 'USER';
    user: {
      uuid: string;
      username: string;
      imageUrl: string;
    };
  }[];
  selected: {
    recipient: string;
    toChannel: boolean;
  };
  select: (data: { recipient: string; toChannel: boolean }) => void;
}

export const UserChannels = ({ users, select, selected }: Props) => {
  const { user } = useAuthState();

  return (
    <div className="flex flex-col px-4 pb-5 center-center h-2/3">
      <div className="flex justify-between font-semibold uppercase cursor-default text-purplish-500">
        Users
      </div>

      <div className="h-full overflow-y-auto scrollbar-hide">
        {users.map((u) => {
          if (user?.uuid === u.user.uuid) return null;

          return (
            <div
              key={u.user.uuid}
              className={classNames(
                'flex items-center p-1 my-1 space-x-1 rounded-md text-purplish-500 hover:bg-bg-300 cursor-pointer',
                { 'bg-bg-300': selected.recipient === u.user.uuid }
              )}
              onClick={() =>
                select({ recipient: u.user.uuid, toChannel: false })
              }
            >
              {/* ICON */}
              <div className="relative border rounded-full w-7 h-7 border-gx-purple-500">
                <Image
                  src={u.user.imageUrl}
                  alt=""
                  layout="fill"
                  className="rounded-full"
                />
              </div>
              <h1>{u.user.username}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};
