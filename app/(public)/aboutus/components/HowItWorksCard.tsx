import { HowItWorksStep } from "../../components/data/how-it-works";


type HowItWorksCardProps = {
  step: HowItWorksStep;
};

export default function HowItWorksCard({
  step,
}: HowItWorksCardProps) {
  const Icon = step.icon;

  return (
    <article className="group relative rounded-2xl border border-[#e6e9e8] bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#159a8c]/30 hover:shadow-lg">
      {/* Step number */}
      <span className="absolute right-5 top-5 text-xs font-semibold text-[#159a8c]/50">
        {step.step}
      </span>

      {/* Icon */}
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#eef8f6] text-[#159a8c] transition-colors duration-200 group-hover:bg-[#159a8c] group-hover:text-white">
        <Icon className="h-6 w-6" strokeWidth={1.8} />
      </div>

      {/* Content */}
      <div className="mt-6">
        <h3 className="text-base font-semibold text-[#171717]">
          {step.title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          {step.description}
        </p>
      </div>
    </article>
  );
}