import { create } from "domain";
import { createPortal } from "react-dom";

interface IModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ onClose, children }: IModalProps) {
  return createPortal(
    <div className="flex fixed inset-0 z-50 backdrop-blur-sm items-center justify-center">
      <div className="flex flex-row items-center justify-center relative w-[90%] max-w-xl text-white p-6 rounded-2xl animate-fade-in">
        <button
          onClick={onClose}
          className=" absolute top-10 left-105 text-black text-xl hover:text-red-600 transition"
          aria-label="Close modal"
        >
          x
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
