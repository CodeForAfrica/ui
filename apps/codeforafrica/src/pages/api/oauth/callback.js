import { AuthorizationCode } from "simple-oauth2";

const oauthProvider = "github";
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

export default async (req, res) => {
  const { code, state } = req.query;
  const tokenParams = {
    code,
    state,
  };

  let status = "error";
  let content;
  try {
    const accessToken = await client.getToken(tokenParams);
    status = "success";
    content = {
      token: accessToken.token.access_token,
      provider: oauthProvider,
    };
  } catch (error) {
    content = JSON.stringify(error);
  }

  const script = `
    <script>
    (function() {
      function recieveMessage(e) {
        window.opener.postMessage(
          'authorization:${oauthProvider}:${status}:${JSON.stringify(content)}',
          e.origin
        );
      }
      window.addEventListener("message", recieveMessage, false)
      window.opener.postMessage("authorizing:${oauthProvider}", "*")
    })()
    </script>`;
  return res.end(script);
};
