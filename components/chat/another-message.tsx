interface Props {
  createdAt: string;
  content: string;
}

export const AnotherMessage = ({ createdAt, content }: Props) => {
  return (
    <div className="flex px-4 py-2 space-x-4 hover:bg-bg-600 border-gx-purple-500/20 group">
      <div className="flex-none w-16">
        <h3 className="hidden text-xs text-purplish-500 group-hover:inline">
          {new Date(createdAt).toLocaleString()}
        </h3>
      </div>
      <div className="space-y-2">
        <p className="text-purplish-100">{content}</p>
      </div>
    </div>
  );
};
