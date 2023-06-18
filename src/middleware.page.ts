import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware()

export const config = {
  matcher: [
    '/api/whoami',
    '/api/groups/join',
    '/api/groups/leave',
    '/api/tasks',
  ],
}
