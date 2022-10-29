import { FormEvent, useRef } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/outline';
import { useMutation } from '@apollo/client';

import { SEND_MESSAGE } from '../../lib/graphql/messages';

interface Props {
  conversation: {
    recipient: string;
    toChannel: boolean;
  };
}

export const ChatInput = ({ conversation }: Props) => {
  const contentRef = useRef<HTMLInputElement>(null);

  const [sendMessage, { loading, error }] = useMutation(SEND_MESSAGE, {
    update: (_cache, { data }) => console.log(data),
    onError: (err) => console.log(err),
  });

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (contentRef.current && contentRef.current.value) {
      sendMessage({
        variables: {
          message: {
            content: contentRef.current.value,
            recipient: conversation.recipient,
            toChannel: conversation.toChannel,
          },
        },
      });

      contentRef.current!.value = '';
    }
  };

  return (
    <div className="flex items-center justify-center flex-none bg-bg-400 h-14">
      <form onSubmit={onSubmit} className="flex w-full px-4 space-x-4">
        <input
          type="text"
          className="w-full px-2 py-2 rounded-lg outline-none bg-bg-500 text-purplish-500 focus:outline-gx-purple-500 ring-0 focus:ring-0"
          ref={contentRef}
          placeholder="Message..."
        />
        <button type="submit">
          <PaperAirplaneIcon className="rotate-45 cursor-pointer h-7 text-purplish-500 hover:text-white" />
        </button>
      </form>
    </div>
  );
};
