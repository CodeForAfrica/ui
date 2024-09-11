import { Theme, SxProps } from "@mui/material/styles";
import { LogoProps } from "@/engineeringblog/components/Logo";
import type {
  Menu,
  SocialMediaLink,
} from "@/engineeringblog/components/NavBarNavList";

interface NavBarProps {
  logo: LogoProps;
  menus?: Menu[];
  socialLinks?: SocialMediaLink[];
  sx?: SxProps<Theme>;
}

export default NavBarProps;
