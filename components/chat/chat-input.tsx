import { FormEvent } from 'react';

import { PaperAirplaneIcon } from '@heroicons/react/outline';

export const ChatInput = () => {
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    console.log('Send Message');
  };

  return (
    <div className="flex items-center justify-center flex-none bg-bg-400 h-14">
      <form onSubmit={onSubmit} className="flex w-full px-4 space-x-4">
        <input
          type="text"
          className="w-full px-2 py-2 rounded-lg outline-none bg-bg-500 text-purplish-500 focus:outline-gx-purple-500 ring-0 focus:ring-0"
          placeholder="Message..."
        />
        <button type="submit">
          <PaperAirplaneIcon className="rotate-45 cursor-pointer h-7 text-purplish-500 hover:text-white" />
        </button>
      </form>
    </div>
  );
};
