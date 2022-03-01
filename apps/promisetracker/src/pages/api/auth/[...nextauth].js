import jwtDecode from "jwt-decode";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import actnow from "@/promisetracker/lib/actnow";

const OAUTH_PROVIDERS = ["google"];

async function fetchToken(url, params) {
  const body = new URLSearchParams({
    grant_type: "password",
    client_id: process.env.ACTNOW_CLIENT_ID,
    client_secret: process.env.ACTNOW_CLIENT_SECRET,
    ...params,
  });
  const requestOptions = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "cache-control": "no-cache",
    },
    body: body.toString(),
    redirect: "follow",
  };

  return fetch(url, requestOptions).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  });
}

async function fetchNewToken({ account, user: nextAuthUser }) {
  const url = new URL(
    `${account.provider}/`,
    `${process.env.ACTNOW_URL}/auth/`
  ).toString();
  const {
    access_token: accessToken,
    refresh_token: refreshToken,
    user: authUser,
  } = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      access_token: account?.access_token,
      client_id: process.env.ACTNOW_CLIENT_ID,
      client_secret: process.env.ACTNOW_CLIENT_SECRET,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  });

  const user = { ...nextAuthUser, ...authUser };
  return {
    accessToken,
    exp: jwtDecode(accessToken).exp * 1000,
    idToken: account?.id_token ?? null,
    refreshToken,
    accountType: account?.provider,
    user,
  };
}

async function fetchRefreshedToken({ token: currentToken }) {
  try {
    const params = {
      refresh_token: currentToken.refreshToken,
      grant_type: "refresh_token",
    };
    const url = `${process.env.ACTNOW_URL}/o/token/`;
    const { access_token: accessToken, refresh_token: refreshToken } =
      await fetchToken(url, params);
    return {
      ...currentToken,
      accessToken,
      exp: jwtDecode(accessToken).exp,
      // Fall back to current refresh token if new one is not available
      refreshToken: refreshToken || currentToken.refreshToken,
    };
  } catch (error) {
    return null;
  }
}
const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        const authBody = {
          username: credentials.email,
          password: credentials.password,
        };
        const user = await actnow().accounts().login(authBody);
        if (user.error) {
          throw new Error(user.error);
        }
        user.accessToken = user.access_token;
        user.refreshToken = user.refresh_token;
        return user;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user, account }) {
      // when created: e.g. at sign in
      //              fetch new access token
      if (account && user) {
        if (OAUTH_PROVIDERS.includes(account.provider)) {
          return fetchNewToken({ account, user });
        }
        if (account.provider === "credentials") {
          return {
            accountType: "credentials",
            ...user,
          };
        }
      }
      // when updated: e.g. when session is accessed in the client
      //               return current token if the access token
      //               has not expired yet
      if (token && Date.now() < token.exp * 1000) {
        return token;
      }

      //               otherwise, refresh the current token
      return fetchRefreshedToken({ token });
    },
    async session({ session, token }) {
      if (!(session && token)) {
        return null;
      }
      return { ...session, ...token };
    },
  },

  pages: {
    signIn: "/act-now",
    error: "/act-now", // Error code passed in query string as ?error=
  },
};

export default NextAuth(options);
