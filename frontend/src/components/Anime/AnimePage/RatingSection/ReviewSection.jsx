import { useEffect, useState } from "react";
import { fetchAnimeReviewData } from "../../../../services/reviewServices";

import UserReview from "./UserReview";
import ReviewChart from "./ReviewChart";

export default function ReviewSection({ animeId }) {
  const [totalReviews, setTotalReviews] = useState(0);
  const [selectedTier, setSelectedTier] = useState(null);
  const [reviewStats, setReviewStats] = useState(null);
  const [isupdating, setIsUpdating] = useState(false);

  // Function to fetch review data
  const getAnimeReviewData = async () => {
    setIsUpdating(true);
    try {
      const res = await fetchAnimeReviewData(animeId);
      setSelectedTier(res.data.tier);
      setTotalReviews(res.data.totalReviews);
      setReviewStats(res.data.reviewData);
    } catch (error) {
      console.error("Error fetching review", error);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    getAnimeReviewData();
  }, [animeId]);

  return (
    <div className="mt-2 max-lg:mt-5">
      {/* Rating Section Heading */}
      <h3 className="flex items-center gap-2">
        <div className="flex gap-[2px]">
          <span className="w-1 h-8 bg-primary"></span>
          <span className="w-1 h-8 bg-primary"></span>
        </div>
        <div className="">
          <span className="text-2xl font-bold text-secondary ">
            User Reviews
          </span>
          <span className="text-xs ml-1 text-secondary/60">{totalReviews}</span>
        </div>
      </h3>

      {/* Review stats bar chart */}
      {reviewStats && (
        <ReviewChart data={reviewStats} totalReviews={totalReviews} />
      )}

      {/* User Review Section */}
      <UserReview
        animeId={animeId}
        selectedTier={selectedTier}
        setSelectedTier={setSelectedTier}
        isupdating={isupdating}
        setIsUpdating={setIsUpdating}
        setTotalReviews={setTotalReviews}
        refetchReviewData={getAnimeReviewData}
      />
    </div>
  );
}
