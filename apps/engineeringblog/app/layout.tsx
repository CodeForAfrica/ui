import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/engineeringblog/components/Navbar";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import StyledRoot from "./StyledRoot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Code For Africa Engineering",
  description: "The homepage of CFA engineering blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <StyledRoot>
            <Navbar />
            {children}
          </StyledRoot>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
