export default function ListEntryCardSkeleton() {
  return (
    <div className="flex items-center justify-between px-4 animate-pulse">
      <div className="flex items-center gap-2">
        {/* Cover Image */}
        <div className="w-18 h-[102px] rounded-md bg-secondary"></div>
        <div>
          {/* Title */}
          <div className="w-50 h-5 bg-secondary rounded-md"></div>

          {/* Format and Episodes */}
          <div className="flex gap-1 items-center mt-2">
            <span className="w-7 h-6 rounded-s-md bg-secondary"></span>
            <span className="w-7 h-6 rounded-e-md bg-secondary"></span>
          </div>
        </div>
      </div>

      <div className="w-5 h-5 bg-secondary rounded-full"></div>
    </div>
  );
}
