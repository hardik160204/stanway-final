import React from 'react';
import Link from 'next/link';
import { getHomepageConfig } from '../../app/lib/shopify-content';

export default async function OfferBanner() {
  const config = await getHomepageConfig();

  // If no desktop image, hide the whole section
  if (!config?.offer_desktop) return null;

  const desktopImage = config.offer_desktop;
  // Use mobile image if available, otherwise fallback to desktop
  const mobileImage = config.offer_mobile || desktopImage;

  return (
    <section className="py-12 container mx-auto px-4">
      <Link href="/shop" className="block relative w-full hover:shadow-xl transition duration-300">
        
        {/* === MOBILE VERSION === */}
        <div className="block md:hidden">
          <img 
            src={mobileImage} 
            alt="Special Offer" 
            className="w-full h-auto object-cover rounded-3xl"
          />
        </div>

        {/* === DESKTOP VERSION === */}
        <div className="hidden md:block">
          <img 
            src={desktopImage} 
            alt="Special Offer" 
            className="w-full h-auto object-cover rounded-3xl"
          />
        </div>

      </Link>
    </section>
  );
}