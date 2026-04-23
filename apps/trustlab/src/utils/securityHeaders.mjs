function getContentSecurityPolicy(nodeEnv) {
  const isProduction = nodeEnv === "production";
  const connectSrc = ["'self'", "https:"];
  const scriptSrc = ["'self'", "'unsafe-inline'", "https:"];
  const styleSrc = ["'self'", "'unsafe-inline'", "https:"];

  // Next.js dev tooling relies on websocket connections and eval-based refresh
  // helpers. Keep those allowances scoped to non-production environments.
  if (!isProduction) {
    connectSrc.push("http:", "ws:", "wss:");
    scriptSrc.splice(1, 0, "'unsafe-eval'");
  }

  return `
    default-src 'self';
    base-uri 'self';
    connect-src ${connectSrc.join(" ")};
    font-src 'self' data: https:;
    form-action 'self';
    frame-ancestors 'self';
    frame-src 'self' https:;
    img-src 'self' data: blob: https:;
    media-src 'self' blob: https:;
    object-src 'none';
    script-src ${scriptSrc.join(" ")};
    style-src ${styleSrc.join(" ")};
  `
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join(" ");
}

function isTrue(value) {
  return value?.trim()?.toLowerCase() === "true";
}

export function getSecurityHeaders(
  nodeEnv = process.env.NODE_ENV,
  { enableHsts = isTrue(process.env.ENABLE_HSTS) } = {},
) {
  const isProduction = nodeEnv === "production";
  const headers = [
    {
      // CSP: restricts where the browser may load active content from.
      // https://developer.mozilla.org/docs/Web/HTTP/Headers/Content-Security-Policy
      key: "Content-Security-Policy",
      value: getContentSecurityPolicy(nodeEnv),
    },
    {
      // Permissions-Policy: disables browser features the app does not need.
      // https://developer.mozilla.org/docs/Web/HTTP/Headers/Permissions-Policy
      key: "Permissions-Policy",
      value: "camera=(), geolocation=(), microphone=(), payment=(), usb=()",
    },
    {
      // Referrer-Policy: limits how much referrer information is sent outbound.
      // https://developer.mozilla.org/docs/Web/HTTP/Headers/Referrer-Policy
      key: "Referrer-Policy",
      value: "strict-origin-when-cross-origin",
    },
    {
      // X-Content-Type-Options: disables MIME sniffing for ambiguous responses.
      // https://developer.mozilla.org/docs/Web/HTTP/Headers/X-Content-Type-Options
      key: "X-Content-Type-Options",
      value: "nosniff",
    },
    {
      // X-Frame-Options: keeps the site from being framed by other origins.
      // https://developer.mozilla.org/docs/Web/HTTP/Headers/X-Frame-Options
      key: "X-Frame-Options",
      value: "SAMEORIGIN",
    },
  ];

  if (isProduction && enableHsts) {
    // HSTS is opt-in so HTTP-only preview/staging deployments do not cache
    // sticky HTTPS behavior for a host that is not guaranteed to be TLS-only.
    headers.push({
      // HSTS: asks browsers to use HTTPS for future requests to this host.
      // https://developer.mozilla.org/docs/Web/HTTP/Headers/Strict-Transport-Security
      key: "Strict-Transport-Security",
      value: "max-age=31536000; includeSubDomains; preload",
    });
  }

  return headers;
}

export const securityHeaders = getSecurityHeaders();
