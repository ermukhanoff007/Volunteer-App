"use client";
import Link from "next/link";
import Image from "next/image";
import { LogIn, LogOut, Menu, User } from "lucide-react";
import Search from "../SearchComponent";
import { Button } from "../ui/button";
import { signOutFn } from "@/server-actions/sign-out";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Modal } from "../Modal";
import CreateEvent from "../event/CreateEvent";
import { SideBar } from "../SideBar";

const Header = ({ session }: { session: any }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [rotate, setRotate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const handeleLogOut = async () => {
    await signOutFn();
    router.push("/");
    router.refresh();
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setRotate(!rotate);
  };
  const closeMenu = () => {
    setMenuOpen(false);
    setRotate(false);
  };
  const links = [
    { href: "/#about", label: "About" },
    { href: "/my-applications", label: "My Application" },
    { href: "/events", label: "All Events" },
  ];
  return (
    <div className="h-[90px]">
      <header className="bg-amber-50 shadow-2xl sm:sticky z-50 fixed w-full">
        <div className="flex flex-row items-center sm:p-4 py-2 justify-between">
          <div className="block sm:hidden mr-2">
            <Menu
              className={`transform transition-transform duration-300 w-8 h-8 ${rotate ? "rotate-90" : "rotate-0"}`}
              onClick={toggleMenu}
            />
          </div>
          <div>
            <Link href="/">
              <Image src="/birgemiz.png" alt="Logo" width={40} height={40} />
              <span className="font-bold">Volunteer App</span>
            </Link>
          </div>
          <div>
            <nav className="hidden flex-row items-center md:p-4 p-2 w-full md:gap-8 gap-2 sm:flex">
              {links
                .filter((link) => !(link.href === "/my-applications" && !session?.user?.email))
                .map((link) => {
                  if (link.href === "/my-applications" && session?.user.role === "ORGANIZER")
                    return (
                      <div key={link.href}>
                        <span onClick={() => setIsOpen(true)}>Create Event</span>
                        {isOpen && (
                          <Modal onClose={() => setIsOpen(false)}>
                            <CreateEvent onClose={() => setIsOpen(false)} />
                          </Modal>
                        )}
                      </div>
                    );
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={`font-medium tracking-wide px-2 ${pathname === link.href ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
                    >
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
            </nav>
          </div>
          <Search />
          <div className="flex flex-row gap-4 lg:mr-8 items-center">
            {session ? (
              <div className="flex flex-row gap-4  items-center relative">
                <div
                  className="flex flex-row gap-2 bg-amber-100 px-2 py-2 rounded-xl text-black "
                  onClick={() => setUserOpen(!userOpen)}
                >
                  <User className="w-9" />
                  <span className="md:block hidden">{session?.user?.email}</span>
                  {userOpen && (
                    <p className="absolute top-15 right-10 bg-white rounded-xl p-2">
                      {session?.user?.email}
                    </p>
                  )}
                </div>
                <Button
                  className="bg-red-600 hover:bg-red-700 w-9 rounded-xl"
                  onClick={handeleLogOut}
                >
                  <LogOut />
                </Button>
              </div>
            ) : (
              <Link href="/register" className=" font-medium tracking-wide">
                <LogIn />
              </Link>
            )}
          </div>
        </div>
      </header>
      <SideBar isOpen={menuOpen} onClose={closeMenu} session={session} />
    </div>
  );
};

export default Header;
