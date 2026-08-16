import { BiLogoAdobe } from "react-icons/bi";
import { FaAws } from "react-icons/fa";
import {
  Si1Password,
  SiApplemusic,
  SiDropbox,
  SiFigma,
  SiGithub,
  SiIcloud,
  SiNetflix,
  SiNordvpn,
  SiNotion,
  SiSpotify,
  SiTodoist,
  SiYoutube,
  SiZoom,
} from "react-icons/si";

type BrandId =
  | "netflix"
  | "spotify"
  | "canva"
  | "nordvpn"
  | "adobe"
  | "icloud"
  | "aws"
  | "youtube-premium"
  | "dropbox"
  | "notion"
  | "figma"
  | "github"
  | "apple-music"
  | "1password"
  | "todoist"
  | "zoom";

interface BrandLogoProps {
  id: BrandId;
  size?: number;
  className?: string;
}

const brandColors: Record<BrandId, string> = {
  netflix: "#E50914",
  spotify: "#1DB954",
  canva: "#00C4CC",
  nordvpn: "#4687FF",
  adobe: "#FF0000",
  icloud: "#147CE5",
  aws: "#FF9900",
  "youtube-premium": "#FF0000",
  dropbox: "#0061FF",
  notion: "#FFFFFF",
  figma: "#F24E1E",
  github: "#F0F6FC",
  "apple-music": "#FA2D48",
  "1password": "#1B66FF",
  todoist: "#E44332",
  zoom: "#2D8CFF",
};

/** Consistent, recognizable marks for every supported subscription service. */
export default function BrandLogo({ id, size = 16, className }: BrandLogoProps) {
  if (id === "canva") {
    return (
      <img
        src="https://www.google.com/s2/favicons?domain=canva.com&sz=64"
        alt="Canva"
        width={size}
        height={size}
        className={`object-contain ${className ?? ""}`}
      />
    );
  }

  const props = { size, className, "aria-label": id, style: { color: brandColors[id] } };

  if (id === "netflix") return <SiNetflix {...props} />;
  if (id === "spotify") return <SiSpotify {...props} />;
  if (id === "nordvpn") return <SiNordvpn {...props} />;
  if (id === "adobe") return <BiLogoAdobe {...props} />;
  if (id === "icloud") return <SiIcloud {...props} />;
  if (id === "aws") return <FaAws {...props} />;
  if (id === "youtube-premium") return <SiYoutube {...props} />;
  if (id === "dropbox") return <SiDropbox {...props} />;
  if (id === "notion") return <SiNotion {...props} />;
  if (id === "figma") return <SiFigma {...props} />;
  if (id === "github") return <SiGithub {...props} />;
  if (id === "apple-music") return <SiApplemusic {...props} />;
  if (id === "1password") return <Si1Password {...props} />;
  if (id === "todoist") return <SiTodoist {...props} />;

  return <SiZoom {...props} />;
}
