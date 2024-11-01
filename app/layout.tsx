import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import { cn } from "@/lib/utils";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400",'300','500','600','700']
});
export const metadata: Metadata = {
  title: "Care Health ",
  description: "A healthcare management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-dark-300 font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider 
          attribute="class"
          defaultTheme="dark"
         
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
