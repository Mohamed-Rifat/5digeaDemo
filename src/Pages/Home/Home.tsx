import { motion } from "framer-motion";
import HeroSection from "../../Components/SectionsHome/HeroSection";
import ServicesSection from "../../Components/SectionsHome/ServicesSection";
import HowItWorks from "../../Components/SectionsHome/HowItWorks";
import WhyChooseUs from "../../Components/SectionsHome/WhyChooseUs";
import TestimonialsSection from "../../Components/SectionsHome/TestimonialsSection";
import FeaturedVendors from "../../Components/SectionsHome/FeaturedVendors";
import NewsletterSection from "../../Components/SectionsHome/NewsletterSection";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden"
    >
      <HeroSection />
      <ServicesSection />
      <HowItWorks />
      <WhyChooseUs />
      <FeaturedVendors />
      <TestimonialsSection />
      <NewsletterSection />
    </motion.div>
  );
}