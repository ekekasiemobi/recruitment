import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter} from "react-icons/fa";

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Jobs", href: "/jobs" },
];

const jobLinks = [
  { label: "Browse Jobs", href: "#" },
  { label: "Companies", href: "#" },
  { label: "Categories", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-10 md:grid-cols-1 lg:grid-cols-4">

         
          <div>
            <Link
              href="/"
              className="mb-5 flex items-center gap-2"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white">
                <span className="text-[10px] font-bold">HR</span>
              </div>

              <span className="text-sm font-semibold">
                Her Recruit
              </span>
            </Link>

            <p className="max-w-[280px] text-sm leading-6 text-white/55">
              Find the right opportunities, connect with great
              companies, and take the next step in your career.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <Link
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition hover:border-white/40 hover:text-white"
              >
                <FaFacebook className="h-4 w-4" />
              </Link>

              <Link
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition hover:border-white/40 hover:text-white"
              >
                <FaInstagram className="h-4 w-4" />
              </Link>

              <Link
                href="#"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition hover:border-white/40 hover:text-white"
              >
                <FaLinkedin className="h-4 w-4" />
              </Link>

              <Link
                href="#"
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition hover:border-white/40 hover:text-white"
              >
                <FaTwitter className="h-4 w-4" />
              </Link>
            </div>
          </div>

          
          <div>
            <h3 className="mb-5 text-sm font-semibold">
              Company
            </h3>

            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/55 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

         
          <div>
            <h3 className="mb-5 text-sm font-semibold">
              Job Categories
            </h3>

            <ul className="space-y-3">
              {jobLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/55 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

         
          <div>
            <h3 className="mb-3 text-sm font-semibold">
              Newsletter
            </h3>

            <p className="mb-5 text-sm leading-6 text-white/55">
              Subscribe to receive new job opportunities and
              career updates.
            </p>

            <form className="flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
              <input
                type="email"
                placeholder="Your email"
                required
                className="h-10 min-w-0 flex-1 rounded-md border border-white/15 bg-white/5 px-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#159a8c]"
              />

              <button
                type="submit"
                className="h-10 rounded-md bg-[#159a8c] px-4 text-sm font-medium text-white transition hover:bg-[#0f756a]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Her Recruit. All rights reserved.
          </p>

          <div className="flex gap-5">
            <Link
              href="#"
              className="hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              href="#"
              className="hover:text-white"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}