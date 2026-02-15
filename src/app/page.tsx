import Navbar from '../components/layout/Header';
import PromoBanner from '../components/homepage/PromoBanner';
import ShopByConcern from '../components/homepage/ShopByConcern';
import BestSellers from '../components/homepage/BestSellers';
import ScienceSection from '../components/homepage/ScienceEducation'; // <--- IMPORT THIS
import Footer from '../components/layout/Footer';
import BlogSection from '../components/homepage/BlogSection';
import Reviews from '../components/homepage/Reviews';
import OfferBanner from '../components/homepage/OfferBanner';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-16">
        <PromoBanner />
        <ShopByConcern />
        <ScienceSection />  {/* <--- ADD THIS HERE */}
        <BestSellers />
        <OfferBanner />
        <Reviews /> 
        <BlogSection />   {/* 5. The Blog Grid */}
      </div>

      <Footer />
    </main>
  );
}