"use server";

/* eslint-disable import/prefer-default-export */

import { PublishButton } from "@payloadcms/ui";
import React from "react";

import { canManagePages } from "@/trustlab/payload/access/abilities";

export async function PagesPublishButton(props) {
  const { user } = props;
  if (canManagePages(user)) {
    return <PublishButton label="Publish" />;
  }
  return null;
}
