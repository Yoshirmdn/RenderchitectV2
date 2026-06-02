import { HeroSection } from "../components/sections/HeroSection";
import { MarqueeSection } from "../components/sections/MarqueeSection";
import { StatsSection } from "../components/sections/StatsSection";
import { FeaturedProjects } from "../components/sections/FeaturedProjects";
import { VideoShowcase } from "../components/sections/VideoShowcase";
import { ServiceShowcase } from "../components/sections/ServiceShowcase";
import { MitraSection } from "../components/sections/MitraSection";
import { TestimonialSection } from "../components/sections/TestimonialSection";
import { FAQSection } from "../components/sections/FAQSection";
import { CTASection } from "../components/sections/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <StatsSection />
      <FeaturedProjects />
      <VideoShowcase />
      <ServiceShowcase />
      <MitraSection />
      <TestimonialSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
