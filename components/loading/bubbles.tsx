export const Bubbles = () => {
  return (
    <div className="flex h-20 space-x-5">
      <div className="flex items-center justify-center space-x-2 loading-ball-one animate-bounce">
        <div className="w-8 h-8 rounded-full bg-gx-purple-500"></div>
      </div>
      <div className="flex items-center justify-center space-x-2 loading-ball-two animate-bounce">
        <div className="w-8 h-8 rounded-full bg-gx-purple-700"></div>
      </div>
      <div className="flex items-center justify-center space-x-2 loading-ball-three animate-bounce">
        <div className="w-8 h-8 rounded-full bg-gx-purple-900"></div>
      </div>
    </div>
  );
};
