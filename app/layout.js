import "../styles/style.scss";
import { Inter } from "next/font/google";
import SiteHeader from "@layouts/partials/SiteHeader";
import SiteFooter from "@layouts/partials/SiteFooter";
import Providers from "@layouts/partials/Providers";
import site from "@config/site.json";

/**
 * Inter only. The previous layout also loaded Playfair Display and
 * Merriweather; two extra font families cost render-blocking requests and the
 * decorative serifs were harder to read for an older audience.
 */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

// base_url is a placeholder until the domain resolves, so metadataBase is only
// set when it looks like a real URL - passing a placeholder string would throw.
const baseUrl = /^https?:\/\//.test(site.seo.base_url)
  ? site.seo.base_url
  : undefined;

export const metadata = {
  ...(baseUrl ? { metadataBase: new URL(baseUrl) } : {}),
  title: {
    default: site.seo.default_title,
    template: `%s | ${site.seo.site_name}`,
  },
  description: site.seo.default_description,
  applicationName: site.seo.site_name,
  authors: [{ name: site.seo.site_name }],
  openGraph: {
    type: "website",
    siteName: site.seo.site_name,
    title: site.seo.default_title,
    description: site.seo.default_description,
    locale: "en_GB",
    images: [{ url: site.seo.og_image, width: 1200, height: 630, alt: site.seo.site_name }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.default_title,
    description: site.seo.default_description,
    images: [site.seo.og_image],
  },
  icons: { icon: "/images/favicon.png" },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#000048",
  width: "device-width",
  initialScale: 1,
};

/**
 * Organisation schema.
 *
 * Deliberately NOT emitting MedicalBusiness/LocalBusiness with address or
 * geo data yet: the address and registration fields are still placeholders,
 * and publishing placeholder text as structured data would feed nonsense to
 * search engines. The richer schema is added per-page once real details exist.
 */
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.business.legal_name,
  alternateName: site.business.trading_name,
  telephone: site.business.phone,
  description: site.seo.default_description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB" className={inter.variable}>
      <body className="bg-body font-sans text-text antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <Providers>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
