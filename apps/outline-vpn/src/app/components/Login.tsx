"use client";
import React from "react";
import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";

const Login = () => {
  const clientId: string = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";
  const router = useRouter();
  const onSuccess = async (response: CredentialResponse) => {
    try {
      const res = await fetch("/api/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(response),
      });
      const data = await res.json();
      if (data.email) {
        router.push("/dashboard");
      }
    } catch (error) {
      router.push("/403");
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
        <GoogleLogin
          width={400}
          size="large"
          onSuccess={onSuccess}
          onError={onFailure}
        />
      </GoogleOAuthProvider>
    </Box>
  );
};

export default Login;
