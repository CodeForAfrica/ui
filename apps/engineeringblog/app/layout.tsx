import type { Metadata } from "next";
import Navbar from "@/engineeringblog/components/Navbar";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import StyledRoot from "./StyledRoot";

export const metadata: Metadata = {
  title: "Technology | Code for Africa",
  description:
    "Tech adventures in Africa's civic labs: Coding, innovating, and disrupting for good across the continent.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
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
