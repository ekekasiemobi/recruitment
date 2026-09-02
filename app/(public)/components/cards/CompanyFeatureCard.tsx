import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
// import Img from "../../images/Img.png"

type CompanyFeatureStat = {
  value: string;
  label: string;
};

type CompanyFeatureCardProps = {
  eyebrow?: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  buttonText: string;
  buttonHref: string;
  stats: CompanyFeatureStat[];
  imagePosition?: "left" | "right";
};

export default function CompanyFeatureCard({
  eyebrow = "Find Your Opportunity",
  title,
  description,
  image,
  imageAlt,
  buttonText,
  buttonHref,
  stats,
  imagePosition = "left",
}: CompanyFeatureCardProps) {
  const content = (
    <div className="flex flex-col justify-center">
      {eyebrow && (
        <p className="text-sm font-semibold tracking-wide text-[#159a8c]">
          {eyebrow}
        </p>
      )}

      <h2 className="mt-3 max-w-xl text-3xl font-bold leading-tight tracking-tight text-[#171717] sm:text-4xl lg:text-[42px] lg:leading-[1.12]">
        {title}
      </h2>

      <p className="mt-5 max-w-xl text-sm leading-7 text-gray-500 sm:text-[15px]">
        {description}
      </p>

      <div className="mt-7">
        <Link
          href={buttonHref}
          className="group inline-flex items-center gap-2 rounded-md bg-[#159a8c] px-5 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#0f756a]"
        >
          {buttonText}

          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      {/* Stats */}
      {stats.length > 0 && (
        <div className="mt-9 grid grid-cols-2 gap-5 border-t border-[#dce9e6] pt-6 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl font-bold tracking-tight text-[#171717]">
                {stat.value}
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const imageContent = (
    <div className="relative min-h-[360px] overflow-hidden rounded-2xl sm:min-h-[440px] lg:min-h-[500px]">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 hover:scale-[1.02]"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
    </div>
  );

  return (
    <section className="overflow-hidden rounded-3xl bg-[#eef8f6] p-5 sm:p-8 lg:p-10">
      <div
        className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-12 ${
          imagePosition === "right"
            ? "lg:[&>div:first-child]:order-1 lg:[&>div:last-child]:order-2"
            : ""
        }`}
      >
        {imageContent}

        {content}
      </div>
    </section>
  );
}