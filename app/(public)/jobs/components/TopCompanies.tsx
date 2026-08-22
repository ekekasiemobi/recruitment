import { companies } from "../../components/data/companies";
import CompanyCard from "./CompanyCard";

export default function TopCompanies() {
  return (
    <section className="bg-[#eef8f6] py-16">
      <div className="mx-auto max-w-295 px-5 sm:px-8 lg:px-10">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-[#171717] sm:text-3xl">
            Top Companies
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-gray-500">
            Discover companies hiring talented people like you.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {companies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
            />
          ))}
        </div>
      </div>
    </section>
  );
}