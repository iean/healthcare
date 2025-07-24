"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaPhoneAlt, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import config from "@config/config.json";
import menu from "@config/menu.json";

const SimpleHeader = () => {
  const pathname = usePathname();
  const { main } = menu;
  const { base_url, logo, title } = config.site;

  return (
    <header className="bg-white shadow border-b border-[#e5e5f7]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between py-6 md:py-8">
          {/* Left: Logo */}
          <Link href={base_url} className="flex items-center">
            <Image
              src={logo}
              alt={title}
              width={240}
              height={100}
              className="object-contain max-h-[100px] w-auto"
              priority
            />
          </Link>

          {/* Center: Navigation */}
          <nav className="hidden md:flex flex-1 justify-center">
            <ul className="flex space-x-6 font-semibold text-[#c69c6d] uppercase tracking-wide text-sm">
              {main.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.url}
                    className={`px-4 py-2 rounded-full transition duration-200 ${
                      pathname === item.url
                        ? "bg-[#5e3ea1] text-white"
                        : "hover:text-[#5e3ea1]"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right: Contact + Social */}
          <div className="hidden md:flex items-center space-x-6 border-l pl-6 border-[#ccc]">
            {/* Contact */}
            <div className="flex items-center space-x-2">
              <FaPhoneAlt className="text-[#218b61]" />
              <div className="text-sm leading-tight">
                <span className="text-xs font-semibold text-[#5e3ea1] uppercase block">
                  Contact Us
                </span>
                <span className="font-bold text-[#333] whitespace-nowrap">
                  01788 422422
                </span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 text-[#218b61] text-base">
              <Link
                href="https://facebook.com"
                target="_blank"
                aria-label="Facebook"
              >
                <FaFacebookF className="hover:text-[#5e3ea1] transition" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="hover:text-[#5e3ea1] transition" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SimpleHeader;
