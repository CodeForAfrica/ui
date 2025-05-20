"use server";

/* eslint-disable import/prefer-default-export */

import { PublishButton } from "@payloadcms/ui";
import React from "react";

import { canPublish } from "@/trustlab/payload/access/abilities";

export async function PagesPublishButton(props) {
  const { user } = props;
  if (!user) return null;
  const isPublisher = canPublish(user);
  if (!isPublisher) return null;
  return <PublishButton label="Publish" />;
}
