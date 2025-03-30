import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { Navbar } from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/layout/theme-provider";
import AppContextProvider from "@/context/AppContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ai generator  - Landing template",
  description: "Landing template from Ai generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <body className={cn("min-h-screen bg-background", inter.className)}>
        <AppContextProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster position="top-right" theme="system" />
            <Navbar />

            {children}
          </ThemeProvider>
        </AppContextProvider>
      </body>
    </html>
  );
}
