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
                // Mock authentication - replace with real database check later
                if (credentials?.email === "admin@responseaudit.com" && credentials?.password === "admin") {
                    return {
                        id: "1",
                        email: credentials.email,
                        name: "Admin User",
                        role: "ADMIN"
                    }
                }
                if (credentials?.email === "customer@example.com" && credentials?.password === "demo") {
                    return {
                        id: "2",
                        email: credentials.email,
                        name: "Demo Customer",
                        role: "CUSTOMER"
                    }
                }
                // Invalid credentials
                return null
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
