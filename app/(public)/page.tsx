// import RecentJobs from "./components/sections/RecentJobs";

import Footer from "./components/Footer";
import Nav from "./components/Nav";
import BrowseCategories from "./components/sections/BrowseCategories";
import TopCompanies from "./components/sections/TopCompanies";

export default function HomePage() {
  return (
    <>
      <Nav />

      <main>
        {/* <RecentJobs /> */}

        <BrowseCategories />

        <TopCompanies />
      </main>

      <Footer/>
    </>
  );
}