"use server";

/* eslint-disable import/prefer-default-export */

import { PreviewButton } from "@payloadcms/ui";
import React from "react";

import { canEditContent } from "@/trustlab/payload/access/abilities";

export async function PagesPreviewButton(props) {
  const { user } = props;
  if (!user) return null;
  const isEditor = canEditContent(user);
  if (!isEditor) return null;
  return <PreviewButton />;
}
