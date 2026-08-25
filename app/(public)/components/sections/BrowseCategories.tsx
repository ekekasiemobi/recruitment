import { categories } from "../data/categories";
import CategoryCard from "../cards/CategoryCard";

export default function BrowseCategories() {
  return (
    <section className="bg-[#eef8f6] py-16">
      <div className="mx-auto max-w-[1180px] max-h-[2000px] px-5 sm:px-8 lg:px-10">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-[#171717] sm:text-3xl">
            Browse by Category
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-gray-500">
            Explore opportunities across different industries and
            find the job that matches your skills.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          ))}
        </div>
      </div>
    </section>
  );
}