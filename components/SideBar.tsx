"use client";
import { ArrowBigRightIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Modal } from "./Modal";
import CreateEvent from "./Event/CreateEvent";
import { useState } from "react";
interface ISideBarProps {
  session: any;
  isOpen: boolean;
  onClose: () => void;
}
export function SideBar({ session, isOpen, onClose }: ISideBarProps) {
  const [ModalIsOpen, setIsModalOpen] = useState(false);
  const links = [
    { href: "/#about", label: "About" },
    { href: "/my-applications", label: "My Applications" },
    { href: "/events", label: "All Events" },
  ];
  const pathname = usePathname();
  return (
    <div>
      {isOpen && <div className="fixed inset-0 z-40 bg-gray/40" onClick={onClose}></div>}
      <div>
        <div
          className={`fixed  top-0 left-15 p-4 w-3/4 max-w-[314px] h-screen bg-amber-50 shadow rounded-xl z-50 transfrom  
            ${isOpen ? "flex flex-col gap-2" : "hidden"}`}
        >
          <nav className="flex flex-col gap-4 mt-8">
            {links
              .filter((link) => !(link.href === "/my-applications" && !session?.user?.email))
              .map((link) => {
                if (link.href === "/my-applications" && session?.user.role === "ORGANIZER")
                  return (
                    <div key={link.href} onClick={onClose}>
                      <span onClick={() => setIsModalOpen(true)}>Create Event</span>
                      {ModalIsOpen && (
                        <Modal onClose={() => setIsModalOpen(false)}>
                          <CreateEvent />
                        </Modal>
                      )}
                    </div>
                  );
                return (
                  <div key={link.label} className="flex flex-row justify-between" onClick={onClose}>
                    <Link
                      href={link.href}
                      className={`font-medium tracking-wide px-2 ${pathname === link.href ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
                    >
                      <span>{link.label}</span>
                    </Link>
                    <Link
                      href={link.href}
                      className={`text-lg ${pathname === link.href ? "text-blue-600  border-blue-600" : "text-gray-500"}`}
                    >
                      <ArrowBigRightIcon />
                    </Link>
                  </div>
                );
              })}
          </nav>
        </div>
        <div onClick={onClose}></div>
      </div>
    </div>
  );
}
