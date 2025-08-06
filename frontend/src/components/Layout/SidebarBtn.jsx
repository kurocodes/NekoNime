export default function SidebarBtn({ Icon, label, onClick }) {
  return (
    <div
      className="group m-2 px-4 py-2 rounded-full text-white bg-primary  cursor-pointer hover:bg-secondary transition-all duration-200 ease-in-out"
      onClick={onClick}
    >
      <div className="flex items-center gap-2 group-hover:translate-x-2 transition-all duration-200 ease-in-out">
        <Icon className="text-xl" />
        <span>{label}</span>
      </div>
    </div>
  );
}
