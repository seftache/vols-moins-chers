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
  title: "UniqueVoyage - L'art de voyager au meilleur prix",
  description: "L'algorithme qui traque les erreurs tarifaires et les baisses de prix invisibles des compagnies aériennes.",
  openGraph: {
    title: "UniqueVoyage - L'art de voyager au meilleur prix",
    description: "L'algorithme qui traque les erreurs tarifaires et les baisses de prix invisibles des compagnies aériennes.",
    images: [
      {
        url: "/logos/Logo_UniqueVoyage.png",
        width: 680,
        height: 200,
        alt: "Logo UniqueVoyage",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UniqueVoyage - L'art de voyager au meilleur prix",
    description: "L'algorithme qui traque les erreurs tarifaires et les baisses de prix invisibles des compagnies aériennes.",
    images: ["/logos/Logo_UniqueVoyage.png"],
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
