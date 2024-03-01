import {
  AppBar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import { Figure } from "@commons-ui/next";
import React, { FC, useState } from "react";
import { GoogleUser } from "@/outline-vpn/app/types";
import { useRouter } from "next/navigation";

interface Props extends GoogleUser {}

const Header: FC<Props> = (props) => {
  const { avatarUrl } = props ?? {};
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await fetch("/api/google", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    handleClose();
    router.push("/");
  };
  if (!avatarUrl) {
    return null;
  }
  return (
    <AppBar sx={{ backgroundColor: "common.white" }} position="sticky">
      <Toolbar
        sx={{
          margin: "auto",
          maxWidth: "1440px",
          width: "100%",
          backgroundColor: "common.white",
          px: { xs: 3, sm: 5, md: 8 },
          py: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Figure
          ImageProps={{
            src: "/cfa-logo.svg",
            alt: "cfa-logo",
          }}
          sx={{
            borderColor: "common.white",
            height: "60px",
            width: "136px",
          }}
        />
        <IconButton onClick={handleClick}>
          <Avatar src={avatarUrl} />
        </IconButton>
        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
