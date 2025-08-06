import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

export default function HorizontalScrollSection({ children }) {
  const scrollRef = useRef(null);
  const [showLeftBlend, setShowLeftBlend] = useState(false);
  const [showRightBlend, setShowRightBlend] = useState(false);

  const updateBlendVisibility = () => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setShowLeftBlend(scrollLeft > 0);
    setShowRightBlend(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateBlendVisibility();
    el.addEventListener("scroll", updateBlendVisibility);
    return () => el.removeEventListener("scroll", updateBlendVisibility);
  }, []);

  return (
    <div className="relative">
      {/* Horizontal Scroll Content Section */}
      <div
        ref={scrollRef}
        className="snap-x snap-mandatory flex gap-2 mt-1 overflow-x-auto custom-scrollbar scrollbar-hide pb-2"
      >
        {children}
      </div>

      {/* Scroll Blends */}
      <div
        className={`absolute top-0 left-0 w-10 h-full bg-gradient-to-r from-white to-transparent z-10 transition-opacity duration-300 pointer-events-none ${
          showLeftBlend ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute top-0 right-[-3px] w-10 h-full bg-gradient-to-l from-white to-transparent z-10 transition-opacity duration-300 pointer-events-none ${
          showRightBlend ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Left and Right Scroll Buttons */}
      <div
        className={`absolute top-1/2 left-0 transform -translate-y-[100%] translate-x-[100%] z-20 bg-primary p-2 rounded-full text-white text-2xl cursor-pointer hover:bg-secondary hover:scale-120 transition-all duration-200 ${
          showLeftBlend ? "opacity-100" : "opacity-0"
        }`}
        onClick={() =>
          scrollRef.current.scrollBy({ left: -200, behavior: "smooth" })
        }
      >
        <MdKeyboardArrowLeft />
      </div>
      <div
        className={`absolute top-1/2 right-0 transform -translate-y-[100%] -translate-x-[100%] z-20 bg-primary p-2 rounded-full text-white text-2xl cursor-pointer hover:bg-secondary hover:scale-120 transition-all duration-200 ${
          showRightBlend ? "opacity-100" : "opacity-0"
        }`}
        onClick={() =>
          scrollRef.current.scrollBy({ left: 200, behavior: "smooth" })
        }
      >
        <MdKeyboardArrowRight />
      </div>
    </div>
  );
}
