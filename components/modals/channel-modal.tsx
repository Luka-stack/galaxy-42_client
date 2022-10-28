import { useMutation } from '@apollo/client';
import { Dialog } from '@headlessui/react';
import { useRef } from 'react';

import { CREATE_CHANNEL } from '../../lib/graphql/channels';
import { Modal } from './modal';

interface Props {
  planetId: string;
  refetch: () => void;
  open: boolean;
  setOpen: (status: boolean) => void;
}

export const ChannelModal = ({ planetId, open, refetch, setOpen }: Props) => {
  const nameInput = useRef<HTMLInputElement>(null);

  const [createChannel, { loading, error }] = useMutation(CREATE_CHANNEL, {
    onCompleted(_data) {
      refetch();
      setOpen(false);
    },
  });

  const actionClick = () => {
    if (nameInput.current && nameInput.current.value) {
      createChannel({
        variables: {
          channel: {
            name: nameInput.current.value.toLowerCase(),
            planetId,
          },
        },
      });
    }
  };

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      content={
        <div className="w-full">
          <div className="mt-3 text-center sm:mt-0 sm:text-left">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gx-purple-500"
            >
              Create new channel for planet
            </Dialog.Title>
            <div className="relative mt-8">
              <input
                id="name"
                type="text"
                className="w-full h-10 placeholder-transparent border-b-2 border-slate-500 text-purplish-200 peer focus:outline-none focus:border-gx-purple-500 bg-bg-500"
                placeholder="placeholder"
                ref={nameInput}
              />

              <label
                htmlFor="name"
                className="absolute left-0 -top-3.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-slate-300 peer-focus:text-sm text-gray-400"
              >
                Channel name
              </label>
              {error && (
                <p className="mt-2 text-xs italic text-pink-500">
                  {error.message}
                </p>
              )}
            </div>
          </div>
        </div>
      }
      actionButton={
        <button className="ml-4 gx-btn" onClick={actionClick}>
          Create Channel
        </button>
      }
    />
  );
};
