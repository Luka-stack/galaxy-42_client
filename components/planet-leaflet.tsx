import Placeholder from '../assets/placeholder-1.png';
import Image from 'next/image';

interface Props {
  index: number;
  name: string;
  onClick: () => void;
}

export const PlanetLeaflet = ({ index, name, onClick }: Props) => {
  return (
    <div className="flex space-x-4">
      <div className="flex-none text-3xl font-bold opacity-75 text-purplish-500">
        0{index + 1}
      </div>
      <div className="w-full">
        <div className="relative w-[80%] overflow-hidden h-12 rounded-xl">
          <Image src={Placeholder} layout="fill" alt="Planet Logo" />
        </div>
        <h1
          className="mt-2 text-xl font-bold transition-transform ease-out cursor-pointer text-gx-purple-500 hover:scale-105"
          onClick={onClick}
        >
          {name}
        </h1>
      </div>
    </div>
  );
};
