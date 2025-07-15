import "../styles/style.scss";
import Footer from "@layouts/partials/Footer";
import Providers from "@layouts/partials/Providers";
import { Inter, Merriweather, Playfair_Display } from "next/font/google";

// Load fonts using next/font
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-merriweather",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata = {
  title: "Heart and Haven Care",
  description: "Professional caregiving services",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${merriweather.variable}`}
    >
      <body className="font-sans text-brandText antialiased">
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
