"use server";

/* eslint-disable import/prefer-default-export */

import { PreviewButton } from "@payloadcms/ui";
import React from "react";

import { canManagePages } from "@/trustlab/payload/access/abilities";

export async function PagesPreviewButton(props) {
  const { user } = props;
  if (!user) return null;
  const isEditor = canManagePages(user);
  if (!isEditor) return null;
  return <PreviewButton />;
}
