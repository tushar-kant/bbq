import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "dummy-secret-please-replace",
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            return session;
        },
        async signIn({ user, account, profile }) {
            return true;
        },
    },
    pages: {
        signIn: "/auth/signin",
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
