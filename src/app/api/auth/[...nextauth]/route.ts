import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user }: { user: any }) {
            await dbConnect();
            const existingUser = await User.findOne({ email: user.email });
            const isMasterEmail = user.email === process.env.GMAIL_USER;

            console.log(`[NextAuth] SignIn: ${user.email}, isMaster: ${isMasterEmail}`);

            if (!existingUser) {
                const userCount = await User.countDocuments();
                await User.create({
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    role: (userCount === 0 || isMasterEmail) ? "owner" : "user"
                });
                console.log(`[NextAuth] Created new user with role: ${userCount === 0 || isMasterEmail ? 'owner' : 'user'}`);
            } else if (isMasterEmail && existingUser.role !== "owner") {
                existingUser.role = "owner";
                await existingUser.save();
                console.log(`[NextAuth] Promoted existing user to owner`);
            }
            return true;
        },
        async jwt({ token, user }: { token: any; user: any }) {
            await dbConnect(); // Ensure DB connection for every JWT call

            // Determine the email to look up in the database
            // On initial sign-in, 'user' object is available.
            // On subsequent requests (token refresh), 'user' is undefined, so use token.email.
            const emailToLookup = user?.email || token.email;

            if (emailToLookup) {
                const dbUser = await User.findOne({ email: emailToLookup });
                if (dbUser) {
                    token.role = dbUser.role;
                    token.id = dbUser._id.toString();
                    console.log(`[NextAuth] JWT: ${emailToLookup} - Role from DB: ${dbUser.role}`);
                } else {
                    console.log(`[NextAuth] JWT: User not found in DB for ${emailToLookup}`);
                }
            } else {
                console.log(`[NextAuth] JWT: No email available to lookup for token.`);
            }
            return token;
        },
        async session({ session, token }: { session: any; token: any }) {
            if (token) {
                session.user.role = token.role;
                session.user.id = token.id;
                console.log(`[NextAuth] Session created for ${session.user.email} with role ${token.role}`);
            }
            return session;
        },
    },
    pages: {
        signIn: "/auth/signin",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
