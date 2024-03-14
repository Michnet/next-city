import { NextResponse, userAgent } from 'next/server'
 
export function middleware(request) {
  // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
  // Getting cookies from the request using the `RequestCookies` API
  let cookie = request.cookies.get('nextjs')
  const { device } = userAgent(request)
  console.log('req xxxxxxxxxxxxxxxxx', device); 
  const response = NextResponse.next()
 
  return response
}