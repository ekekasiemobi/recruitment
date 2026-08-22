import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { BlogPost } from "../data/blog";



type BlogCardProps = {
  post: BlogPost;
};

export default function BlogCard({
  post,
}: BlogCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-[#e6e9e8] bg-white transition-all duration-200 hover:-translate-y-1 hover:border-[#159a8c]/30 hover:shadow-lg">
      {/* Image */}
      <Link
        href={`/blog/${post.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-[#eef8f6]"
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute left-4 top-4">
          <span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-medium text-[#159a8c] shadow-sm">
            {post.category}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <CalendarDays className="h-3.5 w-3.5" />
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>

        <Link href={`/blog/${post.slug}`}>
          <h3 className="mt-3 line-clamp-2 text-base font-semibold leading-6 text-[#171717] transition-colors group-hover:text-[#159a8c]">
            {post.title}
          </h3>
        </Link>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
          {post.excerpt}
        </p>

        <Link
          href={`/blog/${post.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#159a8c]"
        >
          Read More
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
}