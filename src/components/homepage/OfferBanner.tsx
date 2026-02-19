import React from 'react';
import Link from 'next/link';
import { getHomepageConfig } from '../../app/lib/shopify-content';

export default async function OfferBanner() {
  const config = await getHomepageConfig();

  if (!config?.offer_desktop) return null;

  const desktopImage = config.offer_desktop;
  const mobileImage = config.offer_mobile || desktopImage;
  
  // Use the link from Shopify, or default to /shop
  const targetLink = config.offer_link || "/shop";

  return (
    <section className="py-12 container mx-auto px-4">
      {/* UPDATE THIS LINE */}
      <Link href={targetLink} className="block relative w-full hover:shadow-xl transition duration-300">
        
        <div className="block md:hidden">
          <img src={mobileImage} alt="Special Offer" className="w-full h-auto object-cover rounded-3xl" />
        </div>

        <div className="hidden md:block">
          <img src={desktopImage} alt="Special Offer" className="w-full h-auto object-cover rounded-3xl" />
        </div>

      </Link>
    </section>
  );
}