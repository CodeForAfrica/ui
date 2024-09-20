import React, { useEffect } from "react";
import { useState } from "react";
import { Avatar, Menu, MenuItem, IconButton, Typography } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function UserAvatar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { data: session } = useSession();
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleMenuClick = (event: React.MouseEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    signOut();
  };
  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [router, session]);

  if (!session) {
    return null;
  }

  return (
    <>
      <IconButton onClick={handleMenuClick} size="small" sx={{ p: 2 }}>
        <Avatar
          alt={session?.user?.name || "Name"}
          src={session.user?.image ?? undefined}
        />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleLogout}>
          <Typography variant="inherit">Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
