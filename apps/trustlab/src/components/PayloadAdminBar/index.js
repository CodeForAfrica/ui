"use client";

import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { PayloadAdminBar } from "@payloadcms/admin-bar";
import { useSelectedLayoutSegments, useRouter } from "next/navigation";
import React, { useState } from "react";

const collectionLabels = {
  pages: {
    plural: "Pages",
    singular: "Page",
  },
};

const StyledPayloadAdminBar = styled(PayloadAdminBar)(({ theme }) => ({
  backgroundColor: "transparent",
  padding: 0,
  position: "relative",
  zIndex: "unset",
  "& .controls": {
    fontWeight: 500,
    color: theme.palette.text.secondary,
  },
  "& .logo": {
    color: theme.palette.text.secondary,
  },
  "& .user": {
    color: theme.palette.text.secondary,
  },
}));

function Title() {
  return <Typography variant="body1">Dashboard</Typography>;
}

function AdminBar(props) {
  const { adminBarProps } = props || {};
  const segments = useSelectedLayoutSegments();
  const [show, setShow] = useState(false);
  const collection = collectionLabels[segments?.[1]] ? segments[1] : "pages";
  const router = useRouter();

  const onAuthChange = React.useCallback((user) => {
    setShow(Boolean(user?.id));
  }, []);

  return (
    <Box
      sx={{
        py: 2,
        bgcolor: (theme) => theme.palette.secondary.main,
        color: (theme) => theme.palette.text.secondary,
        display: show ? "block" : "none",
      }}
    >
      <Container>
        <StyledPayloadAdminBar
          {...adminBarProps}
          cmsURL={process.env.NEXT_PUBLIC_APP_URL}
          collectionSlug={collection}
          collectionLabels={{
            plural: collectionLabels[collection]?.plural || "Pages",
            singular: collectionLabels[collection]?.singular || "Page",
          }}
          logo={<Title />}
          onAuthChange={onAuthChange}
          onPreviewExit={() => {
            fetch("/preview/exit-preview").then(() => {
              router.push("/");
              router.refresh();
            });
          }}
        />
      </Container>
    </Box>
  );
}

export default AdminBar;
