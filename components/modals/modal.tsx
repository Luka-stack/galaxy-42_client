import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useRef } from 'react';

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  content: React.ReactNode;
  actionButton?: React.ReactNode;
}

export const Modal = ({ open, setOpen, content, actionButton }: Props) => {
  const cancelButtonRef = useRef<any>(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-opacity-75 bg-gx-purple-500/40" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative overflow-hidden text-left transition-all transform rounded-lg shadow-xl bg-bg-500 sm:my-8 sm:max-w-lg sm:w-full">
                <div className="pt-5 pb-4 px-7 bg-bg-500">{content}</div>

                <div className="px-4 py-3 bg-bg-600 sm:px-6 sm:flex sm:flex-row-reverse">
                  {actionButton}
                  <button
                    type="button"
                    className="px-2 py-1 font-bold border-2 rounded-md cursor-pointer text-gx-purple-500 border-gx-purple-500 hover:text-purple-100 hover:bg-gx-purple-500 hover:font-normal"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
