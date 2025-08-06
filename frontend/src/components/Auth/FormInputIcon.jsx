export default function FormInputIcon({ Icon, error, isFocused, onClick }) {
  return (
    <div
      className={`flex items-center text-2xl px-2 cursor-pointer transition duration-200 ${
        error
          ? "bg-red-500 text-white"
          : isFocused
          ? "bg-primary text-white"
          : "bg-secondary text-primary-hover-text"
      }`}
      onClick={onClick}
    >
      <Icon />
    </div>
  );
}
