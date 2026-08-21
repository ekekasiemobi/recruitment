import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "./components/footer";
import Nav from "./components/nav";
// import Footer from "./components/footer";
// import "./globals.css";
type LayoutProps = {
  children: React.ReactNode
}



export default function RootLayout({ children }: LayoutProps) {
  return (
    <html
      lang="en">
      
    
      <body>
        <Nav />
        
        {children}

        <Footer />
        
      </body>
    </html>
  );
}