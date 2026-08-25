import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import image from "../../images/Imgs.png";

export default function FutureBanner() {
  return (
    <section className="bg-white py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-10">
        <div className="relative min-h-[280px] overflow-hidden rounded-xl bg-black sm:min-h-[330px]">
          
          {/* Background image */}
          <div className="absolute inset-y-0 right-0 w-full sm:w-[58%]">
            <Image
              src={image}
              alt="People building their future"
              fill
              sizes="(max-width: 640px) 100vw, 60vw"
              className="object-cover"
            />

            {/* Fade image into black */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-black/10" />

            {/* Mobile overlay */}
            <div className="absolute inset-0 bg-black/30 sm:hidden" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex min-h-[280px] max-w-xl flex-col justify-center px-6 py-10 sm:min-h-[330px] sm:px-8 lg:px-10">
            
            <h2 className="max-w-md text-3xl font-bold leading-[1.08] text-white sm:text-4xl">
              Create A Better
              <br />
              Future For Yourself
            </h2>

            <p className="mt-4 max-w-md text-xs leading-5 text-white/60 sm:text-sm">
              Take the next step in your career and discover opportunities that can help you build a better future.
            </p>

            <div className="mt-6">
              <Link
                href="/jobs"
                className="group inline-flex items-center gap-2 rounded-md bg-[#159a8c] px-4 py-2.5 text-xs font-medium text-white transition-colors hover:bg-[#0f756a]"
              >
                Search Job

                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}