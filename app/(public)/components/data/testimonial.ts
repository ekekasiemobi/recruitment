export type Testimonial = {
  id: number;
  rating: number;
  title: string;
  content: string;
  name: string;
  role: string;
  avatar?: string;
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    rating: 5,
    title: "Amazing Service",
    content:
      "This platform helped me find the perfect job in less than two weeks.",
    name: "Maria Silva",
    role: "Product Designer",
  },
  {
    id: 2,
    rating: 5,
    title: "Everything Simple",
    content:
      "The application process was smooth and easy to follow.",
    name: "John Smith",
    role: "Frontend Developer",
  },
  {
    id: 3,
    rating: 5,
    title: "Awesome Platform",
    content:
      "One of the best job portals I have ever used.",
    name: "Sarah Johnson",
    role: "Marketing Specialist",
  },
];