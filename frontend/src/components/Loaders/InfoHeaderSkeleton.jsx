import { GoDotFill } from "react-icons/go";

export default function InfoHeaderSkeleton({ isBig = false }) {
  return (
    <>
      <div
        className={`${
          !isBig &&
          "max-xs:flex max-xs:flex-col max-xs:justify-start max-xs:gap-1"
        }`}
      >
        {/* Title */}
        <div className="max-sm:w-60 max-sm:h-7 w-100 h-10 rounded-md bg-secondary"></div>
        {/* Alt Title */}
        <div className="w-50 h-4 rounded-md bg-secondary mt-2"></div>

        <div className="flex items-center mt-2">
          {/* Format and Episodes */}
          <div className="flex gap-1 items-center">
            <span className="bg-secondary w-7 h-6 rounded-s-md"></span>
            <span className="bg-secondary w-7 h-6 rounded-e-md"></span>
          </div>

          <GoDotFill className="text-secondary text-md max-xs:mx-1 mx-2" />

          <GoDotFill className="text-secondary text-md max-xs:mx-1 mx-2" />
        </div>
      </div>
    </>
  );
}
