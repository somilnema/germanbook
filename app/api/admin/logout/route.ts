import { createResponseWithClearedAuthCookie } from '@/lib/auth'

export async function POST() {
  return createResponseWithClearedAuthCookie()
} 