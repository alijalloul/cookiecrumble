import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log("credentials: ", credentials);

        return { email: "76131445" };
      },
    }),
  ],
} satisfies NextAuthConfig;
