import About from "@/components/sections/About";
import FirstSection from "@/components/sections/FirstSection";
import HowToUse from "@/components/sections/HowToUse";

export default function Home() {
  return (
    <div>
      <FirstSection />
      <section id="about">
        <About />
      </section>
      <HowToUse />
    </div>
  );
}
