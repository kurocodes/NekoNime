import { Link } from "react-router-dom";
import { assets } from "../../utils/assets";

export default function Footer() {
  return (
    <footer className="border-1 border-secondary/30 py-10 mt-5">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-y-8 xl:gap-8">
        {/* Brand */}
        <div className="xl:place-items-center">
          <h2 className="text-4xl font-bold text-primary">
            Neko<span className="text-secondary">Nime</span>
          </h2>
        </div>

        {/* About */}
        <div className="">
          <h3 className="font-semibold mb-2 text-secondary text-xl">About</h3>
          <p className="text-sm text-secondary/60">
            NekoNime is a personal project built with ❤️ by Kuro.codes. Powered
            by AniList API. It is a platform to discover and track your favorite
            anime.
          </p>
        </div>

        {/* Social/Contact */}
        <div className="">
          <h3 className="font-semibold mb-2 text-secondary text-xl ms-2">
            Connect
          </h3>
          <div className="flex space-x-2 mt-2">
            {/* GitHub */}
            <a
              href="https://github.com/DeepakVaishnav3112"
              target="_blank"
              className="border-2 border-transparent hover:border-secondary/40 hover:bg-secondary/20 p-1 rounded-md transition duration-200"
            >
              <img src={assets.github_logo} alt="github_logo" className="w-8" />
            </a>
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/deepak-vaishnav-541199375"
              target="_blank"
              className="border-2 border-transparent hover:border-secondary/40 hover:bg-secondary/20 p-1 rounded-md transition duration-200"
            >
              <img
                src={assets.linkedin_logo}
                alt="linkedin_logo"
                className="w-8"
              />
            </a>
            {/* Instagram */}
            <a
              href=""
              target="_blank"
              className="border-2 border-transparent hover:border-secondary/40 hover:bg-secondary/20 p-1 rounded-md transition duration-200"
            >
              <img
                src={assets.instagram_logo}
                alt="instagram_logo"
                className="w-8"
              />
            </a>
            {/* Pinterest */}
            <a
              href=""
              target="_blank"
              className="border-2 border-transparent hover:border-secondary/40 hover:bg-secondary/20 p-1 rounded-md transition duration-200"
            >
              <img
                src={assets.pinterest_logo}
                alt="pinterest_logo"
                className="w-8"
              />
            </a>
            {/* Add more if needed */}
          </div>
        </div>

        {/* Contact */}
        <div className="">
          <h3 className="font-semibold mb-2 text-secondary text-xl ms-2">Contact</h3>
          <div className="flex flex-col space-x-4 mt-2">
            {/* Email */}
            <div className="flex items-center gap-2 ms-2">
              <img src={assets.email_logo} alt="email_icon" className="w-8" />
              <span className="text-md text-secondary">
                vaishnavdeepak3112@gmail.com
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-primary/60">
        © 2025 NekoNime. Made with 💖 by Kuro.codes.
      </div>
    </footer>
  );
}
