import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://uniquevoyage.site"),
  title: {
    default: "Billets d'Avion Moins Chers & Bons Plans Vol | Unique Voyage",
    template: "%s | Billets d'Avion Moins Chers | Unique Voyage",
  },
  description:
    "Trouvez votre billet d'avion moins cher au meilleur prix garanti. Notre algorithme détecte en direct les baisses de prix et erreurs tarifaires vers Abidjan, Paris, Dakar, Dubaï, Montréal, New York et le monde entier. Paiement Wave et Mobile Money sécurisé.",
  keywords: [
    "billet avion moins cher",
    "billet d'avion moins cher",
    "billet d'avion pas cher",
    "comparateur vol billet avion",
    "bon plan voyage",
    "bons plans vols",
    "vacances pas cher",
    "sejour tout compris pas cher",
    "vol et hotel moins cher",
    "voyage derniere minute",
    "vol pas cher abidjan",
    "billet avion abidjan paris",
    "vol abidjan marseille pas cher",
    "vol abidjan lyon pas cher",
    "vol abidjan bordeaux pas cher",
    "vol abidjan guangzhou foire de canton",
    "vol abidjan beyrouth pas cher",
    "vol pas cher dakar",
    "billet avion dakar moins cher",
    "vol dakar milan pas cher",
    "vol dakar madrid pas cher",
    "vol dakar marseille pas cher",
    "vol dakar jeddah oumra pas cher",
    "vol abidjan jeddah pelerinage",
    "vol douala paris pas cher",
    "vol yaounde paris pas cher",
    "vol bamako paris pas cher",
    "vol lome paris pas cher",
    "vol cotonou paris pas cher",
    "vol kinshasa paris pas cher",
    "vol conakry paris pas cher",
    "vol pas cher accra",
    "vol abidjan dubai pas cher",
    "vol montreal paris pas cher",
    "vol paris new york pas cher",
    "vol paris bangkok pas cher",
    "vol paris bali pas cher",
    "vacances punta cana pas cher",
    "vol paris cancun pas cher",
    "vol guadeloupe martinique pas cher",
    "sejour maldives moins cher",
    "voyage tokyo pas cher",
    "sejour marrakech pas cher",
    "comparateur vol afrique et monde",
    "promo billet avion vacances",
    "erreur tarifaire vol",
    "vols derniere minute pas cher",
    "voyage pas cher afrique europe asie usa",
    "meilleur prix billet avion vacances",
    "reservation vol whatsapp",
    "conciergerie voyage afrique",
    "unique voyage",
    "agence de voyage en ligne",
    "paiement wave billet avion",
    "paiement mobile money billet avion"
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
    title: "Billets d'Avion Moins Chers & Bons Plans Vol | Unique Voyage",
    description:
      "Ne payez plus jamais le plein tarif pour voyager. L'intelligence artificielle qui traque les prix les plus bas et les promos secrètes des compagnies aériennes.",
    url: "https://uniquevoyage.site",
    siteName: "Unique Voyage",
    images: [
      {
        url: "/logos/Logo_UniqueVoyage.png",
        width: 1200,
        height: 630,
        alt: "Unique Voyage - Billets d'avion moins chers",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Billets d'Avion Moins Chers & Bons Plans | Unique Voyage",
    description:
      "Trouvez les vols les moins chers au départ d'Abidjan, Dakar, Paris et partout dans le monde avec Unique Voyage.",
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
                  "description": "Comparateur intelligent & billetterie de billets d'avion moins chers dans le monde entier",
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
                  "description": "Agence de billetterie et conciergerie voyage proposant les vols les moins chers du marché avec assistance personnalisée et paiement Mobile Money, Wave, PayPal ou carte bancaire.",
                  "address": {
                    "@type": "PostalAddress",
                    "addressCountry": "CI",
                    "addressLocality": "Abidjan"
                  },
                  "currenciesAccepted": "XOF, EUR, USD, CAD",
                  "paymentAccepted": "Mobile Money, Wave, PayPal, Carte Bancaire"
                },
                {
                  "@type": "FAQPage",
                  "@id": "https://uniquevoyage.site/#faq",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "Comment trouver un billet d'avion moins cher sur Unique Voyage ?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Unique Voyage utilise un algorithme de scan continu qui analyse les baisses de prix, erreurs tarifaires et promotions flash de plus de 50 compagnies aériennes. Vous pouvez utiliser notre barre de recherche directe ou consulter les offres pré-détectées par notre intelligence artificielle."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Puis-je payer mon billet d'avion avec Wave ou Mobile Money ?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Oui ! Unique Voyage facilite la réservation en acceptant les paiements sécurisés par Mobile Money, Wave, PayPal, ainsi que par carte bancaire internationale (Visa, Mastercard)."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Pourquoi les prix de billets d'avion sur Unique Voyage sont-ils plus bas ?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Unique Voyage utilise une technologie d'intelligence artificielle propriétaire connectée directement aux réseaux de distribution aérienne et aux compagnies aériennes internationales. Notre algorithme surveille les variations de tarifs 24h/24 pour réserver au moment précis où le prix atteint son plancher historique."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Quelles sont les villes de départ disponibles ?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Nos vols couvrent tous les aéroports internationaux majeurs : Abidjan (ABJ), Dakar (DSS), Accra (ACC), Paris (CDG/ORY), Bruxelles (BRU), Casablanca (CMN), Montréal (YUL), New York (JFK), et plus de 50 autres destinations."
                      }
                    }
                  ]
                }
              ]
            }),
          }}
        />

        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || "G-N6HV7QBE7S"}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || "G-N6HV7QBE7S"}');
          `}
        </Script>

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
