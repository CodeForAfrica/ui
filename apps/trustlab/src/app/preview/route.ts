import type { PayloadRequest } from "payload";
import { getPayload } from "payload";

import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

import configPromise from "@payload-config";
import { canManageContent } from "@/trustlab/payload/access/abilities";

export async function GET(
  req: {
    cookies: {
      get: (name: string) => {
        value: string;
      };
    };
  } & Request,
): Promise<Response> {
  const payload = await getPayload({ config: configPromise });
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path");
  const slug = searchParams.get("slug");

  if (!path || !slug) {
    return new Response("Insufficient search params", { status: 404 });
  }

  if (!path.startsWith("/")) {
    return new Response(
      "This endpoint can only be used for relative previews",
      { status: 500 },
    );
  }

  let authResult;

  try {
    authResult = await payload.auth({
      req: req as unknown as PayloadRequest,
      headers: req.headers,
    });
  } catch (error) {
    payload.logger.error(
      { err: error },
      "Error verifying token for live preview",
    );
    return new Response("You are not allowed to preview this page", {
      status: 403,
    });
  }

  const draft = await draftMode();

  if (!authResult) {
    draft.disable();
    return new Response("You are not allowed to preview this page", {
      status: 403,
    });
  }

  const user = authResult.user || authResult;

  const isEditor = canManageContent(user);
  if (!isEditor) {
    draft.disable();
    return new Response("You are not allowed to preview this page", {
      status: 403,
    });
  }

  draft.enable();

  redirect(path);
}
