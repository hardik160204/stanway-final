import Header from '../components/layout/Header';
import Hero from '../components/homepage/Hero';
import ShopByConcern from '../components/homepage/ShopByConcern';
import ScienceEducation from '../components/homepage/ScienceEducation';
import BestSellers from '../components/homepage/BestSellers';
import Reviews from '../components/homepage/Reviews';
import WhyStanway from '../components/homepage/WhyStanway';
// 1. Import the new section
import BlogSection from '../components/homepage/BlogSection'; 
import Footer from '../components/layout/Footer';
import PromoBanner from '../components/homepage/PromoBanner';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <ShopByConcern />
      <ScienceEducation />
      <BestSellers />
      <Reviews />
      <PromoBanner />
      
      {/* 2. Add it here, right above the Footer */}
      <BlogSection />
      
      <Footer />
    </main>
  );
}