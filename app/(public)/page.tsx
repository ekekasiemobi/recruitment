
import Jobs from './components/jobs'
import Hero from './components/hero'

import BrowseCategories from "./components/sections/BrowseCategories";


export default function HomePage() {
  return (
    <>
     
      <Hero />

      <main>
        <Jobs />

        <BrowseCategories />


        
      </main>
    
      
    </>
  );
}