"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Jobs",
    href: "/jobs",
  },
  {
    label: "About Us",
    href: "/about",
  },
  {
    label: "Contact Us",
    href: "/contact",
  },
];

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black">
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-5 sm:px-8 lg:px-10">
        
        
        <Link
          href="/"
          className="flex items-center gap-2 text-white"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white">
            <span className="text-[10px] font-bold">JP</span>
          </div>

          <span className="text-sm font-semibold tracking-wide">
            Job Portal
          </span>
        </Link>

        
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

       
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            Login
          </Link>

          <Button
  
            className="rounded-md bg-[#159a8c] px-5 text-sm font-medium text-white hover:bg-[#0f756a]"
          >
            <Link href="/signup">Register</Link>
          </Button>
        </div>

        
        <button
          type="button"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-md text-white md:hidden"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      
      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-black md:hidden">
          <nav className="mx-auto flex max-w-[1280px] flex-col px-5 py-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="border-b border-white/10 py-4 text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}

            <div className="flex items-center gap-4 pt-5">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-white/80"
              >
                Login
              </Link>

              <Button
                
                className="rounded-md bg-[#159a8c] px-5 text-sm text-white hover:bg-[#0f756a]"
              >
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}