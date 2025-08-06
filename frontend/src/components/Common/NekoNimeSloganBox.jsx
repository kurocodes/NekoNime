export default function NekoNimeSloganBox({ SmallDevice }) {
  return (
    <div
      className={`${
        SmallDevice ? "flex md:hidden" : "hidden md:flex mt-2"
      } items-center grow gap-4 bg-gradient-to-r from-secondary to-primary-hover-bg shadow rounded-md px-3 py-2`}
    >
      <img
        src="/NekoGirl_1.jpg"
        alt=""
        className="w-18 h-18 rounded-full"
        style={{
          imageRendering: "crisp-edges",
          transform: "translateZ(0)",
        }}
      />
      <p className="text-white text-sm pr-4">
        <span className="text-primary font-bold text-xl">NekoNime</span> lets
        you explore anime, track what you’ve watched, and manage your personal
        lists—all in one cute and simple platform made just for anime lovers
        like you~! 🐾
      </p>
    </div>
  );
}
