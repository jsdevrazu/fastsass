import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import ReactQueryProvider from "@/components/query-provider"
import { Toaster } from 'sonner'
import { GlobalLoader } from "@/components/global-loader"
import { Lato } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"


const lato = Lato({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '300', '400', '700', '900']
})

export const metadata: Metadata = {
  title: "Job Portal App",
  description: "Created with Razu Islam"
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html lang="en" suppressHydrationWarning className={lato.className}>
      <body
        cz-shortcut-listen="true"
        data-new-gr-c-s-check-loaded="14.1234.0"
        data-gr-ext-installed=""
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster />
          <GlobalLoader />
          <ReactQueryProvider>
            {children}
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
