import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "you@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // Mock authentication for MVP
                if (!credentials?.email || !credentials?.password) return null;

                if (credentials.email === "admin@responseaudit.com" && credentials.password === "admin") {
                    return {
                        id: "1",
                        email: credentials.email,
                        name: "Admin User",
                        role: "ADMIN"
                    }
                }

                // For the MVP Sign-Up/Sign-In flow, accept any validly formatted email
                return {
                    id: Math.random().toString(36).substring(7),
                    email: credentials.email,
                    name: credentials.email.split('@')[0],
                    role: "CUSTOMER"
                }
            }
        })
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role
                session.user.id = token.id || ""
            }
            return session
        }
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET || "development-secret-key-change-in-production",
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
