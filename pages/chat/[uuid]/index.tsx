import { useLazyQuery } from '@apollo/client';
import Head from 'next/head';
import { useRouter } from 'next/router';
import type { NextPage } from 'next/types';
import { useEffect, useState } from 'react';

import { ChatContainer } from '../../../components/chat/chat-container';
import { ChatPlanet, GET_PLANET_FOR_CHAT } from '../../../lib/graphql/planets';

const ChatPage: NextPage = () => {
  const router = useRouter();

  const [planet, setPlanet] = useState<ChatPlanet | null>(null);

  const [getMyPlanet, { loading, data, error, refetch }] = useLazyQuery(
    GET_PLANET_FOR_CHAT,
    { refetchWritePolicy: 'merge' }
  );

  const queryRefetch = () => {
    refetch({
      variables: {
        planetUuid: router.query.uuid,
      },
    });
  };

  useEffect(() => {
    if (router.query.uuid) {
      console.log(router.query.uuid);

      getMyPlanet({
        variables: {
          planetUuid: router.query.uuid,
        },
      });
    }
  }, [router.query.uuid]);

  useEffect(() => {
    if (data) {
      setPlanet(data.getMyPlanet);
    }
  }, [data]);

  if (error) {
    router.push('/');
  }

  return (
    <div className="flex w-full">
      <Head>
        <title>Chat | Galaxy 42</title>
      </Head>

      <main className="flex w-full h-screen">
        {planet && <ChatContainer planet={planet} refetch={queryRefetch} />}
      </main>
    </div>
  );
};

export default ChatPage;
