import CategoryCard from "../cards/CategoryCard";
import { categories } from "../data/categories";

export default function BrowseCategories() {
  return (
    <section className="py-16 bg-[#eef8f6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#171717]">Browse by Category</h2>
          <p className="mt-3 text-gray-600">
            Explore opportunities across different industries and find the job that matches your skills.
          </p>
        </div>

        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
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