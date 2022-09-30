import { SearchIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import React, { useRef, KeyboardEvent } from 'react';

export const QuickSearch = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onEnter = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      const input = inputRef.current;

      if (input) {
        search(input.value);
      }
    }
  };

  const search = (term: string) => {
    router.push({
      pathname: '/planets',
      query: { search: term },
    });
  };

  return (
    <div className="pl-4 mt-10 border-l border-gx-purple-500/50">
      <h1 className="self-start text-xl font-bold text-gx-purple-500">
        Discover more
      </h1>
      <div className="flex items-center py-1 mt-4 border rounded-full border-slate-500 w-fit">
        <SearchIcon className="h-5 px-2 text-purplish-500" />
        <input
          type="text"
          ref={inputRef}
          onKeyDown={onEnter}
          placeholder="search"
          className="w-40 bg-transparent rounded-r-full focus:outline-none text-purplish-500"
        />
      </div>
      <div className="flex flex-wrap gap-2 mt-6">
        {['ReactJs', 'NestJs', 'NextJs', 'SolidJs', 'JavaScript'].map(
          (topic) => (
            <span
              key={topic}
              className="px-3 py-1 text-sm text-blue-400 rounded-full cursor-pointer bg-blue-900/50 hover:bg-blue-900"
              onClick={() => search(topic)}
            >
              {topic}
            </span>
          )
        )}
      </div>
    </div>
  );
};
