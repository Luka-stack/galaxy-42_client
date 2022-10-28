import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import clip from 'text-clipper';
import { GET_MESSAGES } from '../../lib/graphql/messages';
import { ChatPlanet } from '../../lib/graphql/planets';
import { chatId, chatMessages } from '../../lib/recoil/atoms';
import { Chat } from './chat';
import { ChatInput } from './chat-input';
import { GroupChannels } from './group-channels';
import { UserChannels } from './user-channels';

interface Props {
  planet: ChatPlanet;
}

export const ChatContainer = ({ planet }: Props) => {
  const setChatId = useSetRecoilState(chatId);
  const setChatMessages = useSetRecoilState(chatMessages);

  const [conversation, setConversation] = useState<{
    recipient: string;
    toChannel: boolean;
  }>({
    recipient: planet.channels.find((ch) => ch.name === 'public')?.uuid || '',
    toChannel: true,
  });

  const [getMessages, { loading, error }] = useLazyQuery(GET_MESSAGES, {
    onCompleted(data) {
      setChatMessages(data?.getMessages || []);
    },
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (conversation) {
      setChatId(conversation.recipient);
      getMessages({
        variables: {
          query: conversation,
        },
      });
    }
  }, [conversation]);

  return (
    <div className="w-full h-screen">
      {/* Header */}
      <div className="flex items-center flex-none w-full border-b h-14 bg-bg-400/50 border-gx-purple-500">
        <h1 className="flex-none w-1/4 pl-5 text-lg font-bold truncate text-purplish-500">
          {planet.name}
        </h1>
        <h1 className="w-full text-3xl font-bold text-center text-gx-purple-500"></h1>
      </div>

      <div className="flex h-[calc(100%-3.5rem)]">
        {/* Left Panel */}
        <section className="flex-none w-1/4 py-5 bg-bg-400/50">
          <GroupChannels
            channels={planet.channels}
            select={setConversation}
            selected={conversation}
          />
          <UserChannels
            users={planet.users}
            select={setConversation}
            selected={conversation}
          />
        </section>

        {/* Right Panel */}
        <main className="flex flex-col justify-between w-full">
          {!loading && (
            <>
              <Chat />
              <ChatInput conversation={conversation} />
            </>
          )}
        </main>
      </div>
    </div>
  );
};
