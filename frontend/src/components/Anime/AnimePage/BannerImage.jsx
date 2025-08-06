export default function BannerImage({ src }) {
  if (!src) return null;

  return (
    <div className="relative w-full h-[201px] sm:h-[253px] md:h-[301px] lg:h-[352px] overflow-hidden">
      <img
        src={src}
        alt="Banner"
        className="w-full h-full object-cover"
      />

      {/* Bottom white blur overlay */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
}
