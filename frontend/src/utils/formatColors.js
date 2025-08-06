import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaPauseCircle,
  FaQuestionCircle,
  FaBroadcastTower,
  FaBook,
  FaTv,
  FaFilm,
  FaFeatherAlt,
  FaGamepad,
  FaRegQuestionCircle,
  FaPlay,
  FaStop,
  FaStar,
  FaSnowflake,
  FaLeaf,
  FaSun,
  FaSeedling,
} from "react-icons/fa";
import { GiScrollUnfurled } from "react-icons/gi";
import { MdOutlineAutoStories } from "react-icons/md";

export const genreColorsMap = {
  Action: "#FF6B6B",
  Adventure: "#4ECDC4",
  Comedy: "#FFE66D",
  Drama: "#A29BFE",
  Ecchi: "#FFB6C1",
  Fantasy: "#6C5CE7",
  Hentai: "#FF3F34",
  Horror: "#2D3436",
  "Mahou Shoujo": "#FD79A8",
  Mecha: "#00CEC9",
  Music: "#74B9FF",
  Mystery: "#636E72",
  Psychological: "#E17055",
  Romance: "#FAB1A0",
  "Sci-Fi": "#55EFC4",
  "Slice of Life": "#81ECEC",
  Sports: "#00B894",
  Supernatural: "#9980FA",
  Thriller: "#D63031",
  Shonen: "#FDCB6E",
};

export const genreTextColorsMap = {
  Action: "#fff",
  Adventure: "#000",
  Comedy: "#000",
  Drama: "#fff",
  Ecchi: "#000",
  Fantasy: "#fff",
  Hentai: "#fff",
  Horror: "#fff",
  "Mahou Shoujo": "#000",
  Mecha: "#000",
  Music: "#000",
  Mystery: "#fff",
  Psychological: "#000",
  Romance: "#000",
  "Sci-Fi": "#000",
  "Slice of Life": "#000",
  Sports: "#fff",
  Supernatural: "#fff",
  Thriller: "#fff",
  Shonen: "#000",
};

export const formats = ["TV", "MOVIE", "OVA", "ONA", "SPECIAL", "MUSIC"];

export const formatStylesMap = {
  TV: {
    label: "TV",
    bgColor: "#4CAF50", // Green
    textColor: "#ffffff",
    icon: FaTv,
  },
  MOVIE: {
    label: "Movie",
    bgColor: "#2196F3", // Blue
    textColor: "#ffffff",
    icon: FaFilm,
  },
  OVA: {
    label: "OVA",
    bgColor: "#FF9800", // Orange
    textColor: "#000000",
    icon: FaFeatherAlt,
  },
  ONA: {
    label: "ONA",
    bgColor: "#9C27B0", // Purple
    textColor: "#ffffff",
    icon: FaTv,
  },
  SPECIAL: {
    label: "Special",
    bgColor: "#E91E63", // Pink
    textColor: "#ffffff",
    icon: FaStar, // You can import another icon if preferred
  },
  MUSIC: {
    label: "Music",
    bgColor: "#795548", // Brown
    textColor: "#ffffff",
    icon: FaBroadcastTower,
  },
};

export const statusStylesMap = {
  FINISHED: {
    label: "Finished",
    gradient: "from-green-400 via-green-600 to-primary",
    textColor: "text-white",
    icon: FaCheckCircle,
  },
  RELEASING: {
    label: "Releasing",
    gradient: "from-blue-400 via-blue-600 to-primary",
    textColor: "text-white",
    icon: FaBroadcastTower,
  },
  NOT_YET_RELEASED: {
    label: "Not Yet Released",
    gradient: "from-yellow-400 via-orange-500 to-primary",
    textColor: "text-black",
    icon: FaClock,
  },
  CANCELLED: {
    label: "Cancelled",
    gradient: "from-red-400 via-red-600 to-primary",
    textColor: "text-white",
    icon: FaTimesCircle,
  },
  HIATUS: {
    label: "Hiatus",
    gradient: "from-purple-400 via-purple-600 to-primary",
    textColor: "text-white",
    icon: FaPauseCircle,
  },
  UNKNOWN: {
    label: "Unknown",
    gradient: "from-gray-400 via-gray-500 to-primary",
    textColor: "text-white",
    icon: FaQuestionCircle,
  },
};

export const sourceStylesMap = {
  MANGA: {
    label: "Manga",
    gradient: "from-pink-400 via-pink-600 to-primary",
    textColor: "text-white",
    icon: FaBook,
  },
  LIGHT_NOVEL: {
    label: "Light Novel",
    gradient: "from-violet-400 via-violet-600 to-primary",
    textColor: "text-white",
    icon: MdOutlineAutoStories,
  },
  VISUAL_NOVEL: {
    label: "Visual Novel",
    gradient: "from-cyan-400 via-cyan-600 to-primary",
    textColor: "text-black",
    icon: FaFeatherAlt,
  },
  ORIGINAL: {
    label: "Original",
    gradient: "from-blue-400 via-indigo-500 to-primary",
    textColor: "text-white",
    icon: FaTv,
  },
  VIDEO_GAME: {
    label: "Video Game",
    gradient: "from-green-400 via-emerald-600 to-primary",
    textColor: "text-white",
    icon: FaGamepad,
  },
  OTHER: {
    label: "Other",
    gradient: "from-gray-400 via-gray-500 to-primary",
    textColor: "text-white",
    icon: GiScrollUnfurled,
  },
  NOVEL: {
    label: "Novel",
    gradient: "from-yellow-400 via-amber-500 to-primary",
    textColor: "text-black",
    icon: FaBook,
  },
  WEB_MANGA: {
    label: "Web Manga",
    gradient: "from-rose-400 via-rose-600 to-primary",
    textColor: "text-white",
    icon: FaBook,
  },
  MULTIMEDIA_PROJECT: {
    label: "Multimedia",
    gradient: "from-fuchsia-400 via-fuchsia-600 to-primary",
    textColor: "text-white",
    icon: FaFilm,
  },
  UNKNOWN: {
    label: "Unknown",
    gradient: "from-zinc-400 via-zinc-500 to-primary",
    textColor: "text-white",
    icon: FaRegQuestionCircle,
  },
};

export const dateStylesMap = {
  startDate: {
    label: "Start Date",
    gradient: "from-green-400 via-teal-500 to-primary",
    textColor: "text-white",
    icon: FaPlay,
  },
  endDate: {
    label: "End Date",
    gradient: "from-red-400 via-rose-500 to-primary",
    textColor: "text-white",
    icon: FaStop,
  },
  nextAiringEpisode: {
    label: "Next Airing Episode",
    gradient: "from-blue-500 via-indigo-600 to-primary",
    textColor: "text-white",
    icon: FaClock,
  },
};

export const seasons = ["Winter", "Spring", "Summer", "Fall"];

export const seasonStylesMap = {
  Winter: {
    label: "Winter",
    bgColor: "#5DADE2", // Cool icy blue
    textColor: "#ffffff",
    icon: FaSnowflake,
  },
  Spring: {
    label: "Spring",
    bgColor: "#58D68D", // Fresh green
    textColor: "#ffffff",
    icon: FaSeedling,
  },
  Summer: {
    label: "Summer",
    bgColor: "#F4D03F", // Bright yellow
    textColor: "#000000",
    icon: FaSun,
  },
  Fall: {
    label: "Fall",
    bgColor: "#DC7633", // Warm orange
    textColor: "#ffffff",
    icon: FaLeaf,
  },
};
