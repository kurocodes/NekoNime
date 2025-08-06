import { useMemo } from "react";
import { reviewTiers } from "../../../../utils/review";
import { addOrUpdateRating } from "../../../../services/reviewServices";

import { MdStarRate } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";

export default function UserReview({
  animeId,
  selectedTier,
  setSelectedTier,
  isupdating,
  setIsUpdating,
  setTotalReviews,
  refetchReviewData,
}) {
  const reversedTiers = useMemo(() => [...reviewTiers].reverse(), []);

  // Function to add or update user review
  const updateUserReview = async (tier) => {
    setIsUpdating(true);
    try {
      const res = await addOrUpdateRating(animeId, tier.label);
      if (res.status === 201) {
        setTotalReviews((prev) => prev + 1);
      }
      setSelectedTier(tier.label);
      await refetchReviewData();
    } catch (error) {
      console.error("Error updating review", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="mt-5">
      <h4 className="flex items-center gap-2 pb-1 border-b-2 border-secondary/80">
        <MdStarRate className="text-3xl -mt-1 text-yellow-400" />{" "}
        <span className="text-xl text-secondary/80 font-bold">Your Review</span>
      </h4>

      {/* Review tier buttons */}
      <div className="grid max-sm:grid-cols-2 grid-cols-3 gap-4 mt-2">
        {reversedTiers.map((tier) => (
          <button
            disabled={isupdating}
            key={tier.label}
            className={`px-4 py-2 cursor-pointer rounded-xs transition-all duration-300 place-items-center ${
              selectedTier === tier.label
                ? "scale-106 ring-2 bg-primary text-white ring-primary/50"
                : `hover:scale-105 ${tier.bgColor} ${tier.hover} ${tier.textColor} `
            }`}
            onClick={() => updateUserReview(tier)}
          >
            <span className="flex items-center gap-2 font-medium">
              <span>{tier.icon}</span>
              <span>{tier.label}</span>
              <FaCircleCheck
                className={`transition-all duration-200
                    ${
                      selectedTier === tier.label
                        ? "opacity-100"
                        : "opacity-0 -ml-5"
                    }
                  `}
              />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
