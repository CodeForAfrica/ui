import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import actnow from "@/promisetracker/lib/actnow";

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Providers.Credentials({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        const authBody = {
          username: credentials.email,
          password: credentials.password,
        };
        try {
          const user = await actnow().accounts().login(authBody);
          user.accessToken = user.access_token;
          user.refreshToken = user.refresh_token;
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],

  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a separate secret is defined explicitly for encrypting the JWT.
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    jwt: true,

    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // JSON Web tokens are only used for sessions if the `jwt: true` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    secret: process.env.NEXTAUTH_JWT_SECRET ?? process.env.NEXTAUTH_SECRET,
    // Set to true to use encryption (default: false)
    encryption: true,
  },

  // You can set the theme to 'light', 'dark' or use 'auto' to default to the
  // whatever prefers-color-scheme is set to in the browser. Default is 'auto'
  theme: "light",

  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV !== "production",
});
