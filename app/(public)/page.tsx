import { blogPosts } from "./components/data/blog";
import Jobs from './components/jobs'
import Hero from './components/hero'

import BrowseCategories from "./components/sections/BrowseCategories";
import Testimonials from './components/sections/Testimonials';
import Blogs from './components/sections/Blogs';


export default function HomePage() {
  return (
    <>
     
      <Hero />

      <main>
        <Jobs />

        <BrowseCategories />
        <Testimonials/>
        <Blogs posts={blogPosts}/>


        
      </main>
    
      
    </>
  );
}