import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Ashley Goh — UX Research & Design",
  description:
    "I turn messy data into things people can act on. Portfolio of Ashley Goh, UX researcher and designer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} h-full`}>
      <body className="min-h-full antialiased">
        <Nav />
        {children}
      </body>
    </html>
  );
}
