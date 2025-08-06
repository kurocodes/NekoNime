import { FaStar } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";

export default function StatDisplay({ averageScore, popularity }) {
  return (
    <div className="max-xs:hidden flex gap-4 items-center text-secondary">
      {/* Rating */}
      <div className="text-center">
        <span className=" max-xs:text-[10px] text-sm font-semibold">RATING</span>
        <div className="flex justify-center items-center gap-2 px-3 py-1 bg-primary rounded-full">
          <FaStar className="text-yellow-300 max-xs:text-sm text-lg" />
          <span className="text-white max-xs:text-[8px] text-xs">{`${(
            averageScore / 10
          ).toFixed(1)}/10`}</span>
        </div>
      </div>
      {/* Popularity */}
      <div className="text-center">
        <span className="max-xs:text-[10px] text-sm font-semibold">POPULARITY</span>
        <div className="flex justify-center items-center gap-2 px-2 py-1 bg-primary rounded-full">
          <FaPeopleGroup className="text-pink-400 max-xs:text-sm text-lg" />
          <span className="text-white max-xs:text-[8px] text-xs">{popularity}</span>
        </div>
      </div>
    </div>
  );
}
