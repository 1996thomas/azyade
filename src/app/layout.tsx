import type { Metadata } from "next";
import { Raleway } from "next/font/google"; // Importez la font Inter
import "./globals.css";
import { getSettings } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const revalidate = 60; // Actualise toutes les 60 secondes

// Charger la police Google Inter
const inter = Raleway({
  subsets: ["latin"], // Ajoutez d'autres subsets si nécessaires
  variable: "--font-inter", // Nom de la variable CSS pour cette font
  display: "swap", // Utilisation du mode swap pour améliorer les performances
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
