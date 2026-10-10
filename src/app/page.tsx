"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { CountdownSection } from "@/components/sections/CountdownSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { TracksSection } from "@/components/sections/TracksSection";
import { ScheduleSection } from "@/components/sections/ScheduleSection";
import { PrizesSection } from "@/components/sections/PrizesSection";
import { JudgingSection } from "@/components/sections/JudgingSection";
import { RulesSection } from "@/components/sections/RulesSection";
import { MentorsSection } from "@/components/sections/MentorsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { RegistrationDialog } from "@/components/registration/RegistrationDialog";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-acid focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-acid-foreground"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1">
        <HeroSection />
        <CountdownSection />
        <AboutSection />
        <TracksSection />
        <ScheduleSection />
        <PrizesSection />
        <JudgingSection />
        <RulesSection />
        <MentorsSection />
        <FAQSection />
        <ContactSection />
        <FinalCTA />
      </main>
      <Footer />
      <RegistrationDialog />
    </div>
  );
}
