'use client'

import { ThemeProvider as Provider } from './theme-provider'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider defaultTheme="system" storageKey="theme">
      {children}
    </Provider>
  )
}
