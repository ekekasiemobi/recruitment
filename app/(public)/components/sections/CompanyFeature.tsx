import CompanyFeatureCard from "../cards/CompanyFeatureCard";
import { companyFeature } from "../data/company-feature";


export default function CompanyFeature() {
  return (
    <section className="bg-white px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1180px]">
        <CompanyFeatureCard {...companyFeature} />
      </div>
    </section>
  );
}