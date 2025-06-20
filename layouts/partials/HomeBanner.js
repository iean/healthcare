import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";

const HomeBanner = ({ banner }) => {
  return (
    <section
      className="relative z-10 h-[85vh] pt-[100px] md:pt-[120px] overflow-hidden text-white"
      style={{
        backgroundImage: `url('${banner.bgImage || "/images/banner.jpg"}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-secondary opacity-80 z-0"></div>

      {/* Centered Content */}
      <div className="container relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        <h1 className="font-primary font-bold text-4xl md:text-5xl text-white">
          {banner.title}
        </h1>
        <p className="mt-4 text-lg font-light text-white max-w-2xl">
          {markdownify(banner.content)}
        </p>

        {banner.button.enable && (
          <Link
            className="btn btn-primary mt-6 inline-block rounded-full bg-primary px-6 py-3 text-white shadow hover:bg-opacity-90"
            href={banner.button.link}
            rel={banner.button.rel}
          >
            {banner.button.label}
          </Link>
        )}
      </div>
    </section>
  );
};

export default HomeBanner;
