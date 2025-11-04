import { X } from "lucide-react";
import { createPortal } from "react-dom";

interface IModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ onClose, children }: IModalProps) {
  return createPortal(
    <div className="fixed inset-0  z-50  justify-center  md:items-center md:flex backdrop-blur-sm overflow-y-auto px-4 py-8 ">
      <div className="relative w-full max-w-3xl bg-white text-black p-6 rounded-2xl shadow-md animate-fade-in ">
        <button
          onClick={onClose}
          className="absolute top-1 right-1 text-gray-700 hover:text-red-600 transition"
          aria-label="Close modal"
        >
          <X />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
