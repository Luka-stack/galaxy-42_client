import { useCallback, useMemo, useRef, useState } from 'react';

const topicRegex = /^[A-Z0-9 ]*$/i;

const arrayUnique = (array: string[]) => {
  const copy = array.concat();
  for (let i = 0; i < copy.length; ++i) {
    for (let j = i + 1; j < copy.length; ++j) {
      if (copy[i] === copy[j]) copy.splice(j--, 1);
    }
  }

  return copy;
};

export const useTopics = () => {
  const node = useRef<HTMLInputElement | null>(null);
  const [topics, setTopics] = useState<string[]>([]);

  const addTopic = useCallback(
    (event?: any) => {
      // event?.preventDefault();

      const topic = node.current;

      if (!topic || !topic.value || !topicRegex.test(topic.value)) {
        return;
      }

      const newTopics = topic.value
        .trim()
        .split(' ')
        .map((topic) => topic.toLowerCase().trim());
      setTopics(arrayUnique(topics.concat(newTopics)));

      topic.value = '';
    },
    [topics]
  );

  const removeTopic = useCallback(
    (topic: string) => {
      setTopics(topics.filter((t) => t !== topic));
    },
    [topics]
  );

  return useMemo(
    () => ({ topics, setTopics, addTopic, removeTopic, node }),
    [topics, setTopics, addTopic, removeTopic]
  );
};
