import { Dialog } from '@headlessui/react';
import React, { useRef } from 'react';
import { Modal } from './modal';

interface Props {
  open: boolean;
  setOpen: (status: boolean) => void;
  setContent: (content: string) => void;
}

export const RequestModal = ({ open, setOpen, setContent }: Props) => {
  const areaRef = useRef<any>(null);

  const actionClick = () => {
    const input = areaRef.current;

    setOpen(false);
    setContent(input.value);
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
              Request to joing Planet Name
            </Dialog.Title>
            <div className="mt-5">
              <textarea
                ref={areaRef}
                placeholder="Why you want to join?"
                className="w-full h-20 border-b-2 resize-none bg-bg-500 text-purplish-200 border-slate-500 focus:border-gx-purple-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      }
      actionButton={
        <button type="button" className="ml-4 gx-btn" onClick={actionClick}>
          Send Request
        </button>
      }
    />
  );
};
