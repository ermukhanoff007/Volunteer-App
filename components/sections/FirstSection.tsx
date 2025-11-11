import Link from "next/link";
import { Button } from "../ui/button";

const FirstSection = () => {
  return (
    <section className='relative bg-[url("/e8cdfde9aa2f6c5a65e6cb78734558f7deae3b0d.jpg")] w-full bg-cover bg-center h-[500px]  shadow-2xl flex  items-center justify-center'>
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="flex flex-col items-center justify-center gap-3 relative z-10">
        <h1 className="text-5xl tracking-wide text-white ">Let's do it together</h1>
        <p className="text-2xl tracking-wide text-white">We will help to each other</p>
        <Link href="/events">
          <Button>View Events</Button>
        </Link>
      </div>
    </section>
  );
};

export default FirstSection;
