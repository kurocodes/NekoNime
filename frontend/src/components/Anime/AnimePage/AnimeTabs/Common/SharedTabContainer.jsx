import TabHeader from "./TabHeader";

import "../../../../../styles/scrollbar.css";
import { useEffect, useRef, useState } from "react";

export default function SharedTabContainer({
  heading,
  showBtn = false,
  dropDownOptions,
  selectedOption,
  setSelectedOption,
  children,
  isHeight = true,
  blendPosition = true,
  marginBottom = false,
  marginTop = false,
}) {
  const scrollRef = useRef(null);
  const [showTopBlend, setShowTopBlend] = useState(false);
  const [showBottomBlend, setShowBottomBlend] = useState(true);

  // Function to update the visibility of the blend effects based on scroll position
  const updateBlendVisibility = () => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollTop, scrollHeight, clientHeight } = el;
    setShowTopBlend(scrollTop > 0);
    setShowBottomBlend(scrollTop + clientHeight < scrollHeight - 1);
  };

  // Effect to handle scroll and resize events for blend visibility
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateBlendVisibility();
    el.addEventListener("scroll", updateBlendVisibility);

    const observer = new ResizeObserver(updateBlendVisibility);
    observer.observe(el);

    return () => {
      el.removeEventListener("scroll", updateBlendVisibility);
      observer.disconnect();
    };
  }, []);

  return (
    <div className={`relative group h-fit break-inside-avoid ${marginBottom && "mb-5"} ${marginTop && "mt-5"}`}>
      <TabHeader
        heading={heading}
        showBtn={showBtn}
        dropDownOptions={dropDownOptions}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />

      {/* Scrollable Content */}
      <div
        ref={scrollRef}
        className={`${
          isHeight && "h-[400px]"
        } overflow-hidden overflow-y-auto custom-scrollbar mt-1`}
      >
        {children}
      </div>

      {/* Top and Bottom Blend */}
      {blendPosition && (
        <>
          <div
            className={`absolute top-[36px] xs:top-[38px] sm:top-[44px] w-full h-15 bg-gradient-to-b from-white to-transparent transition-opacity duration-300 pointer-events-none z-10 ${
              showTopBlend ? "opacity-100" : "opacity-0"
            }`}
          ></div>

          <div
            className={`absolute bottom-[-2px] w-full h-15 bg-gradient-to-t from-white to-transparent transition-opacity duration-300 pointer-events-none z-10 ${
              showBottomBlend ? "opacity-100" : "opacity-0"
            }`}
          ></div>
        </>
      )}
    </div>
  );
}
