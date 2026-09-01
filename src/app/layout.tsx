import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["200", "300", "400"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://uniquevoyage.site"),
  title: {
    default: "Unique Voyage — Billets d'Avion & Hôtels au Meilleur Prix Garanti",
    template: "%s | Unique Voyage",
  },
  description:
    "Plateforme mondiale de billetterie et conciergerie voyage. Découvrez nos offres de vols à prix cassés au départ de Paris, Abidjan, Montréal, New York, Dakar et Canton.",
  keywords: [
    "vols pas chers",
    "billet avion pas cher",
    "cheap flights",
    "vol paris new york pas cher",
    "vol abidjan dubai pas cher",
    "vol montreal paris pas cher",
    "promo billet avion",
    "erreur de prix vol",
    "billetterie pas cher",
    "voyage afrique europe usa asie",
    "conciergerie billetterie voyage",
    "unique voyage"
  ],
  authors: [{ name: "Unique Voyage" }],
  creator: "Unique Voyage",
  publisher: "Unique Voyage",
  alternates: {
    canonical: "https://uniquevoyage.site",
    languages: {
      "fr-FR": "https://uniquevoyage.site",
      "en-US": "https://uniquevoyage.site",
    },
  },
  openGraph: {
    title: "Unique Voyage — L'art de voyager au meilleur prix",
    description:
      "L'algorithme qui traque les erreurs tarifaires et les baisses de prix invisibles des compagnies aériennes à l'échelle mondiale.",
    url: "https://uniquevoyage.site",
    siteName: "Unique Voyage",
    images: [
      {
        url: "/logos/Logo_UniqueVoyage.png",
        width: 1200,
        height: 630,
        alt: "Logo Unique Voyage",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unique Voyage — Billets d'Avion & Séjours au Meilleur Prix",
    description:
      "Vols à prix cassés et hébergements économiques au départ de Paris, Abidjan, Montréal, New York et Dakar.",
    images: ["/logos/Logo_UniqueVoyage.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        {/* Structured Data JSON-LD Schema for Google Search Engine */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://uniquevoyage.site/#website",
                  "url": "https://uniquevoyage.site",
                  "name": "Unique Voyage",
                  "description": "Billetterie privée mondiale & détection de vols pas chers",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://uniquevoyage.site/offres?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                },
                {
                  "@type": "TravelAgency",
                  "@id": "https://uniquevoyage.site/#agency",
                  "name": "Unique Voyage",
                  "url": "https://uniquevoyage.site",
                  "logo": "https://uniquevoyage.site/logos/Logo_UniqueVoyage.png",
                  "telephone": "+2250545745749",
                  "priceRange": "$$",
                  "address": {
                    "@type": "PostalAddress",
                    "addressCountry": "CI",
                    "addressLocality": "Abidjan"
                  }
                }
              ]
            }),
          }}
        />

        {/* Travelpayouts Drive Manual Installation */}
        <script
          // @ts-ignore
          nowprocket=""
          data-noptimize="1"
          data-cfasync="false"
          data-wpfc-render="false"
          seraph-accel-crit="1"
          data-no-defer="1"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
                  console.log('[Travelpayouts] Script skipped on localhost to avoid console errors');
                  return;
                }
                var script = document.createElement("script");
                script.async = 1;
                script.src = 'https://emrld.ltd/NTQ0NjE4.js?t=544618';
                document.head.appendChild(script);
              })();
            `,
          }}
        />
      </head>

      <body className="h-full bg-black text-white font-sans font-light">
        {children}
      </body>
    </html>
  );
}
