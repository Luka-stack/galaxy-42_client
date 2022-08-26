import { TrashIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import Head from 'next/head';
import type { NextPage } from 'next/types';
import { useState } from 'react';
import clip from 'text-clipper';
import { RequestDetail } from '../../components/modals/request-detail';

const test = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

const NotificationsPage: NextPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedReq, setSelectedReq] = useState<{
    title: string;
    content: string;
  } | null>(null);
  const [option, setOption] = useState<'notify' | 'new' | 'seen' | 'req'>(
    'notify'
  );

  const setUpModal = () => {
    setSelectedReq({
      title: 'Request to join React Masters',
      content: "I want to join you becase you are cool and I'm cool",
    });

    setOpenModal(true);
  };

  return (
    <div className="h-screen mt-10 ml-32">
      <Head>
        <title>Notifications | Galaxy 42</title>
      </Head>

      <RequestDetail
        open={openModal}
        setOpen={setOpenModal}
        request={selectedReq!}
      />

      <main className="w-full h-full px-5 mx-auto">
        <div className="flex w-full h-full border border-b-0 rounded-b-none border-gx-purple-500/50 rounded-2xl">
          <section className="w-40 h-full pt-4 pl-4 bg-gx-purple-500/10 text-purplish-500 shrink-0">
            <h3
              className={classNames(
                'relative text-lg font-bold hover:scale-105 cursor-pointer',
                { 'underline underline-offset-4': option === 'notify' }
              )}
              onClick={() => setOption('notify')}
            >
              Notifications
              <div className="absolute top-0 w-3 h-3 rounded-full bg-gx-purple-50 right-8"></div>
            </h3>
            <h5
              className={classNames(
                'relative mt-1 ml-5 cursor-pointer hover:scale-105',
                { 'underline underline-offset-4': option === 'new' }
              )}
              onClick={() => setOption('new')}
            >
              New
              <span className="absolute top-0 text-xs left-10 text-gx-purple-50">
                20
              </span>
            </h5>
            <h5
              className={classNames(
                'relative mt-1 ml-5 cursor-pointer hover:scale-105',
                { 'underline underline-offset-4': option === 'seen' }
              )}
              onClick={() => setOption('seen')}
            >
              Seen
              <span className="absolute top-0 text-xs left-10 text-gx-purple-50">
                20
              </span>
            </h5>
            <h3
              className={classNames(
                'mt-5 text-lg font-bold hover:scale-105 cursor-pointer',
                {
                  'underline underline-offset-4': option === 'req',
                }
              )}
              onClick={() => setOption('req')}
            >
              Requests
            </h3>
          </section>

          <section className="w-full px-4 pt-4 space-y-5">
            {option === 'req' ? (
              <div className="w-full py-4 border-t border-b border-gx-purple-500/50 hover:bg-bg-600">
                <h2 className="ml-4 font-bold text-gx-purple-500">
                  Joining Request to{' '}
                  <span className="underline cursor-pointer underline-offset-4 hover:text-gx-purple-200">
                    React Masters
                  </span>
                </h2>
                <p
                  className="mx-4 mt-2 cursor-pointer text-purplish-500"
                  onClick={setUpModal}
                >
                  {clip(test, 220, { maxLines: 3 })}
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full h-16 border-t border-b cursor-pointer border-gx-purple-500/50 hover:bg-bg-600">
                <div className="flex items-center ml-4">
                  <div className="w-3 h-3 mr-4 rounded-full bg-gx-purple-500"></div>
                  <p className="text-purplish-500">
                    <span className="font-bold underline text-gx-purple-500 underline-offset-4 hover:text-gx-purple-200">
                      Planet Name
                    </span>{' '}
                    has rejected your request
                  </p>
                </div>
                <TrashIcon className="mr-4 w-7 h-7 text-gx-purple-500 hover:text-gx-purple-200 hover:scale-105" />
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default NotificationsPage;
