import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Get the token from cookies
  const token = request.cookies.get('token')?.value;
  
  // 2. We also need the user's role and status. 
  // TIP: When you login, set a 'user_role' and 'user_status' cookie 
  // alongside the token to make middleware super fast.
  const userRole = request.cookies.get('user_role')?.value; // "user", "agent", "admin"
  const agentStatus = request.cookies.get('agent_status')?.value; // "active", "pending"

  const { pathname } = request.nextUrl;

  // --- 3. PUBLIC ROUTES ---
  // Allow these without a token
  if (!token) {
    // If trying to access any internal page without a token, go to login
    if (pathname.startsWith('/user') || pathname.startsWith('/agent') || pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    return NextResponse.next();
  }

  // --- 4. AUTHENTICATED REDIRECTS ---
  // If logged in, don't allow access to login/signup pages
  if (token && (pathname.startsWith('/auth/login') || pathname.startsWith('/auth/signup'))) {
     if (userRole === 'agent') return NextResponse.redirect(new URL('/agent', request.url));
     return NextResponse.redirect(new URL('/user/dashboard', request.url));
  }

  // --- 5. ROLE-BASED PROTECTION ---
  
  // Protect Agent Routes
  if (pathname.startsWith('/agent')) {
    if (userRole !== 'agent' && userRole !== 'admin') {
      return NextResponse.redirect(new URL('/user/dashboard', request.url));
    }
    // Handle Unpaid Agents
    if (agentStatus === 'pending' && pathname !== '/agent-payment') {
      return NextResponse.redirect(new URL('/agent-payment', request.url));
    }
  }

  // Protect User Routes
  if (pathname.startsWith('/user')) {
    if (userRole !== 'user' && userRole !== 'admin') {
      return NextResponse.redirect(new URL('/agent', request.url));
    }
  }

  return NextResponse.next();
}

// 6. Define which paths this middleware applies to
export const config = {
  matcher: ['/user/:path*', '/agent/:path*', '/admin/:path*', '/auth/:path*'],
};