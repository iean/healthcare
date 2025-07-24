"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaFacebookF, FaLinkedinIn, FaPhoneAlt } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";
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
      <div className="max-w-screen-2xl mx-auto px-4 md:px-10">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href={base_url} className="flex items-center">
            <Image
              src={logo}
              alt={title}
              width={260}
              height={110}
              className="object-contain max-h-[90px] w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center justify-center flex-1 space-x-8 text-sm font-bold text-[#a57928] uppercase">
            {main.map((item, i) => (
              <li key={i}>
                <Link
                  href={item.url}
                  className={`px-4 py-2 rounded-full transition duration-200 ${
                    pathname === item.url
                      ? "bg-[#431c52] text-white"
                      : "hover:text-[#431c52]"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Contact + Socials */}
          <div className="hidden lg:flex items-center space-x-6 pl-6 border-l border-gray-300">
            <Link
              href={link}
              className="flex items-center text-sm font-semibold text-[#431c52] hover:underline"
            >
              <BiArrowBack className="mr-1" />
              {label}
            </Link>
            <div className="flex items-center space-x-2">
              <FaPhoneAlt className="text-[#a57928] text-lg" />
              <div>
                <p className="text-xs font-bold text-[#431c52]">Contact Us</p>
                <p className="text-sm font-semibold text-black leading-tight">
                  01788
                  <br />
                  422422
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-[#a57928] text-lg">
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

          {/* Mobile menu toggle */}
          <button
            className="inline-flex items-center justify-center text-gray-800 lg:hidden"
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

      {/* Mobile Menu */}
      {navOpen && (
        <div className="lg:hidden bg-white shadow-inner px-4 pb-4">
          <ul className="flex flex-col space-y-2 text-base font-medium text-gray-800">
            {main.map((item, i) => (
              <li key={i}>
                <Link
                  href={item.url}
                  onClick={() => setNavOpen(false)}
                  className={`block px-3 py-2 rounded-md transition ${
                    pathname === item.url
                      ? "text-white bg-[#431c52]"
                      : "hover:text-[#431c52]"
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
                  className="block text-center rounded-full bg-[#431c52] px-5 py-2 text-sm font-semibold text-white shadow-md hover:bg-opacity-90 mt-2 flex items-center justify-center"
                >
                  <BiArrowBack className="mr-1" />
                  {label}
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Bottom Gradient Strip */}
      <div className="h-3 bg-gradient-to-r from-[#431c52] via-[#6a2c70] to-[#431c52]" />
    </header>
  );
};

export default Header;
