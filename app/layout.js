import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import ConditionalFooter from "@/components/ui/ConditionalFooter";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "MegaWatch | Luxury Dynamic Watches",
  description: "Experience the pinnacle of watch craftsmanship and customization.",
};

import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { UserProvider } from "@/context/UserContext";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className={`${poppins.variable} min-h-full flex flex-col bg-background text-foreground`} suppressHydrationWarning>
        <UserProvider>
          <CartProvider>
            <WishlistProvider>
              {children}
            </WishlistProvider>
          </CartProvider>
        </UserProvider>
        <ConditionalFooter />
      </body>
    </html>
  );
}
