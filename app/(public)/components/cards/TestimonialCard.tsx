import { Star } from "lucide-react";
import { Testimonial } from "../data/testimonial";


type TestimonialCardProps = {
  testimonial: Testimonial;
};

export default function TestimonialCard({
  testimonial,
}: TestimonialCardProps) {
  return (
    <article className="rounded-xl border border-[#e8eceb] bg-white p-6 shadow-sm transition hover:shadow-md">
      
      
      <div className="mb-4 flex gap-1">
        {[...Array(testimonial.rating)].map((_, index) => (
          <Star
            key={index}
            className="h-4 w-4 fill-yellow-400 text-yellow-400"
          />
        ))}
      </div>

      
      <h3 className="text-sm font-semibold text-[#171717]">
        {testimonial.title}
      </h3>

     
      <p className="mt-3 text-sm leading-6 text-gray-500">
        {testimonial.content}
      </p>

      
      <div className="mt-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef8f6] text-sm font-semibold text-[#159a8c]">
          {testimonial.name.charAt(0)}
        </div>

        <div>
          <h4 className="text-sm font-medium">
            {testimonial.name}
          </h4>

          <p className="text-xs text-gray-400">
            {testimonial.role}
          </p>
        </div>
      </div>
    </article>
  );
}