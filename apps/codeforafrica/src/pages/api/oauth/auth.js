import { nanoid } from "nanoid";
import { AuthorizationCode } from "simple-oauth2";

const config = {
  cms: {
    oauth: {
      redirectUrl: "https://cfa.dev.codeforafrica.org/api/oauth/callback",
      scope: "user, repo",
    },
  },
};

const client = new AuthorizationCode({
  client: {
    id: process.env.OAUTH_CLIENT_ID,
    secret: process.env.OAUTH_CLIENT_SECRET,
  },
  auth: {
    tokenHost: "https://github.com",
    authorizePath: "/login/oauth/authorize",
  },
});

// Authorization uri definition
const authorizationUri = client.authorizeURL({
  redirect_uri: config.cms.oauth.redirectUrl,
  scope: config.cms.oauth.scope,
  state: nanoid(),
});

// Initial page redirecting to Github
export default async (req, res) => {
  res.writeHead(302, { Location: authorizationUri });
  res.end();
};
