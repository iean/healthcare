"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import config from "@config/config.json";
import menu from "@config/menu.json";

const SimpleHeader = () => {
  const pathname = usePathname();
  const { main } = menu;
  const { base_url, logo, title } = config.site;

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between py-4">
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
          <nav>
            <ul className="flex space-x-6 font-semibold text-accent uppercase">
              {main.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.url}
                    className={`px-4 py-2 rounded-full transition-colors duration-200 ${
                      pathname === item.url ? "bg-primary text-white" : "hover:text-primary"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default SimpleHeader;
