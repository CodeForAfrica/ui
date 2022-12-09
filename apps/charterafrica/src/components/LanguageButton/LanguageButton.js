import Button from "@mui/material/Button";
import SvgIcon from "@mui/material/SvgIcon";
import { useRouter } from "next/router";
import React from "react";

// import LanguageIcon from "@/charterafrica/assets/icons/Type=translate, Size=48, Color=CurrentColor.svg";
import LanguageIcon from "@/charterafrica/assets/icons/Type=globe, Size=24, Color=CurrentColor.svg";
import DropdownMenu from "@/charterafrica/components/DropdownMenu";
import OpenCloseIcon from "@/charterafrica/components/OpenCloseIcon";
import Popper from "@/charterafrica/components/Popper";

function LanguageButton() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const router = useRouter();
  const { locales, locale } = router;
  const handleClick = (e) => {
    e.preventDefault();

    setOpen((prevOpen) => !prevOpen);
  };
  const handleClickMenuItem = (e) => {
    setOpen(false);
    const nextLocale = e.target.text;
    if (nextLocale !== locale) {
      const { pathname, asPath, query } = router;
      router.push({ pathname, query }, asPath, { locale: nextLocale });
    }
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  if (!locales.length) {
    return null;
  }
  const languages = locales.map((l) => ({ label: l }));
  return (
    <>
      <Button
        onClick={handleClick}
        endIcon={<OpenCloseIcon open={open} sx={{ color: "secondary.main" }} />}
        startIcon={
          <SvgIcon
            component={LanguageIcon}
            sx={{
              color: "secondary.main",
              display: "inline-flex",
              fill: "none",
            }}
          />
        }
        sx={{
          color: "secondary.main",
          display: "flex",
          // gap: 0.625,
          p: 1.25,
          textTransform: "uppercase",
        }}
        ref={anchorRef}
      >
        {locale}
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-start"
        role={undefined}
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [10, 0],
            },
          },
        ]}
        ClickAwayListenerProps={{ onClickAway: handleClose }}
        TransitionComponentProps={{
          style: {
            transformOrigin: "start top",
            width: "200px",
          },
        }}
      >
        <DropdownMenu items={languages} onClick={handleClickMenuItem} />
      </Popper>
    </>
  );
}

export default LanguageButton;
