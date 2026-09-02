import Image from "next/image";
import { Play, ArrowUpRight } from "lucide-react";
// import image from "../../images/Img.png"

const videoFeatures = [
  {
    number: "1",
    text: "Discover opportunities that match your skills, experience, and career ambitions."
  },
  {
    number: "2",
    text: "Explore trusted companies and find the right workplace for your professional journey.",
  },
  {
    number: "3",
    text: "Build your career with opportunites dasigned to help you achieve your goals.",
  },
];

export default function VideoSection() {
  return (
    <section className="bg-white py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-10">
        
        <div className="relative h-[390px] overflow-hidden rounded-xl sm:h-[470px] lg:h-[520px]">
          
          
          <Image
            src="/img2.jpeg"
            alt="Good life begins with a good company"
            fill
            sizes="(max-width: 1180px) 100vw, 1180px"
            className="object-cover"
          />

          
          <div className="absolute inset-0 bg-black/50" />

          
          <div className="absolute inset-0 flex flex-col items-center justify-center pb-20 text-center">
            
            
            <button
              type="button"
              aria-label="Play video"
              className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-[#159a8c] text-white transition-transform duration-200 hover:scale-105"
            >
              <Play
                className="ml-0.5 h-5 w-5 fill-current"
              />
            </button>

            <h2 className="max-w-lg text-3xl font-bold leading-tight text-white sm:text-4xl">
              Good Life Begins With
              <br />
              A Good Company
            </h2>
          </div>

          
          <div className="absolute bottom-0 left-0 right-0 bg-black/90 px-5 py-4 sm:px-7 sm:py-5">
            <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
              {videoFeatures.map((feature) => (
                <div
                  key={feature.number}
                  className="flex gap-3"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#159a8c] text-[10px] font-semibold text-white">
                    {feature.number}
                  </span>

                  <div>
                    <p className="text-[11px] leading-4 text-white sm:text-xs">
                      {feature.text}
                    </p>

                    <button
                      type="button"
                      className="mt-1 text-[9px] text-[#159a8c] transition-colors hover:text-white"
                    >
                      Learn more
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}