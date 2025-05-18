'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'
import { useSocketStore } from "@/hooks/use-socket-store";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {

  const { initializeSocket, disconnectSocket } = useSocketStore();

  React.useEffect(() => {
    initializeSocket();
    return () => {
      disconnectSocket();
    };
  }, []);

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
