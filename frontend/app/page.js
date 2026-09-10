import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedVehicles from "@/components/home/FeaturedVehicles";
import HowItWorks from "@/components/home/HowItWorks";
import CTA from "@/components/home/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedVehicles />
      <HowItWorks />
      <CTA />
    </>
  );
}
