import React from 'react';
import Link from 'next/link';
import { getHomepageConfig } from '../../app/lib/shopify-content';

export default async function OfferBanner() {
  const config = await getHomepageConfig();

  // If there's no desktop image uploaded, hide the banner completely
  if (!config?.offer_desktop) return null;

  const desktopImage = config.offer_desktop;
  // If no mobile image is uploaded, fallback to the desktop one
  const mobileImage = config.offer_mobile || desktopImage;
  
  // NEW: Grab the dynamic link from Shopify. If the box is empty, fallback to "/shop"
  const targetLink = config.offer_link || "/shop";

  return (
    <section className="py-12 container mx-auto px-4">
      {/* UPDATE: The Link now uses our dynamic targetLink variable! */}
      <Link href={targetLink} className="block relative w-full hover:shadow-xl transition duration-300">
        
        {/* Mobile Image (Hidden on Desktop) */}
        <div className="block md:hidden">
          <img src={mobileImage} alt="Special Offer" className="w-full h-auto object-cover rounded-3xl" />
        </div>

        {/* Desktop Image (Hidden on Mobile) */}
        <div className="hidden md:block">
          <img src={desktopImage} alt="Special Offer" className="w-full h-auto object-cover rounded-3xl" />
        </div>

      </Link>
    </section>
  );
}