"use client";
import Link from "next/link";
import Image from "next/image";
import { LogIn, LogOut, User } from "lucide-react";
import Search from "./SearchComponent";
import { Button } from "./ui/button";
import { signOutFn } from "@/server-actions/sign-out";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Modal } from "./Modal";
import CreateEvent from "./CreateEvent";

const Header = ({ session }: { session: any }) => {
  const router = useRouter();
  const handeleLogOut = async () => {
    await signOutFn();
    router.push("/");
    router.refresh();
  };
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/about", label: "About" },
    { href: "/my-applications", label: "My Application" },
    { href: "/events", label: "All Events" },
  ];
  return (
    <header className="bg-amber-50 shadow-2xl">
      <div className="flex flex-row items-center p-4 justify-between">
        <div>
          <Link href="/">
            <Image src="/birgemiz.png" alt="Logo" width={40} height={40} />
            <span className="font-bold">Volunteer App</span>
          </Link>
        </div>
        <div>
          <nav className="flex flex-row items-center p-4 w-full gap-8">
            {links
              .filter((link) => !(link.href === "/my" && !session?.user?.email))
              .map((link) => {
                if (link.href === "/my-applications" && session?.user.role === "ORGANIZER")
                  return (
                    <div key={link.href}>
                      <span onClick={() => setIsOpen(true)}>Create Event</span>
                      {isOpen && (
                        <Modal onClose={() => setIsOpen(false)}>
                          <CreateEvent />
                        </Modal>
                      )}
                    </div>
                  );
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="font-medium tracking-wide px-2 "
                  >
                    <span>{link.label}</span>
                  </Link>
                );
              })}
          </nav>
        </div>
        <Search />
        <div className="flex flex-row gap-4 mr-8 items-center">
          {session ? (
            <div className="flex flex-row gap-4  items-center">
              <Button>
                <Link href="/" className="flex flex-row gap-4 items-center">
                  <User />
                  {session?.user?.email}
                </Link>
              </Button>
              <Button className="bg-red-600 hover:bg-red-700 w-9" onClick={handeleLogOut}>
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
  );
};

export default Header;
