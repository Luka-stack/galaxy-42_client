import { useLazyQuery } from '@apollo/client';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextPage } from 'next/types';
import { useEffect, useState } from 'react';

import { ChatContainer } from '../../../components/chat/chat-container';
import { ChatPlanet, GET_PLANET_FOR_CHAT } from '../../../lib/graphql/planets';

const ChatPage: NextPage = () => {
  const router = useRouter();

  const [planet, setPlanet] = useState<ChatPlanet | null>(null);

  const [getPlanet, { loading, data, error }] =
    useLazyQuery(GET_PLANET_FOR_CHAT);

  useEffect(() => {
    if (router.query.uuid) {
      getPlanet({
        variables: {
          planetUuid: router.query.uuid,
        },
      });
    }
  }, [router.query.uuid]);

  useEffect(() => {
    if (data) {
      setPlanet(data.getPlanet);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log('Error', error);
    }
  }, [error]);

  return (
    <div className="flex w-full">
      <Head>
        <title>Chat | Galaxy 42</title>
      </Head>

      <main className="flex w-full h-screen">
        {planet && <ChatContainer planet={planet} />}
      </main>
    </div>
  );
};

export default ChatPage;
