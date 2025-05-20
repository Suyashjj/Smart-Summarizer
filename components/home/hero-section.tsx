import { Button } from "../ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function HeroSection() {
  return (
    <section className="relative mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl">
      <div className="flex">
        <div className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 animated-gradient-x group"> 
          <Badge 
            variant={'secondary'}
            className="relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-rose-100 transition-colors duration-200"> 
            <Sparkles className="h-6 w-6 mr-2 text-rose-600 animate-pulse" />
            <p className="text-base text-rose-600">Powered by AI</p>
          </Badge>
        </div>
      </div>

      <h1 className="font-bold py-6 text-center">
        Transform PDFs into <span className="bg-rose-50">concise</span> summaries
      </h1>
      <h2 className="text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl text-gray-600">
        Get a beautiful summary reel of the document in seconds
      </h2>

      <div>
        {/* Mobile View - Signed In */}
        <SignedIn>
          <div className="sm:hidden">
            <Button
              variant={'link'}
              className="text-white mt-6 text-base rounded-full px-8 py-4 bg-linear-to-r from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-900 hover:no-underline font-bold shadow-lg transition-all duration-300"   
            >
              <Link href="/upload" className="flex gap-2 items-center">
                <span>Upload PDF</span>
                <ArrowRight className="animate-pulse" />
              </Link>
            </Button>
          </div>
        </SignedIn>

        {/* Mobile View - Signed Out */}
        <SignedOut>
          <div className="sm:hidden">
            <Button
              variant={'link'}
              className="text-white mt-6 text-base rounded-full px-8 py-4 bg-linear-to-r from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-900 hover:no-underline font-bold shadow-lg transition-all duration-300"   
            >
              <Link href="/pricing" className="flex gap-2 items-center">
                <span>Try Summarizer</span>
                <ArrowRight className="animate-pulse" />
              </Link>
            </Button>
          </div>
        </SignedOut>

        {/* Desktop and Tablet View */}
        <div className="hidden sm:block">
          <Button
            variant={'link'}
            className="text-white mt-6 text-base sm:text-lg lg:text-xl rounded-full px-8 sm:px-10 py-4 sm:py-7 lg:py-8 lg:mt-16 bg-linear-to-r from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-900 hover:no-underline font-bold shadow-lg transition-all duration-300"   
          >
            <Link href="/pricing" className="flex gap-2 items-center">
              <span>Try Summarizer</span>
              <ArrowRight className="animate-pulse" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
