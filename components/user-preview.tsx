import Image from 'next/image';

import { User } from '../lib/graphql/users';

interface Props {
  user: User;
}

export const UserPreview = ({ user }: Props) => {
  return (
    <div>
      <div className="relative w-24 h-24 border rounded-full border-gx-purple-500">
        <Image
          src={user.imageUrl}
          alt="Profile Image"
          layout="fill"
          className="rounded-full"
        />
      </div>

      <h1 className="mt-4 text-xl font-bold leading-10 text-gx-purple-500">
        {user.username}
      </h1>
      <p className="text-sm italic font-light text-purplish-500">
        member since {new Date(user.createdAt).toLocaleDateString()}
      </p>
      <p className="mt-4 text-sm text-purplish-500">{user.bio}</p>

      {user.topics.length > 0 && (
        <div className="flex flex-col mt-4">
          <h3 className="text-lg font-bold text-purplish-300">Interests</h3>
          {user.topics.split(' ').map((topic) => (
            <span key={topic} className="mt-1 text-sm text-blue-400">
              {topic}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
