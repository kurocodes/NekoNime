import DropDownMenu from "./DropDownMenu";

export default function TabHeader({
  heading,
  showBtn,
  dropDownOptions = [],
  selectedOption,
  setSelectedOption,
}) {
  return (
    <div className=" flex items-center justify-between border-b-2 border-primary">
      {/* Tab Heading */}
      <h2 className="text-xs xs:text-sm sm:text-[16px] text-white bg-secondary rounded-t-md px-4 py-2">
        {heading}
      </h2>

      {/* Dropdown Menu */}
      {showBtn && (
        <DropDownMenu
          options={dropDownOptions}
          selected={selectedOption}
          setSelected={setSelectedOption}
        />
      )}
    </div>
  );
}
