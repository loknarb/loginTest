/* eslint-disable @typescript-eslint/no-non-null-assertion */
import NextAuth, { Session } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";
import jwt from "jsonwebtoken";
// import jwt from "next-auth/jwt";
interface SessionWithSupabase extends Session {
  supabaseAccessToken: string;
}
// eslint-disable-next-line import/no-default-export
export default NextAuth({
  providers: [
    // OAuth authentication providers...
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    // Passwordless / email sign in
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: 'NextAuth.js <no-reply@example.com>'
    // }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL!,
    secret: process.env.SUPABASE_ANON_KEY!,
  }),
  callbacks: {
    async session({ session, user }) {
      const signInSecret = process.env.SUPABASE_JWT_SECRET!;
      if (signInSecret) {
        const payload = {
          aud: "authenticated",
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: user.id,
          email: user.email,
          role: "authenticated",
        };
        // eslint-disable-next-line no-param-reassign
        session.supabaseAccessToken = jwt.sign(payload, signInSecret);
      }
      return session as SessionWithSupabase;
    },
  },
});
