"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { NavigationControls } from "./navigation-control";
import ProgressBar from "./progress-bar";
import { parseSection } from "@/lib/summary-helpers";
import ContentSections from "./content-sections";

const SectionTitle = ({ title }: { title: string }) => {
    return <div className="flex flex-col gap-2 mb-6 sticky top-0 pt-2 pb-4 bg-background/80 backdrop-blur-xs z-10">
                <h2 className="text-3xl lg:text-4xl font-bold text-center flex items-center justify-center gap-2">
                    {title}
                </h2>
            </div>
};

export function SummaryViewer({ summary }: { summary: string }) {
  const [currentSection, setCurrentSection] = useState(0);

  const handleNext = () => setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
  const handlePrevious = () => setCurrentSection((prev) => Math.max(prev - 1, 0));

  // Improved parsing of summary sections
  const sections = summary
    .split(/(?=\n\s*#\s*)/g)  // Split on section markers but keep the marker with the content
    .map((section) => section.trim())
    .filter(Boolean)
    .map(parseSection);
  
  // Log processed sections for debugging
  console.log("Processed sections:", sections);

  return (
    <Card
    className="relative px-2 h-[500px] sm:h-[600px] lg:h-[700px] w-full xl:w-[600px] overflow-hidden
               bg-gradient-to-br from-background via-background/95 to-rose-500/5
               backdrop-blur-lg shadow-2xl rounded-3xl border border-rose-500/10"
    >
        <ProgressBar sections={sections} currentSection={currentSection} />

        <div className="h-full overflow-y-auto scrollbar-hide pt-12 sm:pt-16 pb-20 sm:pb-24">
          <div className="px-4 sm:px-6">
            <SectionTitle title={sections[currentSection]?.title || ''} />
            <ContentSections 
                title={sections[currentSection]?.title || ''}
                points={sections[currentSection]?.points || []}
            />
          </div>
        </div>
        
        <NavigationControls
          currentSection={currentSection}
          totalSections={sections.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSectionSelect={setCurrentSection}
        />
    </Card>
  );
}