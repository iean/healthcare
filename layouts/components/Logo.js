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
        <Image
          src={src || logo}
          alt={title}
          width={180}
          height={80}
          className="h-[60px] md:h-[80px] w-auto object-contain"
          priority
        />
      ) : logo_text ? (
        <span className="text-2xl font-bold text-primary">{logo_text}</span>
      ) : (
        <span className="text-2xl font-bold text-primary">{title}</span>
      )}
    </Link>
  );
};

export default Logo;
