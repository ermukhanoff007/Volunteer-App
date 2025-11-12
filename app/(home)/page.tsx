import About from "@/components/Sections/About";
import FirstSection from "@/components/Sections/FirstSection";
import HowToUse from "@/components/Sections/HowToUse";

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
