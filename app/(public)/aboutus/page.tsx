import { blogPosts } from "../components/data/blog";
import { howItWorksSteps } from "../components/data/how-it-works";
import Blogs from "../components/sections/Blogs";
import HowItWorksCard from "./components/HowItWorksCard";
import FAQSection from "./components/faq";
import Hero2 from "../components/hero2";
import VideoSection from "../components/sections/VideoSection";
import BestCompanies from "../components/sections/BestCompanies";
import AboutIntro from "../components/sections/AboutIntro";

export default function AboutUs() {
  return (
    <>
    <Hero2 title="About Us" />
    <AboutIntro/>
    <section className="bg-white py-16">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-10">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-[#171717]">
            How It Works
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Finding your next opportunity is simple. Follow these
            four steps to get started.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorksSteps.map((step) => (
            <HowItWorksCard
              key={step.id}
              step={step} />

          ))}

        </div>
        <Blogs posts={blogPosts}/>

        <div className="mt-10">
          <FAQSection />
        </div>
        
        <VideoSection/>
        <BestCompanies/>
        <Blogs posts={blogPosts} />
      </div>
    </section>
    </>
  );
}