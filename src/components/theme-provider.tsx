'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import * as React from 'react'

export function ThemeProvider({ 
  children, 
  ...props 
}: { 
  children: React.ReactNode 
  [key: string]: any 
}) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
} 