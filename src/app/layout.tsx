import type { Metadata, Viewport } from "next";
import { Inter, Orbitron, Exo_2 } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { Header, Footer } from "@/components/layout/header";
import { MatrixRain } from "@/components/alien-theme/effects";
import { AuthProvider } from "@/components/providers/auth-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron", 
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const exo2 = Exo_2({
  variable: "--font-exo",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ALIENTEKA - UFO Digital Encyclopedia",
  description: "The ultimate digital encyclopedia for UFO phenomena, extraterrestrial life, and ufology research. Explore sightings, cases, and scientific research.",
  keywords: "UFO, aliens, extraterrestrial, ufology, sightings, space, astronomy, paranormal",
  authors: [{ name: "ALIENTEKA Team" }],
  openGraph: {
    title: "ALIENTEKA - UFO Digital Encyclopedia",
    description: "Explore the most comprehensive database of UFO sightings and extraterrestrial research.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ALIENTEKA - UFO Digital Encyclopedia",
    description: "The truth is out there. Discover it with ALIENTEKA.",
  },
  robots: "index, follow",
}

export function generateViewport(): Viewport {
  return {
    width: 'device-width',
    initialScale: 1,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${orbitron.variable} ${exo2.variable} antialiased min-h-screen relative overflow-x-hidden`}
      >
        <AuthProvider>
          {/* Matrix Rain Background Effect */}
          <MatrixRain density="low" className="fixed inset-0 z-0" />
          
          {/* Main Layout */}
          <div className="relative z-10 flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
