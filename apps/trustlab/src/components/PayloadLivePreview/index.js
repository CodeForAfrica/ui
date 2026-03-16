"use client";

import { RefreshRouteOnSave as PayloadLivePreview } from "@payloadcms/live-preview-react";
import { useRouter } from "next/navigation";
import React from "react";

import { site } from "@/trustlab/utils";

function RefreshRouteOnSave() {
  const router = useRouter();

  return (
    <PayloadLivePreview refresh={() => router.refresh()} serverURL={site.url} />
  );
}
export default RefreshRouteOnSave;
