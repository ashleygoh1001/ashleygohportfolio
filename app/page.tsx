import { HeroSection } from "@/components/HeroSection";
import { WorkSection } from "@/components/WorkSection";
import { DataSection } from "@/components/DataSection";
import { RightNowSection } from "@/components/RightNowSection";
import { AboutSection } from "@/components/AboutSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <WorkSection />
      <DataSection />
      <RightNowSection />
      <AboutSection />
    </main>
  );
}
