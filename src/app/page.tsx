import Navbar from '../components/layout/Header';
import PromoBanner from '../components/homepage/PromoBanner';
import ShopByConcern from '../components/homepage/ShopByConcern';
import BestSellers from '../components/homepage/BestSellers';
import ScienceSection from '../components/homepage/ScienceEducation'; // <--- IMPORT THIS
import Footer from '../components/layout/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-16">
        <PromoBanner />
        <ShopByConcern />
        <ScienceSection />  {/* <--- ADD THIS HERE */}
        <BestSellers />
      </div>

      <Footer />
    </main>
  );
}