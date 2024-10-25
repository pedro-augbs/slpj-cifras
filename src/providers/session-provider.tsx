"use client"

import type { ReactNode } from "react"

import { SessionProvider as Session } from "next-auth/react"

export function SessionProvider({ children }: { children: ReactNode }) {
  return <Session>{children}</Session>
}
