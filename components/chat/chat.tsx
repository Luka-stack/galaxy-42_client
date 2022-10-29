import { useRecoilValue } from 'recoil';

import { chatMessages } from '../../lib/recoil/atoms';
import { AnotherMessage } from './another-message';
import { FirstMessage } from './first-message';

export const Chat = () => {
  const messages = useRecoilValue(chatMessages);

  let lastMsgAuthor = '';

  return (
    <div className="w-full overflow-y-auto scrollbar-hide">
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
