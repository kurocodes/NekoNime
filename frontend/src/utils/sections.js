import {
  MdOutlineBookmarkAdded,
  MdOutlineListAlt,
  MdOutlinePlayArrow,
  MdOutlineRemoveCircle,
  MdPlaylistAddCheck,
} from "react-icons/md";

export const SECTION_TYPES = {
  TRENDING: "TRENDING NOW",
  UPCOMING: "UPCOMING ANIME",
  LATEST: "LATEST ANIME",
  SEARCH: "SEARCH RESULTS",
};

export const listOptions = [
  { status: "Completed", Icon: MdPlaylistAddCheck },
  { status: "Watching", Icon: MdOutlinePlayArrow },
  {
    status: "Plan To Watch",
    Icon: MdOutlineBookmarkAdded,
  },
  { status: "Dropped", Icon: MdOutlineRemoveCircle },
  { status: "Custom", Icon: MdOutlineListAlt },
];

export const defaultListSections = [
  { status: "Completed", Icon: MdPlaylistAddCheck },
  { status: "Watching", Icon: MdOutlinePlayArrow },
  {
    status: "Plan To Watch",
    Icon: MdOutlineBookmarkAdded,
  },
  { status: "Dropped", Icon: MdOutlineRemoveCircle },
];
