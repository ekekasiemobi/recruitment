import Nav from "./components/Nav";
import Footer from "./components/footer";

// import RecentJobs from "./components/sections/RecentJobs";
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

      <Footer />
    </>
  );
}