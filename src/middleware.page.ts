import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware()

export const config = {
  matcher: ['/api/whoami', '/api/groups/:path', '/api/tasks/:path*'],
}
