import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getSiteSettings } from "@/lib/site";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://ashleygohportfolio.vercel.app"
  ),
  title: {
    default: "Ashley Goh — Product & UX Design",
    template: "%s · Ashley Goh",
  },
  description:
    "Product and UX designer with a CS background. Design research, prototyping, and the code to ship what I design.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Ashley Goh",
    images: [{ url: "/og-default.svg", width: 1200, height: 630, alt: "Ashley Goh portfolio" }],
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" className={nunito.variable}>
      <body className="min-h-screen antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <div className="page-enter">{children}</div>
        <SiteFooter
          email={settings.email}
          linkedInUrl={settings.linkedInUrl}
        />
      </body>
    </html>
  );
}
