import { NextSeo, NextSeoProps } from "next-seo";
import React from "react";

import type { FooterProps } from "@/roboshield/components/Footer";
import Footer from "@/roboshield/components/Footer";
import type { NavBarProps } from "@/roboshield/components/NavBar";
import NavBar from "@/roboshield/components/NavBar";

interface Footer {
  logo: any;
  description: string;
  partners: any[];
}

interface PageProps {
  children?: React.ReactNode;
  navbar?: NavBarProps;
  footer?: FooterProps;
  seo?: NextSeoProps;
  slug?: string;
}

/**
 * While the layout (navbar, footer) remain the same, the main component
 * changes from page to page. Use `slug` to track page changes.
 */
function Page({ children, footer, navbar, seo, slug }: PageProps) {
  return (
    <>
      <NextSeo {...seo} />
      {navbar ? <NavBar {...navbar} /> : null}
      {children ? <main key={slug}>{children}</main> : null}
      {footer ? <Footer {...footer} /> : null}
    </>
  );
}

export default Page;
