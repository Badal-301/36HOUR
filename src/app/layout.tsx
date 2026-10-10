import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/config/site";
import { eventConfig } from "@/config/event";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.seo.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: eventConfig.organizer.name }],
  ...(siteConfig.seo.shareImageUrl
    ? {
        openGraph: {
          title: siteConfig.seo.title,
          description: siteConfig.seo.description,
          url: siteConfig.seo.canonicalUrl ?? undefined,
          siteName: siteConfig.name,
          type: "website",
          images: [{ url: siteConfig.seo.shareImageUrl, width: 1200, height: 630, alt: `${siteConfig.name} — ${siteConfig.tagline}` }],
        },
        twitter: {
          card: "summary_large_image",
          title: siteConfig.seo.title,
          description: siteConfig.seo.description,
          images: [siteConfig.seo.shareImageUrl],
        },
      }
    : {
        openGraph: {
          title: siteConfig.seo.title,
          description: siteConfig.seo.description,
          url: siteConfig.seo.canonicalUrl ?? undefined,
          siteName: siteConfig.name,
          type: "website",
        },
      }),
  ...(siteConfig.seo.canonicalUrl ? { metadataBase: new URL(siteConfig.seo.canonicalUrl) } : {}),
  icons: {
    icon: [
      { url: "/devsprint-mark.svg", type: "image/svg+xml" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0D12",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
