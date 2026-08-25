import Image from "next/image";
import image from "../../images/Img.png"

export default function AboutIntro() {
  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-10">

        {/* Intro heading + text */}
        <div className="grid gap-8 md:grid-cols-2 md:items-start lg:gap-20">

          {/* Heading */}
          <div>
            <h2 className="max-w-[330px] text-2xl font-bold leading-[1.15] tracking-tight text-[#111111] sm:text-3xl">
              Your Future Starts With The Right Opportunity
            </h2>
          </div>

          {/* Description */}
          <div>
            
            <p className="mt-4 text-xs leading-6 text-gray-500 sm:text-sm">
              Our platform connects talented professionals with trusted companies, making it easier to discover the right job and build a successful career.
              Whether you're starting your career, looking for your
              next opportunity, or searching for exceptional talent,
              we're here to make the recruitment process simpler,
              faster, and more effective.
            </p>
          </div>
        </div>

        {/* Main image */}
        <div className="relative mt-9 h-[250px] overflow-hidden rounded-xl sm:mt-12 sm:h-[350px] lg:h-[430px]">
          <Image
        src={image}
            alt="Our team working together"
            fill
            sizes="(max-width: 1180px) 100vw, 1180px"
            className="object-cover"
          />
        </div>

      </div>
    </section>
  );
}