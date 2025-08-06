import { useEffect } from "react";
import { fetchAnimeMoreInfo } from "../../../../../services/animeService";

import InfoItem from "./InfoItem";
import Loader from "../../../../Common/Loader";
import InfoItemContainer from "./InfoItemContainer";
import SharedTabContainer from "../Common/SharedTabContainer";

export default function MoreInfoTab({
  animeId,
  moreInfo,
  setMoreInfo,
  loading,
  setLoading,
}) {
  useEffect(() => {
    const loadMoreInfo = async () => {
      try {
        setLoading(true);
        const res = await fetchAnimeMoreInfo(animeId);
        setMoreInfo(res.data);
      } catch (error) {
        console.error("Error loading more info:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMoreInfo();
  }, [animeId]);

  const {
    status,
    source,
    startDate,
    endDate,
    nextAiringEpisode,
    studios,
    rankings,
    tags,
    externalLinks,
    isAdult,
    countryOfOrigin,
  } = moreInfo;

  const formatDate = (date) => {
    if (!date?.year) return "N/A";
    return `${date.day || "??"}-${date.month || "??"}-${date.year}`;
  };

  return (
    <SharedTabContainer heading="More Info">
      {loading || !moreInfo ? (
        <Loader />
      ) : (
        <>
          {/* Status And Source */}
          <InfoItemContainer
            heading="Status And Source"
            extraStyle="max-sm:flex-col lg:flex-col xl:flex-row"
          >
            <InfoItem label="Status" value={status || "N/A"} />
            <InfoItem label="Source" value={source || "Unknown"} />
          </InfoItemContainer>

          {/* Date And Schedule */}
          <InfoItemContainer
            heading="Date And Schedule"
            extraStyle="max-sm:flex-col lg:flex-col xl:flex-row"
          >
            {startDate && (
              <InfoItem label="Start Date" value={formatDate(startDate)} />
            )}
            {formatDate(endDate) !== "N/A" && (
              <InfoItem label="End Date" value={formatDate(endDate)} />
            )}
            {nextAiringEpisode && (
              <InfoItem
                label="Next Airing Episode"
                value={
                  nextAiringEpisode
                    ? `Ep ${nextAiringEpisode.episode} on ${new Date(
                        nextAiringEpisode.airingAt * 1000
                      ).toLocaleDateString()}`
                    : "Not Scheduled"
                }
              />
            )}
          </InfoItemContainer>

          {/* Studios */}
          <InfoItemContainer heading="Studios">
            <InfoItem
              label="Studios"
              value={
                studios?.nodes?.length
                  ? studios.nodes.map((s) => s.name).join(", ")
                  : "Unknown"
              }
            />
          </InfoItemContainer>

          {/* Country Of Origin */}
          <InfoItemContainer heading="Country of Origin">
            <InfoItem label="Origin" value={countryOfOrigin || "Unknown"} />
          </InfoItemContainer>

          {/* Rankings */}
          {rankings && rankings.length > 0 && (
            <InfoItemContainer
              heading="Rankings"
              extraStyle="flex-wrap items-center"
            >
              {rankings.map((rank, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 bg-secondary text-white p-2 text-sm rounded-sm"
                >
                  <span className="font-semibold text-white">#{rank.rank}</span>
                  <span className="text-xs font-medium text-white/80">
                    {rank.type} ({rank.format}){" "}
                    {rank.allTime ? "All Time" : "This Season"}
                  </span>
                </div>
              ))}
            </InfoItemContainer>
          )}

          {/* Is Adult */}
          <InfoItemContainer heading="Is Adult">
            <InfoItem label="Adult Content" value={isAdult ? "Yes 🔞" : "No"} />
          </InfoItemContainer>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <>
              <InfoItemContainer
                heading="Tags"
                extraStyle="flex-wrap items-center"
              >
                {tags?.map((tag, idx) => (
                  <div
                    key={idx}
                    title={tag.description}
                    className="flex items-center gap-5 bg-secondary p-2 rounded-sm text-sm text-white"
                  >
                    <span>{tag.name}</span>
                    <span className="text-xs text-white/70 font-semibold">
                      {tag.rank}%
                    </span>
                  </div>
                ))}
              </InfoItemContainer>
            </>
          )}

          {externalLinks && externalLinks.length > 0 && (
            <>
              {/* External Links */}
              <InfoItemContainer
                heading="External Links"
                extraStyle="flex-wrap items-center"
              >
                {externalLinks.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={link.type}
                    className="text-sm px-3 py-1 rounded-sm font-medium shadow-md transition-colors duration-300"
                    style={{
                      backgroundColor: link.color || "#429EA6",
                      color: "#fff",
                    }}
                  >
                    {link.site}
                  </a>
                ))}
              </InfoItemContainer>
            </>
          )}
        </>
      )}
    </SharedTabContainer>
  );
}
