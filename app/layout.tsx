import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { SiteFooter } from "@/components/ui/SiteFooter";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { SkipLink } from "@/components/ui/SkipLink";
import { homeSeo, site } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: homeSeo.title,
    template: `%s | ${site.name}`,
  },
  description: homeSeo.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.socialTitle,
    description: site.socialDescription,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: site.socialTitle,
    description: site.socialDescription,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${sourceSans.variable} flex min-h-screen flex-col font-sans antialiased`}
      >
        <SkipLink />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
