import React from "react";
import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import { Box } from "@mui/material";

const Login = () => {
  const clientId: string = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";
  const onSuccess = async (response: CredentialResponse) => {
    console.log(response);
    try {
      const res = await fetch("/api/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(response),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const onFailure = () => {
    console.error("Login failed:");
  };
  if (!clientId) {
    return null;
  }
  return (
    <Box
      display="flex"
      alignItems={"center"}
      justifyContent="center"
      sx={{
        margin: "auto",
        width: "100%",
        height: "100vh",
      }}
    >
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin onSuccess={onSuccess} onError={onFailure} />
      </GoogleOAuthProvider>
    </Box>
  );
};

export default Login;
