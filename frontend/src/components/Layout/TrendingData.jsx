export default function TrendingData({ style }) {
  return (
    <div className={style}>
      <div className="flex-1 w-full border-2 border-primary text-primary p-4 rounded-md">
        <h2 className="text-md font-bold">TOP LISTS</h2>
      </div>
      <div className="flex-1 w-full bg-primary p-4 rounded-md">
        <h2 className="text-md font-bold text-white">TOP COMMENTS</h2>
      </div>
    </div>
  );
}
