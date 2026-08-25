import Image from "next/image";
import image from "../../(public)/images/Map.png"

export default function ContactMap() {
  return (
    <section className="bg-white pb-16 sm:pb-20 lg:pb-24">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-10">

        {/* Map */}
        <div className="relative h-[250px] overflow-hidden sm:h-[330px] lg:h-[390px]">
          <Image
            src={image}
            alt="Map showing our office location"
            fill
            sizes="(max-width: 1180px) 100vw, 1180px"
            className="object-cover"
          />
        </div>

        <div className="mt-7 grid grid-cols-2 items-center gap-y-7 sm:grid-cols-4 sm:gap-y-0">

          {/* Zoom */}
          <div className="flex items-center justify-center">
            <Image
              src="/"
              alt="Zoom"
              width={90}
              height={30}
              className="h-auto max-h-7 w-auto max-w-[90px] object-contain opacity-60 grayscale"
            />
          </div>

          {/* Tinder */}
          <div className="flex items-center justify-center">
            <Image
              src="/"
              alt="Tinder"
              width={90}
              height={30}
              className="h-auto max-h-7 w-auto max-w-[90px] object-contain opacity-60 grayscale"
            />
          </div>

          {/* Dribbble */}
          <div className="flex items-center justify-center">
            <Image
              src="/"
              alt="Dribbble"
              width={90}
              height={30}
              className="h-auto max-h-7 w-auto max-w-[90px] object-contain opacity-60 grayscale"
            />
          </div>

          {/* Asana */}
          <div className="flex items-center justify-center">
            <Image
              src="/"
              alt="Asana"
              width={90}
              height={30}
              className="h-auto max-h-7 w-auto max-w-[90px] object-contain opacity-60 grayscale"
            />
          </div>

        </div>
      </div>
    </section>
  );
}