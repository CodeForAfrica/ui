import { Section } from "@commons-ui/core";
import { NextImageButton } from "@commons-ui/next";
import { Menu } from "@hurumap/next";
import {
  Grid,
  Slide,
  Dialog,
  DialogActions,
  IconButton,
  DialogContent,
  SvgIcon,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useState } from "react";

import SearchIcon from "@/climatemappedafrica/assets/icons/search-open.svg";
import MenuCloseIcon from "@/climatemappedafrica/assets/menu_close.svg";
import MenuOpenIcon from "@/climatemappedafrica/assets/menu_open.svg";
import DropdownSearch from "@/climatemappedafrica/components/DropdownSearch";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" timeout={1000} ref={ref} {...props} />;
});

function MobileNavigation({
  drawerLogo,
  explorePagePath,
  logo,
  menus,
  socialLinks,
  sx,
  ...props
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const theme = useTheme();

  const handleClickOpen = (e) => {
    e?.preventDefault();
    setOpen(true);
  };
  const handleClose = (e) => {
    e?.preventDefault();
    setOpen(false);
  };

  const handleClickSearch = (code) => {
    setOpen(false);
    if (code) {
      router.push(`/${explorePagePath}/${code}`);
    }
  };

  return (
    <Grid container alignItems="center" justifyContent="space-between" sx={sx}>
      <Grid item xs={10}>
        <NextImageButton
          {...logo}
          href="/"
          style={{
            height: 44,
            width: "auto",
          }}
          priority
        />
      </Grid>
      <Grid item>
        <IconButton
          aria-label="Open drawer"
          size="medium"
          onClick={handleClickOpen}
          sx={({ palette }) => ({
            color: palette.grey.dark,
            padding: 0,
          })}
        >
          <SvgIcon
            component={MenuOpenIcon}
            sx={{
              fontSize: 32,
            }}
          />
        </IconButton>
      </Grid>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={({ palette }) => ({
          padding: 0,
          "& .MuiDialog-paper": {
            background: palette.primary.main,
            position: "absolute",
            left: 0,
            top: 0,
            overflow: "hidden",
          },
        })}
      >
        <DialogActions
          sx={{
            padding: 0,
          }}
        >
          <Section
            fixed={false}
            sx={{
              padding: `0 ${theme.typography.pxToRem(20)}`,
            }}
          >
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              sx={({ typography, palette }) => ({
                borderBottom: `2px solid ${palette.background.default}`,
                padding: `${typography.pxToRem(10)} 0`,
              })}
            >
              <Grid item xs={10}>
                <NextImageButton
                  {...logo}
                  href="/"
                  style={{
                    height: 44,
                    width: "auto",
                  }}
                  priority
                />
              </Grid>
              <Grid item>
                <IconButton
                  aria-label="Close drawer"
                  size="medium"
                  onClick={handleClose}
                  sx={{
                    color: "text.secondary",
                  }}
                >
                  <SvgIcon
                    component={MenuCloseIcon}
                    sx={{
                      fontSize: 32,
                    }}
                  />
                </IconButton>
              </Grid>
            </Grid>
          </Section>
        </DialogActions>
        <DialogContent
          sx={({ typography }) => ({
            overflow: "hidden",
            padding: `${typography.pxToRem(40)} 0`,
          })}
        >
          <Section
            fixed={false}
            sx={{
              padding: `0 ${theme.typography.pxToRem(20)}`,
            }}
          >
            <Menu
              explorePagePath={explorePagePath}
              links={menus}
              socialLinks={socialLinks}
              LinkProps={{
                sx: {
                  margin: `${theme.typography.pxToRem(10)} 0`,
                  color: "text.secondary",
                },
              }}
            >
              <DropdownSearch
                IconButtonProps={{
                  sx: ({ palette }) => ({
                    borderRadius: "50%",
                    border: `2px solid ${palette.background.default}`,
                  }),
                }}
                InputBaseProps={{
                  sx: ({ palette, typography }) => ({
                    border: `2px solid ${palette.background.default}`,
                    backgroundColor: palette.background.default,
                    height: typography.pxToRem(44), // match search button
                    margin: 0,
                  }),
                }}
                TypographyProps={{
                  sx: ({ palette }) => ({
                    color: palette.text.secondary,
                  }),
                }}
                href={explorePagePath}
                icon={SearchIcon}
                label="Search for a location"
                onClick={handleClickSearch}
                sx={{
                  mb: 1,
                  mt: 2,
                  order: 0,
                }}
                {...props}
              />
            </Menu>
          </Section>
        </DialogContent>
      </Dialog>
    </Grid>
  );
}

MobileNavigation.propTypes = {
  drawerLogo: PropTypes.shape({}),
  logo: PropTypes.shape({}),
  menus: PropTypes.arrayOf(PropTypes.shape({})),
  socialLinks: PropTypes.arrayOf(PropTypes.shape({})),
};

export default MobileNavigation;
