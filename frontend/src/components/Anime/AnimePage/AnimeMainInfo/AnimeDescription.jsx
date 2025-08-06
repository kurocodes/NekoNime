import { stripHtml } from "../../../../utils/helper";

export default function AnimeDescription({
  description,
  showMore,
  setShowMore,
  isExapandable = true,
}) {
  const previewText = stripHtml(description).slice(0, 250) + "...";

  return (
    <div className="text-xs xl:text-sm text-secondary leading-relaxed max-xs:text-center">
      {!showMore && previewText.length > 100 ? (
        <div
          className="relative overflow-hidden cursor-pointer group"
          onClick={() => setShowMore(true)}
        >
          {/* Preview Text */}
          <p>{previewText}</p>

          {/* White Bottom fade on hover */}
          {isExapandable && (
            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none z-10 max-lg:opacity-100"></div>
          )}

          {/* Show More Button */}
          {isExapandable && (
            <button
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-primary font-semibold hover:underline cursor-pointer opacity-0 group-hover:opacity-100 transition duration-300 z-20 pointer-events-auto max-lg:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                setShowMore(true);
              }}
            >
              Show More
            </button>
          )}
        </div>
      ) : (
        // Full Description
        <div className="max-h-30 lg:max-h-[113px] overflow-y-auto custom-scrollbar pr-2">
          <div dangerouslySetInnerHTML={{ __html: description }}></div>
          {previewText.length > 100 && (
            <button
              onClick={() => setShowMore(false)}
              className="mt-2 text-primary cursor-pointer font-semibold hover:underline block transition duration-300"
            >
              show less
            </button>
          )}
        </div>
      )}
    </div>
  );
}
