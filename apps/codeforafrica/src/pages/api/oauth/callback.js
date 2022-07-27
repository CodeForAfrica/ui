import { AuthorizationCode } from "simple-oauth2";

const client = new AuthorizationCode({
  client: {
    id: process.env.OAUTH_CLIENT_ID,
    secret: process.env.OAUTH_CLIENT_SECRET,
  },
  auth: {
    tokenHost: "https://github.com",
    tokenPath: "/login/oauth/access_token",
  },
});

export default client;
