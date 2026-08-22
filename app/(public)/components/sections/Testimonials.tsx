import TestimonialCard from "../cards/TestimonialCard";
import { testimonials } from "../data/testimonial";


export default function Testimonials() {
  return (
    <section className="bg-[#eef8f6] py-16">
      <div className="mx-auto max-w-[1180px] px-5">
        
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold">
            Testimonials From Our Customers
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Hear from people who found opportunities through us.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  );
}