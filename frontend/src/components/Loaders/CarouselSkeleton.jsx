import { FaArrowLeft, FaArrowRight, FaRegBookmark } from "react-icons/fa";
import { IoIosArrowDroprightCircle } from "react-icons/io";

import DescriptionSkeleton from "./DescriptionSkeleton";
import InfoHeaderSkeleton from "./InfoHeaderSkeleton";

export default function CarouselSkeleton() {
  return (
    <div className="relative w-full mx-auto overflow-hidden animate-pulse">
      {/* Fade Carousel Container */}
      <div className="relative w-full h-[450px] sm:h-[550px] md:h-[600px] lg:h-[651px] xl:h-[701px]">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="w-full h-full flex">
            {/* Info Box */}
            <div className="absolute bottom-5 lg:bottom-40 z-20 m-10 flex flex-col gap-4 max-w-[250px] md:max-w-[500px]">
              <span className="max-sm:w-25 max-sm:h-4 w-35 h-6 rounded-md bg-secondary"></span>
              <InfoHeaderSkeleton isBig={true} />
              <div className="hidden md:block">
                <DescriptionSkeleton />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {/* Save Button */}
                <div className={`p-2 border-3 border-secondary rounded-sm`}>
                  <FaRegBookmark className="text-[22px] text-secondary" />
                </div>

                {/* Details Button */}
                <div className="flex items-center bg-secondary w-fit px-4 py-2 text-white text-xl rounded-s-md rounded-e-full">
                  <span>Details</span>
                  <IoIosArrowDroprightCircle className="text-2xl font-extrabold ml-2 mt-[2px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="max-sm:hidden absolute bottom-[52%] translate-y-[100%] right-0 mx-5 mb-10 flex flex-col gap-2 text-white z-30">
        <div className="bg-secondary rounded-md p-3 shadow-md">
          <FaArrowLeft className="text-2xl font-extrabold" />
        </div>
        <div className="bg-secondary rounded-md p-3 shadow-md">
          <FaArrowRight className="text-2xl font-extrabold" />
        </div>
      </div>

      {/* Indicator Progress Bar */}
      <div className="max-sm:hidden absolute bottom-5 lg:bottom-42 left-10 z-30 flex gap-2">
        {Array(10)
          .fill(0)
          .map((_, idx) => (
            <div
              key={idx}
              className={`${
                idx === 0 ? "w-16" : "w-6"
              } h-2 flex rounded-full bg-secondary`}
            ></div>
          ))}
      </div>
    </div>
  );
}
