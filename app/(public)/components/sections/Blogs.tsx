"use client"
import { useState } from "react";
import BlogCard from "../cards/BlogCard";


export default function BlogSection({posts}: {posts: any[]}) {
    const [showAll, setShowAll] = useState(false)
    const displayedPosts =showAll? posts: posts.slice(0,2)
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-10">
        <div className="mb-10 flex items-end justify-between">
          <div>
            
            <h2 className="mt-2 text-3xl font-bold text-[#171717]">
              News & Blog
            </h2>
            
            <p className=" text-sm font-medium text-[#159a8c]">
              Our Blog
            </p>
            <div className="text-blue-600 font-medium">
                {!showAll &&
                <button
                onClick={()=> setShowAll(true)}className="hover:underline"
                >
                    View All
                </button>
            }
            {showAll &&
                <button
                onClick={()=> setShowAll(false)}className="hover:underline"
               >
                    Show less
                </button>
            }

            </div>
            
                


          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-1 lg:grid-cols-2">
          {displayedPosts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
            />
          ))}
        </div>
      </div>
    </section>
  );
}