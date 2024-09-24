import React, { useEffect } from "react";
import { Box, Button, Typography, SvgIcon } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import GoogleIcon from "@/vpnmanager/assets/icons/Type=google, Size=24, Color=currentColor.svg";
import { useRouter } from "next/router";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);
  const handleGoogleLogin = () => {
    signIn("google");
  };
  if (router.query?.error) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h4" gutterBottom>
          Unauthorized Access
        </Typography>
        <Typography variant="body1">
          You are not allowed to sign in with this account. Please contact
          administrator and try again
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/login")}
          sx={{
            mt: 2,
            textTransform: "none",
          }}
        >
          Try again
        </Button>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5" // Optional background color
    >
      <Typography variant="h4" gutterBottom>
        Welcome to VPN Manager
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={
          <SvgIcon
            inheritViewBox
            component={GoogleIcon}
            sx={{
              color: "text.primary",
              fill: "none",
              height: 25,
              width: 25,
            }}
          />
        }
        onClick={handleGoogleLogin}
        sx={{
          mt: 2,
          textTransform: "none", // Disable uppercase transformation
        }}
      >
        Login with Google
      </Button>
    </Box>
  );
}
