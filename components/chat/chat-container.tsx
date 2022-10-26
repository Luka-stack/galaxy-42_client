import { useEffect, useState } from 'react';
import { ChatPlanet } from '../../lib/graphql/planets';
import { Chat } from './chat';
import { ChatInput } from './chat-input';
import { GroupChannels } from './group-channels';
import { UserChannels } from './user-channels';

interface Props {
  planet: ChatPlanet;
}

export const ChatContainer = ({ planet }: Props) => {
  const [conversation, setConversation] = useState<string>(
    planet.channels.find((ch) => ch.name === 'public')?.uuid || ''
  );

  useEffect(() => {
    if (conversation) {
      console.log('GET MESSAGES FOR', conversation);
    }
  }, [conversation]);

  return (
    <div className="w-full h-screen">
      {/* Header */}
      <div className="flex items-center flex-none w-full h-14 bg-bg-400/50">
        <h1 className="w-full text-3xl font-bold text-center text-gx-purple-500">
          {planet.name}
        </h1>
      </div>

      <div className="flex h-[calc(100%-3.5rem)] ">
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
          <Chat />
          <ChatInput />
        </main>
      </div>
    </div>
  );
};
