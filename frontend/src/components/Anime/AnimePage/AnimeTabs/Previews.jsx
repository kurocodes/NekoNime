import axios from "axios";
import { useEffect } from "react";

import Loader from "../../../Common/Loader";
import SharedTabContainer from "./Common/SharedTabContainer";

export default function Previews({
  idMal,
  previews,
  setPreviews,
  loading,
  setLoading,
}) {
  const promoAndImagesAPI = `https://api.jikan.moe/v4/anime/${idMal}/videos`;

  // Fetch promo videos and images for the anime
  useEffect(() => {
    const loadAnimePromoAndImages = async () => {
      try {
        setLoading(true);
        const res = await axios.get(promoAndImagesAPI);
        setPreviews(res.data.data);
      } catch (error) {
        console.log("Error fetching images: ", error);
      } finally {
        setLoading(false);
      }
    };

    if (idMal) loadAnimePromoAndImages();
  }, [idMal]);

  return (
    <SharedTabContainer heading="Previews (Trailers and Screenshots)">
      {loading || !previews ? (
        <Loader />
      ) : (
        <>
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2 gap-4`}
          >
            {/* Promo Videos */}
            {previews?.promo?.map((item) => (
              <div
                key={item.trailer.youtube_id}
                className="w-full aspect-video rounded-xl overflow-hidden shadow mt-1"
              >
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${item.trailer.youtube_id}`}
                  title={item.title}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>

          {previews?.episodes?.length > 0 && (
            <>
              {/* Screenshots Heading */}
              <div className="text-secondary text-lg border-b-2 border-secondary pt-2">
                Screenshots
              </div>

              {/* Episode Screenshots */}
              <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-4 mt-2">
                {previews.episodes.map((item) => (
                  <div
                    key={item.mal_id}
                    className="flex items-center justify-center"
                  >
                    <img
                      src={item.images.jpg.image_url}
                      alt={item.title}
                      className="shadow-md rounded-md"
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </SharedTabContainer>
  );
}
