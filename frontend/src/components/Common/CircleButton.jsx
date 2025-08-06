export default function CircleButton({ icon: Icon, onClick, title, btnText }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`flex items-center cursor-pointer rounded-full text-white ${
        !btnText
          ? "p-2 hover:scale-110 bg-primary hover:bg-secondary hover:text-primary-hover-text"
          : "h-full bg-secondary hover:bg-primary"
      }  transition duration-300`}
    >
      <Icon
        className={`text-lg ${
          btnText && "bg-primary w-full h-full p-2 rounded-full"
        }`}
      />
      {btnText && <span className="text-sm pl-1 pr-3">{btnText}</span>}
    </button>
  );
}
