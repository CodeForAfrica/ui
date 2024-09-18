import { StyledLink as Link } from "@commons-ui/next";
import { Stack, SvgIcon } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import Image, { ImageProps } from "next/image";
import React from "react";

import PreviousIcon from "@/engineeringblog/assets/icons/Type=chevron-left, Size=24, Color=CurrentColor.svg";

export interface LogoProps extends ImageProps {
  href?: string;
  sx?: SxProps<Theme>;
  title?: string;
}

const Logo = React.forwardRef(function Logo(
  props: LogoProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {
    alt,
    href: hrefProp,
    src,
    sx,
    title,
    ...other // All next/image supported props
  } = props;
  const logoHref = title?.length ? "https://codeforafrica.org" : hrefProp;

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        color: "inherit",
        alignItems: "center",
        position: "relative",
        ...sx,
      }}
      ref={ref}
    >
      <Link
        color="inherit"
        href={logoHref}
        sx={(theme: Theme) => ({
          display: "flex",
          "&>svg,&>img": {
            transition: theme.transitions.create(["opacity", "transform"]),
          },
          "&:hover": {
            "&>svg,&>img": {
              opacity: 0.65,
            },
            "&>svg": {
              transform: "translateX(-5px)",
            },
          },
        })}
      >
        {title?.length ? (
          <SvgIcon
            sx={{
              fill: { xs: "none" },
              fontSize: 32,
              left: -24,
              opacity: 0,
              position: "absolute",
              right: 0,
            }}
          >
            <PreviousIcon />
          </SvgIcon>
        ) : null}
        <Image
          {...other}
          alt={alt}
          priority
          src={src}
          style={{
            height: 32,
            width: "auto",
            ...other?.style,
          }}
        />
      </Link>
      {title?.length ? (
        <Link
          color="text.primary"
          href="/"
          textTransform="uppercase"
          typography="h4"
          underline="none"
          sx={({ transitions, typography }: Theme) => ({
            display: "flex",
            fontFamily: typography.fontFamilyMono,
            transition: transitions.create(["opacity", "transform"]),
            "&:hover": {
              opacity: 0.65,
            },
          })}
        >
          Technology
        </Link>
      ) : null}
    </Stack>
  );
});

export default Logo;
