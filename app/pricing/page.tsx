import BgGradient from "@/components/common/bg-gradient";
import PricingSection from "@/components/home/pricing-section";
import CTASection from "@/components/home/cta-section";

export default function Home() {
  return (
    <div className="relative w-full">
      <BgGradient />
      <div className="flex flex-col">
        <PricingSection />
        <CTASection />
      </div>     
    </div>
  );
}

