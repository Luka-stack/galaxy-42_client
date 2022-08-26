import { Dialog } from '@headlessui/react';
import { Modal } from './modal';

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  request: { title: string; content: string };
}

export const RequestDetail = ({ open, setOpen, request }: Props) => (
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
            {request?.title}
          </Dialog.Title>
          <div className="mt-5">
            <p className="w-full text-purplish-200">{request?.content}</p>
          </div>
        </div>
      </div>
    }
  />
);
