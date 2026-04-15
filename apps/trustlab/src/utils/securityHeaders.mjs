function getContentSecurityPolicy(nodeEnv) {
  const isProduction = nodeEnv === "production";
  const connectSrc = ["'self'", "https:"];
  const scriptSrc = ["'self'", "'unsafe-inline'", "https:"];

  // Next.js dev tooling relies on websocket connections and eval-based refresh
  // helpers. Keep those allowances scoped to non-production environments.
  if (!isProduction) {
    connectSrc.push("http:", "ws:", "wss:");
    scriptSrc.splice(1, 0, "'unsafe-eval'");
  }

  return [
    "default-src 'self'",
    "base-uri 'self'",
    `connect-src ${connectSrc.join(" ")}`,
    "font-src 'self' data: https:",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "frame-src 'self' https:",
    "img-src 'self' data: blob: https:",
    "media-src 'self' blob: https:",
    "object-src 'none'",
    // Inline script/style support is still required by the current app and MUI
    // setup, so this policy tightens sources without breaking rendering.
    `script-src ${scriptSrc.join(" ")}`,
    "style-src 'self' 'unsafe-inline' https:",
  ].join("; ");
}

export function getSecurityHeaders(nodeEnv = process.env.NODE_ENV) {
  const headers = [
    {
      key: "Content-Security-Policy",
      value: getContentSecurityPolicy(nodeEnv),
    },
    {
      key: "Permissions-Policy",
      value: "camera=(), geolocation=(), microphone=(), payment=(), usb=()",
    },
    {
      key: "Referrer-Policy",
      value: "strict-origin-when-cross-origin",
    },
    {
      key: "X-Content-Type-Options",
      value: "nosniff",
    },
    {
      key: "X-Frame-Options",
      value: "SAMEORIGIN",
    },
  ];

  if (nodeEnv === "production") {
    // HSTS is intentionally production-only so local HTTP development and
    // non-TLS preview setups do not get sticky HTTPS behavior.
    headers.push({
      key: "Strict-Transport-Security",
      value: "max-age=31536000; includeSubDomains; preload",
    });
  }

  return headers;
}

export const securityHeaders = getSecurityHeaders();
