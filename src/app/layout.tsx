import "./globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { StoreProvider } from "./store/StoreProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <StoreProvider>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={cn(" font-sans antialiased", fontSans.variable)}>
          {children}
        </body>
      </html>
    </StoreProvider>
  );
}
