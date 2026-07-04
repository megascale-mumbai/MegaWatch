"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();
  
  // Hide footer on editor pages
  if (pathname === "/editor" || pathname === "/editor/login") {
    return null;
  }
  
  return <Footer />;
}
