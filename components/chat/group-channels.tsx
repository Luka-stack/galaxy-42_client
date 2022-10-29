import classNames from 'classnames';
import { PlusIcon, AtSymbolIcon } from '@heroicons/react/solid';
import { ChannelModal } from '../modals/channel-modal';
import { useState } from 'react';
import { Channel } from '../../lib/graphql/channels';
import { initializeApollo } from '../../backup/apollo';
import { GET_PLANET_FOR_CHAT } from '../../lib/graphql/planets';

interface Props {
  planetId: string;
  channels: Channel[];
  selected: {
    recipient: string;
    toChannel: boolean;
  };
  select: (data: { recipient: string; toChannel: boolean }) => void;
  refetch: () => void;
}

// const client = initializeApollo();

export const GroupChannels = ({
  planetId,
  channels,
  refetch,
  select,
  selected,
}: Props) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex flex-col px-4 mb-4 center-center h-1/3">
      <div className="flex justify-between font-semibold uppercase cursor-default text-purplish-500">
        Group channels
        <PlusIcon
          className="w-5 h-5 cursor-pointer hover:text-white"
          onClick={() => setOpenModal(true)}
        />
      </div>

      <div className="h-full overflow-y-auto scrollbar-hide">
        {channels.map((channel) => (
          <div
            key={channel.uuid}
            className={classNames(
              'flex items-center p-1 my-1 space-x-1 rounded-md text-purplish-500 hover:bg-bg-300 cursor-pointer',
              { 'bg-bg-300': selected.recipient === channel.uuid }
            )}
            onClick={() => select({ recipient: channel.uuid, toChannel: true })}
          >
            {/* ICON */}
            <AtSymbolIcon className="w-5 h-5" />
            <h1>{channel.name}</h1>
          </div>
        ))}
      </div>

      <ChannelModal
        open={openModal}
        setOpen={setOpenModal}
        planetId={planetId}
        refetch={refetch}
      />
    </div>
  );
};
