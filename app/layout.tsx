import type { Metadata } from "next";
import { Marcellus, PT_Sans } from "next/font/google";
import "./globals.css";

const marcellus = Marcellus({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const ptSans = PT_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Skin, Hair & Aesthetic Care in Hyderabad | Dr. Nishita Ranka",
  description:
    "Dermatologist-led skin, hair and aesthetic care in Banjara Hills, Hyderabad, with personalised treatment planning for your concerns and goals.",
  metadataBase: new URL("https://drnishitaranka.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/brand/logo.png",
  },
  openGraph: {
    title: "Skin, Hair & Aesthetic Care | Dr. Nishita Ranka",
    description:
      "Personalised dermatologist-led care across skin, hair and aesthetic concerns in Banjara Hills, Hyderabad.",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/brand/dr-nishita.jpg",
        width: 1200,
        height: 630,
        alt: "Dr. Nishita Ranka at her dermatology clinic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skin, Hair & Aesthetic Care | Dr. Nishita Ranka",
    description:
      "Personalised dermatologist-led care across skin, hair and aesthetic concerns in Banjara Hills, Hyderabad.",
    images: ["/brand/dr-nishita.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body className={marcellus.variable + " " + ptSans.variable}>
        {children}
      </body>
    </html>
  );
}
