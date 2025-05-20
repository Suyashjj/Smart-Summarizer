import { Bot } from "lucide-react";

export default function DemoSection() {
    return (
      <section className="relative">
        <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
            <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
            >
            <div
                className="relative left-[calc(50%-3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-br from-emerald-200 via-teal-100 to-cyan-200 opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]"
                style={{
                clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
            />
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Bot className="w-8 h-8 text-rose-500 animate-pulse hover:scale-110 transition-transform duration-300 drop-shadow-lg" />
                </div>
                <div className="text-center mb-16">
                    <h3 className="font-bold text-3xl max-w-2xl max-auto px-4 sm:px-6">
                        Watch how Sommaire <span className="bg-linear-to-r from-rose-500 to-rose-700 text-transparent bg-clip-text">transforms PDF</span> into a beautiful summary
                    </h3>
                </div>

                <div className="flex justify-center items-center px-4 lg:px-6">
                    {/* Summary Viewer  */}
                </div>
            </div>
        </div>

      </section>
    );
  }
  