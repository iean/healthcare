"use client";

import Image from "next/image";
import Link from "next/link";
import Social from "@components/Social";
import config from "@config/config.json";
import social from "@config/social.json";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#431c63] via-[#6e296d] to-[#ec9e57] text-white">
      {/* Top White Section */}
      <div className="relative z-10 bg-white text-black rounded-t-2xl shadow-lg px-6 py-10 max-w-7xl mx-auto mt-[-20px]">
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8">
          {/* Logo & Contact */}
          <div className="space-y-3">
            <Image
              src={config.site.logo}
              alt="Heart & Haven Care"
              width={140}
              height={60}
            />
            <div className="text-sm">
              <p>
                <strong>T:</strong> 0123 456 7890
              </p>
              <p>
                <strong>M:</strong> 0789 123 4567
              </p>
              <p>
                <strong>E:</strong>{" "}
                <a
                  href="mailto:info@heartandhavencare.co.uk"
                  className="text-[#5e3ea1]"
                >
                  info@heartandhavencare.co.uk
                </a>
              </p>
              <p>
                <strong>E:</strong>{" "}
                <a
                  href="mailto:support@heartandhavencare.co.uk"
                  className="text-[#5e3ea1]"
                >
                  support@heartandhavencare.co.uk
                </a>
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="text-[#431c63]">
            <h4 className="font-semibold text-lg mb-2">Address</h4>
            <p className="text-sm">
              Haven House, <br />
              101 Care Lane, <br />
              London, HA1 2BC
            </p>
          </div>

          {/* Opening Hours */}
          <div className="text-[#431c63]">
            <h4 className="font-semibold text-lg mb-2">Opening Hours</h4>
            <p className="text-sm">
              Mon–Fri: 9:00am – 5:30pm <br />
              Saturday: 10:00am – 1:00pm <br />
              Sunday: Closed
            </p>
          </div>

          {/* Social */}
          <div className="text-[#431c63]">
            <h4 className="font-semibold text-lg mb-2">Follow Us</h4>
            <Social source={social} className="flex space-x-4 mt-2" />
          </div>
        </div>
      </div>

      {/* CQC Info Section */}
      <div className="bg-white text-black py-6 shadow-inner max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Image
              src="/images/cqc-logo.png"
              alt="CQC"
              width={60}
              height={60}
            />
            <div className="text-sm">
              <p>
                CQC regulates Heart & Haven Care Ltd to provide care at{" "}
                <strong>Heart & Haven Care - Main Office</strong>
              </p>
              <p className="text-red-600 font-semibold">
                We haven't inspected this service yet
              </p>
              <p className="text-green-600">
                ✓ We checked this service was likely to be safe, effective,
                caring, responsive and well-led during registration.
              </p>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              href="/registration-details"
              className="inline-block bg-green-600 text-white px-4 py-2 rounded font-semibold text-sm"
            >
              See registration details
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="border-t border-white/30 py-4 text-sm text-center">
        <Link href="/privacy-policy" className="mx-2 hover:underline">
          Privacy Policy
        </Link>
        |
        <Link href="/terms-and-conditions" className="mx-2 hover:underline">
          Terms and Conditions
        </Link>
        |
        <Link href="/request-data" className="mx-2 hover:underline">
          Request Personal Data
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
