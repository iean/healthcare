"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaFacebookF, FaLinkedinIn, FaPhoneAlt } from "react-icons/fa";
import config from "@config/config.json";
import menu from "@config/menu.json";

const Header = ({ menuItems }) => {
  const pathname = usePathname();
  const { base_url, logo, title } = config.site;
  const main = menuItems || menu.main;
  const { enable, label, link } = config.nav_button;

  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "shadow-md bg-white/95 backdrop-blur" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href={base_url} className="flex items-center">
            <Image
              src={logo}
              alt={title}
              width={180}
              height={100}
              className="object-contain max-h-[70px] w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center space-x-8 text-base font-semibold text-accent uppercase">
            {main.map((item, i) => (
              <li key={i}>
                <Link
                  href={item.url}
                  className={`px-4 py-2 rounded-full transition duration-200 ${
                    pathname === item.url
                      ? "bg-primary text-white"
                      : "hover:text-primary"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side: Contact + Social */}
          <div className="hidden md:flex items-center space-x-6 pl-6 border-l border-gray-300">
            {/* Contact */}
            <div className="flex items-center space-x-2">
              <FaPhoneAlt className="text-accent text-lg" />
              <div>
                <p className="text-xs font-bold text-primary">Contact Us</p>
                <p className="text-sm font-semibold text-gray-800">
                  0207 798 1182
                </p>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center space-x-4 text-accent text-lg">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="inline-flex items-center justify-center text-gray-800 md:hidden"
            onClick={() => setNavOpen(!navOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor">
              {navOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {navOpen && (
        <div className="md:hidden bg-white shadow-inner px-4 pb-4">
          <ul className="flex flex-col space-y-2 text-base font-medium text-gray-800">
            {main.map((item, i) => (
              <li key={i}>
                <Link
                  href={item.url}
                  onClick={() => setNavOpen(false)}
                  className={`block px-3 py-2 rounded-md transition ${
                    pathname === item.url
                      ? "text-primary bg-primary/10"
                      : "hover:text-accent"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            {enable && (
              <li>
                <Link
                  href={link}
                  onClick={() => setNavOpen(false)}
                  className="block text-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-md hover:bg-opacity-90 mt-2"
                >
                  {label}
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
