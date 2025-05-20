import { Sparkle } from "lucide-react";
import { Badge } from "../ui/badge";

export default function UploadHeader() {
    return (
        <div>
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
            >
                <div
                    className="relative aspect-[1155/678] w-[36.125rem] bg-gradient-to-br from-rose-200 via-emerald-100 to-blue-100 opacity-30"
                />
            </div>
            <div className="flex flex-col items-center justify-center gap-6 text-center py-20">
                <div className="relative p-[1px] overflow-hidden rounded-full bg-gradient-to-r from-rose-300 via-emerald-300 to-blue-200 animate-gradient-x group">
                    <Badge 
                        variant={'secondary'}
                        className="relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-gray-50 hover:bg-rose-50 active:bg-rose-100 transition-colors"
                    >
                            <Sparkle className="h-6 w-6 mr-2 text-rose-500 animate-pulse" />
                            <p className="text-base text-rose-600">AI-Powered Content Creation</p>
                    </Badge>
                </div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
                    Start Uploading <span className="relative inline-block px-4 bg-gradient-to-r from-rose-100 via-emerald-50 to-blue-50">Your PDF's</span>
                </h1>
                <p className="text-lg leading-8">
                    Upload your PDF's and let the AI do the magic ✨
                </p>     
            </div>          
        </div>
    )
}