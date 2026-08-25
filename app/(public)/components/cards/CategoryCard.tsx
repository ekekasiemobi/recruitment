import Link from "next/link";
import type { Category } from "../data/categories";

type CategoryCardProps = {
  category: Category;
};

export default function CategoryCard({
  category,
}: CategoryCardProps) {
  const Icon = category.icon;

  return (
    <Link
      href={`/jobs?category=${category.title.toLowerCase()}`}
      className="group relative h-[180px] right-5 top-5 rounded-xl border border-[#e7edeb] bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#159a8c]/40 hover:shadow-md"
    >
      <div className=" absolute flex items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#eef8f6] text-[#159a8c] transition-colors group-hover:bg-[#159a8c] group-hover:text-white">
          <Icon className="h-5 w-5" />
        </div>

        <div className="pt-10 pl-5 min-w-0">
          <h3 className="truncate text-sm font-semibold text-[#171717]">
            {category.title}
          </h3>

          <p className="mt-1 text-xs text-gray-400">
            {category.jobCount} Jobs
          </p>
        </div>
      </div>
    </Link>
  );
}