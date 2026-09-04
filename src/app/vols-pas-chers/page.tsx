import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Plane, 
  ChevronRight, 
  ArrowRight, 
  Bell, 
  ShieldCheck, 
  Compass, 
  Luggage, 
  Sparkles 
} from 'lucide-react';
import { SEO_FLIGHT_ROUTES, ROUTE_ZONE_HUBS } from '../../lib/routes-seo';

export const metadata: Metadata = {
  title: "Vols Pas Chers & Billets d'Avion Négociés | Conciergerie VIP Unique Voyage",
  description: "Découvrez toutes nos liaisons aériennes au tarif le plus bas au départ d'Abidjan, Dakar, Douala, Paris et du monde entier. Conciergerie de luxe, alertes VIP WhatsApp et paiements sécurisés.",
  keywords: [
    "vols pas chers afrique",
    "billet avion abidjan pas cher",
    "vol dakar paris moins cher",
    "conciergerie voyage afrique",
    "alerte whatsapp billet avion",
    "unique voyage"
  ],
  openGraph: {
    title: "Vols Pas Chers & Billets d'Avion Négociés | Conciergerie VIP Unique Voyage",
    description: "Toutes nos liaisons aériennes négociées. Conciergerie de luxe et alertes privées WhatsApp.",
    url: "https://uniquevoyage.site/vols-pas-chers",
    siteName: "Unique Voyage",
    images: [{ url: "/logos/Logo_UniqueVoyage.png", width: 1200, height: 630, alt: "Unique Voyage Conciergerie" }],
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://uniquevoyage.site/vols-pas-chers",
  },
};

export default function VolsPasChersHubIndexPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TravelAgency',
        '@id': 'https://uniquevoyage.site/#agency',
        name: 'Unique Voyage',
        url: 'https://uniquevoyage.site',
        logo: 'https://uniquevoyage.site/logos/Logo_UniqueVoyage.png',
        telephone: '+2250545745749',
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'CI',
          addressLocality: 'Abidjan',
        },
        currenciesAccepted: 'XOF, EUR, USD, CAD',
        paymentAccepted: 'Mobile Money, Wave, PayPal, Carte Bancaire',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Accueil',
            item: 'https://uniquevoyage.site',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Vols Pas Chers',
            item: 'https://uniquevoyage.site/vols-pas-chers',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Comment Unique Voyage déniche-t-il des vols moins chers ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Notre technologie d\'intelligence artificielle surveille en continu les inventaires et systèmes de réservation mondiaux. Dès qu\'une compagnie ajuste une classe tarifaire ou libère des sièges bradés, nos concierges sécurisent les billets pour nos membres.',
            },
          },
          {
            '@type': 'Question',
            name: 'Comment fonctionne l\'alerte VIP par WhatsApp ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Vous rejoignez notre canal privé d\'alertes WhatsApp. Dès qu\'une opportunité se présente sur vos destinations préférées, vous recevez une notification personnalisée et pouvez réserver en direct.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quels sont les moyens de paiement acceptés ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Nous acceptons Mobile Money, Wave, PayPal ainsi que les cartes bancaires internationales (Visa, Mastercard).',
            },
          },
        ],
      },
    ],
  };

  const whatsappGeneralUrl = `https://wa.me/2250545745749?text=${encodeURIComponent("Bonjour Unique Voyage Conciergerie, je souhaite rejoindre le cercle VIP WhatsApp pour recevoir vos alertes vols et promotions secrètes.")}`;

  return (
    <main className="min-h-screen bg-[#070707] text-white selection:bg-[#D85A30] selection:text-white font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* HEADER */}
      <header className="flex w-full items-center justify-between px-6 py-6 md:px-16 lg:px-24 border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="flex items-center">
          <svg viewBox="55 65 280 130" className="h-10 md:h-12 w-auto" xmlns="http://www.w3.org/2000/svg">
            <circle cx="120" cy="130" r="56" fill="none" stroke="white" strokeWidth="1.5"/>
            <path d="M95 105 L95 145 Q95 158 108 158 Q121 158 121 145 L121 118" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round"/>
            <g transform="translate(133,98) rotate(35)">
              <path d="M0 0 L26 0 L31 -3 L34 0 L31 3 L26 0 Z" fill="#D85A30"/>
              <path d="M10 0 L2 -9 L7 -9 L16 -1 Z" fill="#D85A30"/>
              <path d="M10 0 L2 9 L7 9 L16 1 Z" fill="#D85A30"/>
              <path d="M22 0 L26 5 L29 5 L27 0 Z" fill="#D85A30"/>
            </g>
            <text x="200" y="122" fontFamily="Georgia, serif" fontSize="34" fill="white" fontWeight="700">Unique</text>
            <text x="200" y="156" fontFamily="Georgia, serif" fontSize="34" fill="#D85A30" fontWeight="700">Voyage</text>
          </svg>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/offres"
            className="text-xs uppercase tracking-widest text-zinc-300 hover:text-[#D85A30] transition-colors"
          >
            Offres Live
          </Link>
          <a
            href={whatsappGeneralUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-[#D85A30] px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white hover:bg-[#c04b24] transition-all shadow-md"
          >
            <Bell size={14} />
            Alertes VIP WhatsApp
          </a>
        </div>
      </header>

      {/* BREADCRUMB */}
      <div className="mx-auto max-w-6xl px-6 pt-6 text-xs text-zinc-500 flex items-center gap-2">
        <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
        <ChevronRight size={12} />
        <span className="text-zinc-300">Vols Pas Chers & Conciergerie</span>
      </div>

      {/* HERO SECTION */}
      <section className="relative px-6 py-12 md:py-20 md:px-16 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D85A30]/15 border border-[#D85A30]/30 text-[#D85A30] text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles size={14} />
            Conciergerie Privée & Intelligence Artificielle
          </div>

          <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl text-white font-medium leading-tight mb-6">
            Vols Moins Chers & Billets Négociés <br />
            <span className="text-[#D85A30]">pour l'Afrique et le Monde</span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 max-w-3xl leading-relaxed mb-10">
            Unique Voyage réinvente le voyage aérien pour l'Afrique francophone. Nos algorithmes IA surveillent en continu les variations tarifaires de plus de 50 compagnies et notre conciergerie vous alerte en temps réel sur WhatsApp dès qu'un vol passe sous son prix moyen.
          </p>

          {/* CALLOUT VIP BANNER */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-black border border-[#D85A30]/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#D85A30] font-bold">Privilège Voyageur</span>
              <h2 className="font-playfair text-2xl md:text-3xl text-white font-medium">
                Rejoignez le canal d'alertes VIP WhatsApp
              </h2>
              <p className="text-sm text-zinc-400 max-w-xl">
                Erreurs tarifaires, ventes privées et déstockages de dernière minute : recevez nos meilleures trouvailles directement dans votre messagerie.
              </p>
            </div>
            <a
              href={whatsappGeneralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap px-8 py-4 bg-[#D85A30] hover:bg-[#b84a25] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center gap-2"
            >
              <Bell size={16} />
              Rejoindre les alertes VIP
            </a>
          </div>

          {/* GRANDS HUBS RÉGIONAUX */}
          <div className="mb-16">
            <div className="mb-8">
              <span className="text-xs uppercase tracking-widest text-[#D85A30] font-semibold">Grands Hubs Stratégiques</span>
              <h2 className="font-playfair text-3xl text-white font-medium mt-1">
                Explorez nos zones de vols privilégiées
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ROUTE_ZONE_HUBS.map((hub) => (
                <Link
                  key={hub.slug}
                  href={`/vols-pas-chers/${hub.slug}`}
                  className="group p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#D85A30] hover:bg-white/[0.04] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#D85A30] mb-3">
                      <Compass size={16} />
                      <span className="font-semibold uppercase tracking-wider">{hub.routeSlugs.length} liaisons actives</span>
                    </div>
                    <h3 className="font-playfair text-2xl text-white font-medium group-hover:text-[#D85A30] transition-colors mb-2">
                      {hub.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                      {hub.heroSubtitle}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400 group-hover:text-white transition-colors">
                    <span>Accéder aux vols du hub</span>
                    <ArrowRight size={16} className="text-[#D85A30]" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* CATALOGUE COMPLET DES ROUTES */}
          <div className="border-t border-white/10 pt-16">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#D85A30] font-semibold">Catalogue Billetterie</span>
                <h2 className="font-playfair text-3xl text-white font-medium mt-1">
                  Toutes nos liaisons aériennes au tarif le plus bas
                </h2>
              </div>
              <span className="text-xs text-zinc-500 font-mono">{SEO_FLIGHT_ROUTES.length} routes disponibles</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {SEO_FLIGHT_ROUTES.map((route) => (
                <Link
                  key={route.slug}
                  href={`/vols-pas-chers/${route.slug}`}
                  className="group p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#D85A30] hover:bg-white/[0.04] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-zinc-500 mb-2">
                      <span className="font-mono font-bold text-zinc-300">{route.originCode} ➔ {route.destCode}</span>
                      <span>{route.typicalDuration}</span>
                    </div>
                    <h3 className="font-playfair text-base text-white group-hover:text-[#D85A30] transition-colors font-medium mb-1">
                      {route.originCity} ➔ {route.destCity}
                    </h3>
                    <p className="text-[11px] text-zinc-500 line-clamp-1 mb-3">
                      {route.popularAirlines.slice(0, 3).join(', ')}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-baseline justify-between">
                    <span className="text-[10px] text-zinc-500 uppercase">Tarif dès</span>
                    <span className="font-mono text-sm font-bold text-white">
                      {(Math.round(route.avgPriceFCFA * 0.72)).toLocaleString()} <span className="text-[10px] text-[#D85A30] font-sans">FCFA</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AVANTAGES CONCIERGERIE */}
      <section className="px-6 py-16 md:px-16 lg:px-24 bg-zinc-950 border-t border-b border-white/10">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#D85A30]/15 flex items-center justify-center text-[#D85A30]">
                <Bell size={24} />
              </div>
              <h3 className="font-playfair text-xl text-white font-medium">Alertes Privées WhatsApp</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Notre intelligence artificielle analyse les réajustements de sièges et vous informe instantanément dès qu'une opportunité se présente sur vos dates.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#D85A30]/15 flex items-center justify-center text-[#D85A30]">
                <Luggage size={24} />
              </div>
              <h3 className="font-playfair text-xl text-white font-medium">2x 23kg de Bagages en Soute</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Nous sélectionnons en priorité des billets incluant une franchise bagage complète pour vous garantir un voyage sans supplément imprévu.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#D85A30]/15 flex items-center justify-center text-[#D85A30]">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-playfair text-xl text-white font-medium">Règlement Sécurisé & Simplifié</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Réglez en toute sécurité par Mobile Money, Wave, PayPal ou carte bancaire avec émission immédiate de votre billet électronique officiel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-black px-6 py-8 border-t border-white/10 text-center text-xs text-zinc-500">
        <p className="mb-2">© 2026 Unique Voyage · Billetterie & Conciergerie de voyage.</p>
        <div className="flex justify-center gap-6 my-2 text-[11px] text-zinc-400">
          <Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
          <Link href="/conditions-utilisation" className="hover:text-white transition-colors">Conditions d'utilisation</Link>
        </div>
        <p>
          Design by{' '}
          <a href="https://gadjico.netlify.app" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#D85A30] underline">
            Gadjico
          </a>
        </p>
      </footer>
    </main>
  );
}
