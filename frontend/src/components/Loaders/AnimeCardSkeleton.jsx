export default function AnimeCardSkeleton() {
  return (
    <div className={"max-xs:max-w-[140px] md:min-w-[206px] w-fit animate-pulse"}>
      <div className="flex w-full p-1 pr-0 cursor-pointer">
        {/* Cover Image */}
        <div className="w-[140px] md:w-[150px] h-[200px] md:h-[220px] rounded-md bg-secondary shadow-[0_0_15px_rgba(0,0,0,0.3)]"></div>

        {/* Action Buttons */}
        <div className="max-xs:hidden flex flex-col items-center flex-1/6 gap-4 py-2 px-2">
          <div className="flex items-center rounded-full bg-secondary w-8 h-8"></div>
          <div className="flex items-center rounded-full bg-secondary w-8 h-8"></div>
          <div className="flex items-center rounded-full bg-secondary w-8 h-8"></div>
          <div className="flex items-center rounded-full bg-secondary w-8 h-8"></div>
        </div>
      </div>

      <div className="flex flex-col px-1">
        {/* Title */}
        <h3 className="max-xs:max-w-[140px] w-[175px] md:w-[200px] h-5 rounded-md bg-secondary"></h3>

        {/* Genres */}
        <div className="flex flex-wrap gap-1 mt-1 text-[9px]">
          <span className="w-13 h-5 rounded-full bg-secondary"></span>
          <span className="w-13 h-5 rounded-full bg-secondary"></span>
          <span className="w-13 h-5 rounded-full bg-secondary"></span>
        </div>

        <div className="flex justify-between items-center text-[10px] mt-2">
          {/* Format and Episodes */}
          <div className="flex gap-1 items-center">
            <span className="w-7 h-6 rounded-s-md bg-secondary"></span>
            <span className="w-7 h-6 rounded-e-md bg-secondary"></span>
          </div>

          {/* Release Date */}
          <div className="w-15 h-5 rounded-md bg-secondary"></div>
        </div>
      </div>
    </div>
  );
}
