import FeaturedTasks from "@/components/home/FeaturedTasks";
import HeroSection from "@/components/home/HeroSection";
import PopularCategories from "@/components/home/PopularCategories";
import TopFreelancers from "@/components/home/TopFreelancers";


export default function Home() {
  return (
    <main>
      <HeroSection/>
      <PopularCategories/>
      <FeaturedTasks/>
      <TopFreelancers/>
    </main>
  );
}
