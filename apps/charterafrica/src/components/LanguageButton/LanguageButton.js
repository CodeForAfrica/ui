import Button from "@mui/material/Button";
import SvgIcon from "@mui/material/SvgIcon";
import { useRouter } from "next/router";
import React, { useState } from "react";

import LanguageIcon from "@/charterafrica/assets/icons/Type=globe, Size=24, Color=CurrentColor.svg";
import DropdownMenu from "@/charterafrica/components/DropdownMenu";
import OpenCloseIcon from "@/charterafrica/components/OpenCloseIcon";
import Popper from "@/charterafrica/components/Popper";

const LanguageButton = React.forwardRef(function LanguageButton(props, ref) {
  const { languages } = props;
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);
  const router = useRouter();
  const { locale: currentLocale } = router;
  const handleClick = (e) => {
    e.preventDefault();

    setOpen((prevOpen) => !prevOpen);
  };
  const handleClickMenuItem = (e) => {
    setOpen(false);
    const clickedLabel = e.target.text;
    const clickedLanguage = languages.find((l) => l.label === clickedLabel);
    const clickedLocale = clickedLanguage?.locale;
    if (clickedLocale !== currentLocale) {
      const { asPath, pathname, query } = router;
      router.push({ pathname, query }, asPath, { locale: clickedLocale });
    }
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  if (!languages?.length) {
    return null;
  }
  return (
    <React.Fragment ref={ref}>
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
          p: 1.25,
          textTransform: "uppercase",
        }}
        ref={anchorRef}
      >
        {currentLocale}
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
        <DropdownMenu
          items={languages}
          onClick={handleClickMenuItem}
          selectedIndex={languages.findIndex((l) => l.locale === currentLocale)}
        />
      </Popper>
    </React.Fragment>
  );
});

export default LanguageButton;
