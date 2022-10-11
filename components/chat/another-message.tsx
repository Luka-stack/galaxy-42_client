interface Props {
  message: any;
}

export const AnotherMessage = ({ message }: Props) => {
  return (
    <div className="flex px-4 py-4 space-x-4 hover:bg-bg-600 border-gx-purple-500/30 group min-h-[5rem]">
      <div className="flex-none w-16">
        <h3 className="hidden text-xs text-purplish-500 group-hover:inline">
          {message.createdAt}
        </h3>
      </div>
      <div className="space-y-2">
        <p className="text-purplish-100">{message.content}</p>
      </div>
    </div>
  );
};
