import { Message } from '../../lib/graphql/messages';
import { AnotherMessage } from './another-message';
import { FirstMessage } from './first-message';

interface Props {
  messages: Message[];
}

export const Chat = ({ messages }: Props) => {
  let lastMsgAuthor = '';

  return (
    <div className="w-full">
      {messages.map((m) => {
        if (m.author.uuid === lastMsgAuthor) {
          return (
            <AnotherMessage
              createdAt={m.createdAt}
              content={m.content}
              key={m.uuid}
            />
          );
        }

        lastMsgAuthor = m.author.uuid;
        return <FirstMessage message={m} key={m.uuid} />;
      })}
    </div>
  );
};
