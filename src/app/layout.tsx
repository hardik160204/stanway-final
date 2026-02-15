import type { Metadata, Viewport } from "next"; // Make sure Viewport is imported
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import CartDrawer from "../components/layout/CartDrawer";

const inter = Inter({ subsets: ["latin"] });

// ADD THIS VIEWPORT EXPORT
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Prevents zooming like an App
};

export const metadata: Metadata = {
  title: "Stanway Health",
  description: "Science-backed supplements.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}