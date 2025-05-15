"use client";

import { RefreshRouteOnSave as PayloadLivePreview } from "@payloadcms/live-preview-react";
import { useRouter } from "next/navigation.js";
import React from "react";

function RefreshRouteOnSave() {
  const router = useRouter();

  return (
    <PayloadLivePreview
      refresh={() => router.refresh()}
      serverURL={process.env.NEXT_PUBLIC_APP_URL}
    />
  );
}
export default RefreshRouteOnSave;
