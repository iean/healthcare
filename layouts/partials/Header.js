"use client";

import Logo from "@components/Logo";
import menu from "@config/menu.json";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import config from "../../config/config.json";

const Header = () => {
  const pathname = usePathname();
  const { main } = menu;
  const [navOpen, setNavOpen] = useState(false);
  const { logo } = config.site;
  const { enable, label, link } = config.nav_button;

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-secondary shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:py-6">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Logo src={logo} />
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden flex-1 justify-center space-x-10 text-base font-medium text-white md:flex">
          {main.map((menuItem, i) =>
            menuItem.hasChildren ? (
              <li className="group relative" key={i}>
                <span className="inline-flex cursor-pointer items-center gap-1">
                  {menuItem.name}
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5.23 7.21L10 12l4.77-4.79-1.41-1.42L10 9.17 6.64 5.79 5.23 7.21z" />
                  </svg>
                </span>
                <ul className="absolute left-0 mt-3 hidden w-44 rounded-md bg-white py-2 shadow-lg z-50 group-hover:block">
                  {menuItem.children.map((child, j) => (
                    <li key={j}>
                      <Link
                        href={child.url}
                        className="block px-4 py-2 text-secondary hover:bg-gray-100"
                      >
                        {child.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={i}>
                <Link
                  href={menuItem.url}
                  className={`hover:text-primary transition ${
                    pathname === menuItem.url
                      ? "text-primary font-semibold"
                      : ""
                  }`}
                >
                  {menuItem.name}
                </Link>
              </li>
            ),
          )}
        </ul>

        {/* CTA Button */}
        {enable && (
          <div className="hidden md:block">
            <Link
              href={link}
              className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white hover:bg-opacity-90"
            >
              {label}
            </Link>
          </div>
        )}

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setNavOpen(!navOpen)}
          className="md:hidden text-white"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor">
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
      </nav>

      {/* Mobile Menu Dropdown */}
      {navOpen && (
        <div className="bg-secondary md:hidden">
          <ul className="flex flex-col items-center space-y-4 px-6 py-6 text-white">
            {main.map((item, i) => (
              <li key={i}>
                <Link href={item.url} onClick={() => setNavOpen(false)}>
                  {item.name}
                </Link>
              </li>
            ))}
            {enable && (
              <li>
                <Link
                  href={link}
                  className="inline-block rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white"
                  onClick={() => setNavOpen(false)}
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
