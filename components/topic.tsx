import { XIcon } from '@heroicons/react/outline';

interface Props {
  topic: string;
  text?: string;
  action?: () => void;
}

export const Topic = ({ topic, action }: Props) => {
  return (
    <div
      className="flex px-3 py-1 text-blue-400 rounded-full cursor-pointer bg-blue-900/50 group"
      onClick={action}
    >
      {topic} <XIcon className="w-4 ml-1 group-hover:text-blue-500" />
    </div>
  );
};
