import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token
        const path = req.nextUrl.pathname

        // Protect /admin/* - admin only
        if (path.startsWith('/admin')) {
            if (token?.role !== 'ADMIN') {
                return NextResponse.redirect(new URL('/login', req.url))
            }
        }

        // Protect /app/* - logged in users only  
        if (path.startsWith('/app')) {
            if (!token) {
                return NextResponse.redirect(new URL('/login', req.url))
            }
        }

        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const path = req.nextUrl.pathname

                // Allow public routes
                if (!path.startsWith('/app') && !path.startsWith('/admin')) {
                    return true
                }

                // Require token for protected routes
                return !!token
            },
        },
    }
)

export const config = {
    matcher: ['/app/:path*', '/admin/:path*']
}
