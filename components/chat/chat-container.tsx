import { Chat } from './chat';
import { ChatInput } from './chat-input';
import { GroupChannels } from './group-channels';
import { UserChannels } from './user-channels';

const PLANET_NAME = 'React Masters';
const PLANETS_GROUPS = '';
const PLANETS_USERS = '';

export const ChatContainer = () => {
  return (
    <div className="w-full h-screen">
      {/* Header */}
      <div className="flex items-center flex-none w-full h-14 bg-bg-400/50">
        <h1 className="w-full text-3xl font-bold text-center text-gx-purple-500">
          {PLANET_NAME}
        </h1>
      </div>

      <div className="flex h-[calc(100%-3.5rem)] ">
        {/* Left Panel */}
        <section className="flex-none w-1/4 py-5 bg-bg-400/50">
          <GroupChannels />
          <UserChannels />
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
