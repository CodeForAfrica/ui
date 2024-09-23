import { Theme, SxProps } from "@mui/material/styles";
import type { LogoProps } from "@/techlabblog/components/Logo";
import type {
  Menu,
  SocialMediaLink,
} from "@/techlabblog/components/NavBarNavList";

interface NavBarProps {
  logo: LogoProps;
  menus?: Menu[];
  socialLinks?: SocialMediaLink[];
  sx?: SxProps<Theme>;
}

export default NavBarProps;
