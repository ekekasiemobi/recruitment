export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
};

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "how-to-write-a-winning-resume",
    title: "How to Write a Winning Resume",
    excerpt:
      "Learn how to create a professional resume that gets the attention of recruiters.",
    category: "Career Advice",
    author: "Job Portal",
    date: "Aug 12, 2026",
    readTime: "5 min read",
    image: "/img5.jpg",
  },
  {
    id: 2,
    slug: "tips-for-a-successful-job-interview",
    title: "Tips for a Successful Job Interview",
    excerpt:
      "Prepare for your next interview with practical tips that can help you stand out.",
    category: "Career Advice",
    author: "Job Portal",
    date: "Aug 8, 2026",
    readTime: "4 min read",
    image: "/img5.jpg",
  },
  {
    id: 3,
    slug: "how-to-find-your-dream-job",
    title: "How to Find Your Dream Job",
    excerpt:
      "Discover practical strategies for finding opportunities that match your goals and skills.",
    category: "Job Search",
    author: "Job Portal",
    date: "Aug 4, 2026",
    readTime: "6 min read",
    image: "/img5.jpg",
  },
];