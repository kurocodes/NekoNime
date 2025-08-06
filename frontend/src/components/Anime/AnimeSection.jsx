import { MdKeyboardArrowRight } from "react-icons/md";
import { useGeneralContext } from "../../context/GeneralContext";

import AnimeGrid from "./AnimeGrid";

export default function AnimeSection({
  title,
  animeList,
  loading,
  visibleCards,
  bottomBorder = true,
}) {
  const { setViewAllSection } = useGeneralContext();

  return (
    <div
      className={`w-fit mx-auto ${
        bottomBorder ? "border-b-2 border-primary border-dotted mb-5 pb-5" : "mb-0 pb-0"
      }`}
    >
      <div className="flex justify-between pb-2 px-1 pe-0 xs:pe-4">
        <h2 className="text-xl font-bold text-secondary whitespace-nowrap">
          {title}
        </h2>
        {!loading && animeList?.list?.length > 0 && (
          <button
            className="flex gap-1 items-center text-white bg-primary px-2 py-1 rounded-full font-medium text-xs whitespace-nowrap cursor-pointer hover:text-secondary transition"
            onClick={() => {
              setViewAllSection(title);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            View All <MdKeyboardArrowRight />
          </button>
        )}
      </div>

      <AnimeGrid
        animeList={animeList}
        visibleCards={visibleCards}
        loading={loading}
      />
    </div>
  );
}
