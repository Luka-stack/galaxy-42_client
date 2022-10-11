import Head from 'next/head';
import { NextPage } from 'next/types';
import { ChatContainer } from '../../components/chat/chat-container';

import { PlanetChatList } from '../../components/chat/planet-chat-list';
import { Header } from '../../components/header';

const ChatPage: NextPage = () => {
  return (
    <div className="flex">
      <Head>
        <title>Chat | Galaxy 42</title>
      </Head>

      <Header />

      <main className="flex w-full h-screen">
        <PlanetChatList />
        <ChatContainer />
      </main>
    </div>
  );
};

export default ChatPage;
