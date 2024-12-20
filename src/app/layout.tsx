import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { getSettings } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const revalidate = 60; // Actualise toutes les 60 secondes


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const groteskBold = localFont({
  src: "./fonts/PPRightGrotesk-Bold.woff",
  variable: "--font-grotesk-bold",
  weight: "900",
});
const groteskMedium = localFont({
  src: "./fonts/PPRightGrotesk-Medium.woff",
  variable: "--font-grotesk-medium",
  weight: "900",
});

// Fonction asynchrone pour générer les métadonnées
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  return {
    title: settings?.site_title || "Aziyadé Abauzit",
    description: settings?.site_description || "Site de Aziyadé Abauzit",
    openGraph: {
      title: settings?.site_title || "Aziyadé Abauzit",
      description: settings?.site_description || "Site de Aziyadé Abauzit",
      siteName: settings?.site_title || "Site de Aziyadé Abauzit",
      images: [
        {
          url: urlFor(settings?.site_image).url(),
          alt: "Logo du site de Aziyadé",
        },
      ],
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${groteskBold.variable} ${groteskMedium.variable} antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
