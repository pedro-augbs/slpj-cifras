import type { Metadata } from "next"
import { Roboto_Flex as Roboto } from "next/font/google"

import { ThemeProvider } from "@/providers/theme-provider"

import { Toaster } from "@/components/ui/sonner"

import "./globals.css"

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
})

export const metadata: Metadata = {
  title: "Cifras Sem Limites",
  description: "Uma aplicação para criar músicas com acordes e cifras!",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${roboto.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
