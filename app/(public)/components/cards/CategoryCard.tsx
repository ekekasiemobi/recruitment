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
      className="group relative rounded-2xl border-[#e8eceb] bg-white p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex-col items-center justify-center text-center"
    >
      
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#eef8f6] text-[#159a8c] mx-auto">
        <Icon className="h-6 w-6" strokeWidth={1.8} />
      </div>

     
      <div className="mt-6">
        <h3 className="text-base font-semibold text-[#171717]">
          {category.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-gray-500">
          {category.jobCount} Jobs
        </p>
      </div>
    </Link>
  );
}