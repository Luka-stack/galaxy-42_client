import Head from 'next/head';
import { NextPage } from 'next/types';
import { ChatContainer } from '../../components/chat/chat-container';

import { ChatNavigation } from '../../components/chat/chat-navigation';
import { Navigation } from '../../components/navigation';

const ChatPage: NextPage = () => {
  return (
    <div className="flex">
      <Head>
        <title>Chat | Galaxy 42</title>
      </Head>

      <Navigation />

      <main className="flex w-full h-screen">
        <ChatNavigation />
        {/* <ChatContainer /> */}
      </main>
    </div>
  );
};

export default ChatPage;
