import { useRef, useState } from "react";
import { MdCancel } from "react-icons/md";

export default function AppAlert({ type, message }) {
  const [showAlert, setShowAlert] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);
  const alertRef = useRef(null);

  const handleClose = () => {
    setAnimateOut(true);
    setTimeout(() => setShowAlert(false), 300);
  };

  if (!showAlert) return null;

  return (
    <div
      ref={alertRef}
      className={`fixed bottom-0 z-60 w-full overflow-hidden transition-all duration-300 ease-in-out ${
        animateOut ? "max-h-0 opacity-0" : "max-h-[100px] opacity-100"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-2 bg-red-500 text-white">
        <span className="text-sm sm:text-base text-center w-full">
          {message}
        </span>
        <button
          className="p-2 ml-2 text-white/80 cursor-pointer hover:text-white hover:bg-red-700 rounded transition"
          onClick={handleClose}
        >
          <MdCancel className="text-2xl" />
        </button>
      </div>
    </div>
  );
}
