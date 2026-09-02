import Image from "next/image";
// import image from "../../images/Img.png";
import {
  BadgeCheck,
  FileText,
  BriefcaseBusiness,
  Users,
} from "lucide-react";

const features = [
  {
    icon: BadgeCheck,
    title: "Quality Job",
  },
  {
    icon: FileText,
    title: "Resume builder",
  },
  {
    icon: BriefcaseBusiness,
    title: "Top Companies",
  },
  {
    icon: Users,
    title: "Top Talents",
  },
];

export default function BestCompanies() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
          
         
          <div className="grid h-[430px] grid-cols-[1fr_1fr] gap-3 sm:h-[500px]">
            
           
            <div className="relative overflow-hidden rounded-xl">
              <Image
                src="/img4.jpeg"
                alt="Professionals working together"
                fill
                sizes="(max-width: 1024px) 50vw, 300px"
                className="object-cover"
              />
            </div>

           
            <div className="grid grid-rows-2 gap-3">
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src="/img3.jpeg"
                  alt="Professional workplace"
                  fill
                  sizes="(max-width: 1024px) 50vw, 300px"
                  className="object-cover"
                />
              </div>

              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src="/img2.jpeg"
                  alt="Team collaboration"
                  fill
                  sizes="(max-width: 1024px) 50vw, 300px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          
          <div>
            <h2 className="max-w-md text-3xl font-bold leading-[1.08] tracking-tight text-[#111111] sm:text-4xl lg:text-[42px]">
              We're Only Working
              <br />
              With The Best
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-6 text-gray-500">
              We connect talented professionals with trusted companies
              and create opportunities that help people and businesses
              grow together.
            </p>

           
            <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-7">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center text-[#159a8c]">
                      <Icon
                        className="h-5 w-5"
                        strokeWidth={1.5}
                      />
                    </div>

                    <span className="text-xs font-medium text-[#222222] sm:text-sm">
                      {feature.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}