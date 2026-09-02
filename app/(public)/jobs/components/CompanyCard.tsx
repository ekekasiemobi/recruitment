import Link from "next/link";
import {Building2} from "lucide-react";
import type { Company } from "../../components/data/companies";

type CompanyCardProps = {
  company: Company;
};

export default function CompanyCard({
  company,
}: CompanyCardProps) {
  return (
    <Link
      href={`/companies/${company.id}`}
      className="group block rounded-xl border border-[#e7edeb] bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#159a8c]/40 hover:shadow-md"
    >
      
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#f4f6f5] text-[#171717]">
        <Building2 className="h-5 w-5" />
      </div>

      
      <div className="mt-4">
        <h3 className="text-sm font-semibold text-[#171717] group-hover:text-[#159a8c]">
          {company.name}
        </h3>

        <p className="mt-1 text-xs leading-5 text-gray-400">
          {company.description}
        </p>

        <div className="mt-4">
          <span className="text-xs font-medium text-[#159a8c]">
            {company.jobCount} Open Positions
          </span>
        </div>
      </div>
    </Link>
  );
}