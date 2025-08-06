import { TiArrowSortedDown } from "react-icons/ti";
import { useGeneralContext } from "../../../context/GeneralContext";

export default function DropDown({ setIsSearchOpen }) {
  const { dropDownOpen, setDropDownOpen, setShowSideBar } = useGeneralContext();

  return (
    <button
      onClick={() => {
        setDropDownOpen(!dropDownOpen);
        setIsSearchOpen(false);
        setShowSideBar(false);
      }}
      className={`px-4 text-primary border-2 border-primary rounded-s-full cursor-pointer hover:bg-primary hover:text-white transition ${
        dropDownOpen ? "bg-primary text-white" : ""
      }`}
    >
      <div className="flex items-center gap-1">
        <span className="font-medium">Filter</span>
        <TiArrowSortedDown
          className={`text-xl mt-0.5 ${
            dropDownOpen ? "rotate-180" : ""
          } transition`}
        />
      </div>
    </button>
  );
}
