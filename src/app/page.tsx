import Navbar from '../components/layout/Header';
import PromoBanner from '../components/homepage/PromoBanner';
import ShopByConcern from '../components/homepage/ShopByConcern';
import BestSellers from '../components/homepage/BestSellers';
import Footer from '../components/layout/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      
      {/* 1. The Fixed Navbar */}
      <Navbar />

      {/* 2. Main Content Wrapper 
          CRITICAL: 'pt-16' adds 64px of space at the top.
          This ensures your Hero Image starts EXACTLY below the Navbar,
          not behind it.
      */}
      <div className="pt-16">
        
        {/* The Full Hero (Mobile/Desktop Images) */}
        <PromoBanner />
        
        {/* The Category Circles */}
        <ShopByConcern />
        
        {/* The Product List */}
        <BestSellers />
        
      </div>

      {/* 3. The Footer */}
      <Footer />
      
    </main>
  );
}