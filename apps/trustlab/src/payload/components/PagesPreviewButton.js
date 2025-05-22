"use server";

/* eslint-disable import/prefer-default-export */

import { PreviewButton } from "@payloadcms/ui";
import React from "react";

import { canManagePages } from "@/trustlab/payload/access/abilities";

export async function PagesPreviewButton(props) {
  const { user } = props;
  if (!user) return null;
  const isAllowed = canManagePages(user);
  if (!isAllowed) return null;
  return <PreviewButton />;
}
