import { Bubbles } from './bubbles';

interface Props {
  title: string;
}

export const CoverLoading = ({ title }: Props) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gx-purple-500/30">
      <Bubbles />
      <h1 className="text-2xl font-bold text-purplish-500">{title}</h1>
    </div>
  );
};
