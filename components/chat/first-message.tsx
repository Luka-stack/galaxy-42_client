import Image from 'next/image';
import LogoImg from '../../assets/black-hole_64.png';

interface Props {
  message: any;
}

export const FirstMessage = ({ message }: Props) => {
  return (
    <div className="flex px-4 py-4 space-x-4 border-t-2 hover:bg-bg-600 border-gx-purple-500/30 first:border-none">
      <div className="flex-none w-16">
        <div className="relative w-10 h-10 border rounded-full border-gx-purple-500">
          <Image
            src={LogoImg}
            alt="logo"
            layout="fill"
            className="rounded-full"
          />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <h1 className="text-gx-purple-50">{message.author}</h1>
          <h3 className="text-xs text-purplish-500">{message.createdAt}</h3>
        </div>
        <p className="text-purplish-100">{message.content}</p>
      </div>
    </div>
  );
};
