import config from "@config/config.json";
import Image from "next/image";
import Link from "next/link";

const Logo = ({ src }) => {
  const { base_url, logo, logo_width, logo_height, logo_text, title } =
    config.site;

  const width = parseInt(logo_width.replace("px", ""), 10) || 150;
  const height = parseInt(logo_height.replace("px", ""), 10) || 60;

  return (
    <Link href={base_url} className="navbar-brand inline-block">
      {src || logo ? (
        <div className="relative h-[48px] w-auto md:h-[60px]">
          <Image
            src={src || logo}
            alt={title}
            width={width * 2}
            height={height * 2}
            className="h-full w-auto object-contain"
            priority
          />
        </div>
      ) : logo_text ? (
        <span className="text-xl font-bold text-primary">{logo_text}</span>
      ) : (
        <span className="text-xl font-bold text-primary">{title}</span>
      )}
    </Link>
  );
};

export default Logo;
