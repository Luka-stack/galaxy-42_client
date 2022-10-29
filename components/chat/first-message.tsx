import Image from 'next/image';
import Link from 'next/link';

import { Message } from '../../lib/graphql/messages';

interface Props {
  message: Message;
}

export const FirstMessage = ({ message }: Props) => {
  return (
    <div className="flex px-4 py-4 space-x-4 border-t-2 hover:bg-bg-600 border-gx-purple-500/20 first:border-none">
      <div className="flex-none w-16">
        <div className="relative w-10 h-10 border rounded-full border-gx-purple-500">
          <Image
            src={message.author.imageUrl}
            alt="logo"
            layout="fill"
            className="rounded-full"
          />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <Link href={`/profile/${message.author.username}`}>
            <a className="text-gx-purple-50 hover:underline" target="_blank">
              {message.author.username}
            </a>
          </Link>
          <h3 className="text-xs text-purplish-500">
            {new Date(message.createdAt).toLocaleString()}
          </h3>
        </div>
        <p className="text-purplish-100">{message.content}</p>
      </div>
    </div>
  );
};
