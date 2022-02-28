// switch error code and return error description

export default function getErrorDescription(code) {
  if (!code) return null;

  let description = "";
  switch (code) {
    case "OAUTH_GET_ACCESS_TOKEN_ERROR":
    case "OAUTH_V1_GET_ACCESS_TOKEN_ERROR":
    case "OAUTH_GET_PROFILE_ERROR":
    case "OAUTH_PARSE_PROFILE_ERROR":
    case "GET_AUTHORIZATION_URL_ERROR":
    case "SIGNIN_OAUTH_ERROR":
    case "CALLBACK_OAUTH_ERROR":
    case "SIGNIN_EMAIL_ERROR":
    case "CALLBACK_EMAIL_ERROR":
    case "EMAIL_REQUIRES_ADAPTER_ERROR":
    case "CALLBACK_CREDENTIALS_JWT_ERROR":
    case "CALLBACK_CREDENTIALS_HANDLER_ERROR":
    case "PKCE_ERROR":
    case "JWT_SESSION_ERROR":
    case "SESSION_ERROR":
    case "SIGNOUT_ERROR":
      description =
        "Authentication Failed. Please check your credentials and try again.";
      break;
    default:
      description = "An error occurred. Please try again.";
      break;
  }
  return description;
}
