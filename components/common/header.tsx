import { FileText } from "lucide-react";
// import { Button } from "../ui/button";
import NavLink from "./nav-link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Header() {
  return ( 
    <nav className="container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto">
      {/* Logo - Always visible */}
      <div className="flex lg:flex-1">
        <NavLink href="/" className="flex items-center gap-1 lg:gap-2 shrink-0">
          <FileText className="w-5 h-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-12 transition-all duration-200 ease-in-out" />
          <span className="font-extrabold lg:text-xl text-gray-900">Smart-Summarizer</span> 
        </NavLink>
      </div>
      
      {/* Navigation - Hidden on small screens */}
      <div className="hidden sm:flex sm:justify-center gap-4 lg:gap-12 items-center">
        <NavLink href="/pricing" className="text-lg">Pricing</NavLink>
        <SignedIn>
          <NavLink href="/dashboard" className="text-lg">Your Summaries</NavLink>
        </SignedIn>
      </div>

      {/* Right side navigation */}
      <div className="flex justify-end lg:flex-1">
        <SignedIn>
          <div className="flex items-center gap-4">
            {/* Mobile only - Your Summaries link */}
            <div className="sm:hidden">
              <NavLink href="/dashboard" className="text-lg">Your Summaries</NavLink>
            </div>
            
            {/* Medium and up - Upload PDF and Pro badge */}
            <div className="hidden sm:flex gap-4 items-center">
              <NavLink href="/upload" className="text-lg">Upload PDF</NavLink>
              <div className="text-lg text-gray-900">Pro</div>
            </div>
            
            {/* User button - Always visible when signed in */}
            <UserButton />
          </div>
        </SignedIn>
        
        <SignedOut>
          <NavLink href="/sign-in" className="text-lg">Sign In</NavLink>
        </SignedOut>
      </div>
    </nav>
  )
}
