import Link from "next/link";
import { usePathname } from "next/navigation";
interface ISideBarProps {
  session: any;
  isOpen: boolean;
  onClose: () => void;
}
export function SideBar({ session, isOpen, onClose }: ISideBarProps) {
  const links = [
    { href: "/about", label: "About" },
    { href: "/my-applications", label: "My Applications" },
    { href: "/events", label: "All Events" },
  ];
  const pathname = usePathname();
  return (
    <div>
      {isOpen && <div className="fixed inset-0 z-40 bg-gray/40" onClick={onClose}></div>}
      <div>
        <div
          className={`fixed  top-0 left-15 p-4 w-3/4 max-w-[314px] bg-amber-50 shadow rounded-xl z-50 transfrom  
            ${isOpen ? "flex flex-col gap-2" : "hidden"}`}
        >
          <nav className="flex flex-col gap-4 mt-8">
            {links
              .filter((link) => !(link.href === "/my-applications" && !session?.user?.email))
              .map((link) => (
                <Link key={link.href} href={link.href} onClick={onClose} className={`text-lg ${pathname === link.href ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}>
                  {link.label}
                </Link>
              ))}
          </nav>
        </div>
        <div onClick={onClose}></div>
      </div>
    </div>
  );
}
