import { blogPosts } from "./components/data/blog";
import Jobs from './components/jobs'
import Hero from './components/hero'

import BrowseCategories from "./components/sections/BrowseCategories";
import Testimonials from './components/sections/Testimonials';
import Blogs from './components/sections/Blogs';
import CompanyFeature from "./components/sections/CompanyFeature";
import FutureBanner from "./components/sections/FutureBanner";


export default function HomePage() {
  return (
    <>
     
      <Hero />

      <main>
        <Jobs />

        <BrowseCategories />

        <CompanyFeature/>
        <FutureBanner/>
        <Testimonials/>
        <Blogs posts={blogPosts}/>


        
      </main>
    
      
    </>
  );
}