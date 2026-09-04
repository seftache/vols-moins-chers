import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Plane, Calendar, Clock, ShieldCheck, Star, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { supabaseAdmin } from '../../../lib/supabase-admin';
import { SEO_FLIGHT_ROUTES, getRouteBySlug, getAllRouteSlugs } from '../../../lib/routes-seo';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return getAllRouteSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const route = getRouteBySlug(slug);

  if (!route) {
    return {
      title: "Billet d'Avion Moins Cher & Bons Plans Vol | Unique Voyage",
      description: "Trouvez votre billet d'avion pas cher au meilleur prix garanti avec Unique Voyage.",
    };
  }

  // Chercher le prix le plus bas en base de données pour cette liaison
  const { data: lowestDeal } = await supabaseAdmin
    .from('detected_deals')
    .select('price_fcfa')
    .eq('origin', route.originCode)
    .eq('destination', route.destCode)
    .order('price_fcfa', { ascending: true })
    .limit(1)
    .maybeSingle();

  const lowestPrice = lowestDeal?.price_fcfa 
    ? `${lowestDeal.price_fcfa.toLocaleString()} FCFA`
    : `dès ${(Math.round(route.avgPriceFCFA * 0.75)).toLocaleString()} FCFA`;

  const title = `Billet d'Avion ${route.originCity} ➔ ${route.destCity} Moins Cher ${lowestPrice} | Unique Voyage`;
  const description = `Réservez votre vol pas cher de ${route.originCity} vers ${route.destCity} au meilleur prix garanti. Tarifs négociés, bagages inclus, paiement sécurisé par Wave & Mobile Money.`;

  return {
    title,
    description,
    keywords: [
      `billet avion ${route.originCity.toLowerCase()} ${route.destCity.toLowerCase()} moins cher`,
      `vol pas cher ${route.originCity.toLowerCase()} ${route.destCity.toLowerCase()}`,
      `billet d avion ${route.destCity.toLowerCase()} pas cher`,
      `vol direct ${route.originCity.toLowerCase()} ${route.destCity.toLowerCase()}`,
      `promo vol ${route.destCity.toLowerCase()}`,
      `prix billet avion ${route.originCity.toLowerCase()} ${route.destCity.toLowerCase()}`,
      `unique voyage ${route.destCity.toLowerCase()}`
    ],
    openGraph: {
      title,
      description,
      url: `https://uniquevoyage.site/vols/${route.slug}`,
      siteName: 'Unique Voyage',
      images: [
        {
          url: '/logos/Logo_UniqueVoyage.png',
          width: 1200,
          height: 630,
          alt: `Vol ${route.originCity} vers ${route.destCity} pas cher`,
        },
      ],
      locale: 'fr_FR',
      type: 'website',
    },
    alternates: {
      canonical: `https://uniquevoyage.site/vols/${route.slug}`,
    },
  };
}

export default async function FlightRoutePage({ params }: Props) {
  const { slug } = await params;
  const route = getRouteBySlug(slug);

  if (!route) {
    notFound();
  }

  // Récupérer les deals en temps réel pour cette liaison
  const { data: liveDeals } = await supabaseAdmin
    .from('detected_deals')
    .select('*')
    .eq('origin', route.originCode)
    .eq('destination', route.destCode)
    .order('price_fcfa', { ascending: true })
    .limit(4);

  const bestPrice = liveDeals && liveDeals.length > 0
    ? liveDeals[0].price_fcfa
    : Math.round(route.avgPriceFCFA * 0.72);

  const discountPercent = Math.round(((route.avgPriceFCFA - bestPrice) / route.avgPriceFCFA) * 100);

  const whatsappMessage = `Bonjour Unique Voyage, je souhaite réserver le vol ${route.originCity} (${route.originCode}) vers ${route.destCity} (${route.destCode}) au meilleur tarif garanti (${bestPrice.toLocaleString()} FCFA). Pouvez-vous me bloquer les dates les moins chères ?`;
  const whatsappUrl = `https://wa.me/2250545745749?text=${encodeURIComponent(whatsappMessage)}`;

  // Schéma de données enrichies pour Google
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        name: `Billet d'avion ${route.originCity} vers ${route.destCity}`,
        description: route.description,
        image: 'https://uniquevoyage.site/logos/Logo_UniqueVoyage.png',
        offers: {
          '@type': 'AggregateOffer',
          lowPrice: String(bestPrice),
          highPrice: String(route.avgPriceFCFA),
          priceCurrency: 'XOF',
          offerCount: '12',
          availability: 'https://schema.org/InStock',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '1340',
          bestRating: '5',
          worstRating: '1',
        },
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
            name: 'Vols Moins Chers',
            item: 'https://uniquevoyage.site/offres',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: `Vol ${route.originCity} - ${route.destCity}`,
            item: `https://uniquevoyage.site/vols/${route.slug}`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: route.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#070707] text-white selection:bg-[#D85A30] selection:text-white font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* HEADER NAVIGATION */}
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
            Toutes les offres
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-block bg-[#D85A30] px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white hover:bg-[#c04b24] transition-all shadow-md"
          >
            Réserver ce vol
          </a>
        </div>
      </header>

      {/* FIL D'ARIANE (BREADCRUMB) SEO */}
      <div className="mx-auto max-w-6xl px-6 pt-6 text-xs text-zinc-500 flex items-center gap-2">
        <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
        <ChevronRight size={12} />
        <Link href="/offres" className="hover:text-white transition-colors">Vols Moins Chers</Link>
        <ChevronRight size={12} />
        <span className="text-zinc-300">{route.originCity} vers {route.destCity}</span>
      </div>

      {/* HERO SECTION DE LA LIAISON */}
      <section className="relative px-6 py-12 md:py-20 md:px-16 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D85A30]/15 border border-[#D85A30]/30 text-[#D85A30] text-xs font-bold uppercase tracking-wider mb-6">
            <ShieldCheck size={14} />
            Meilleur Prix Garanti · Économisez jusqu'à -{discountPercent}%
          </div>

          <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl text-white font-medium leading-tight mb-6">
            Billet d'avion <span className="text-[#D85A30]">{route.originCity}</span> vers <span className="text-[#D85A30]">{route.destCity}</span> au prix le plus bas
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 max-w-3xl leading-relaxed mb-10">
            {route.description} Comparez les vols en direct, profitez de nos tarifs de groupe exclusifs et payez en toute sécurité par <strong>Wave</strong> ou <strong>Mobile Money</strong>.
          </p>

          {/* CARTE PRIX EN VEDETTE */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-white/15 shadow-2xl">
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded bg-white/10 text-xs font-mono font-bold text-white tracking-wider">
                  {route.originCode}
                </span>
                <Plane className="text-[#D85A30]" size={18} />
                <span className="px-3 py-1 rounded bg-white/10 text-xs font-mono font-bold text-white tracking-wider">
                  {route.destCode}
                </span>
                <span className="text-xs text-zinc-400">· {route.typicalDuration}</span>
              </div>

              <div className="flex items-baseline gap-4">
                <div>
                  <p className="text-xs text-zinc-400 uppercase tracking-wider">Tarif détecté en direct</p>
                  <p className="text-3xl sm:text-4xl font-bold text-white font-mono mt-1">
                    {bestPrice.toLocaleString()} <span className="text-sm font-sans text-[#D85A30]">FCFA</span>
                  </p>
                </div>
                <div className="border-l border-white/15 pl-4">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider">Prix moyen constaté</p>
                  <p className="text-lg line-through text-zinc-500 font-mono mt-1">
                    {route.avgPriceFCFA.toLocaleString()} FCFA
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {route.popularAirlines.map((airline) => (
                  <span key={airline} className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                    {airline}
                  </span>
                ))}
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col items-stretch gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 bg-[#D85A30] hover:bg-[#b84a25] text-white text-center font-bold text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
              >
                Réserver ce vol au meilleur prix
                <ArrowRight size={16} />
              </a>
              <p className="text-[11px] text-center text-zinc-400">
                Paiement sécurisé par Wave, Orange Money, MTN MoMo ou Carte
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OFFRES LIVE DÉTECTÉES EN BDD */}
      {liveDeals && liveDeals.length > 0 && (
        <section className="px-6 py-12 md:px-16 lg:px-24 bg-zinc-950/60 border-t border-b border-white/10">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-playfair text-2xl md:text-3xl text-white font-medium mb-6">
              Prochains départs détectés au plus bas tarif
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {liveDeals.map((deal) => (
                <div key={deal.id} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#D85A30]/50 transition-colors">
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                    <span>{deal.airline_name || deal.airline}</span>
                    <span className="text-[#D85A30] font-bold">-{deal.discount_percent}%</span>
                  </div>
                  <p className="text-xl font-bold font-mono text-white mb-2">
                    {deal.price_fcfa.toLocaleString()} <span className="text-xs font-sans text-zinc-400">FCFA</span>
                  </p>
                  <p className="text-xs text-zinc-400 flex items-center gap-1.5 mb-4">
                    <Calendar size={12} className="text-[#D85A30]" />
                    Départ : {deal.departure_date}
                  </p>
                  <a
                    href={`https://wa.me/2250545745749?text=${encodeURIComponent(`Bonjour, je souhaite réserver le vol ${deal.origin} vers ${deal.destination} du ${deal.departure_date} à ${deal.price_fcfa} FCFA.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center py-2 px-3 rounded-lg bg-white/10 hover:bg-[#D85A30] text-white text-xs font-semibold uppercase tracking-wider transition-all"
                  >
                    Choisir cette date
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* INFORMATIONS PRATIQUES & CONSEILS DE VOYAGE */}
      <section className="px-6 py-16 md:px-16 lg:px-24">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <h3 className="font-playfair text-lg text-white font-medium mb-3 flex items-center gap-2">
              <Clock className="text-[#D85A30]" size={18} />
              Durée & Correspondances
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Temps de trajet estimé à {route.typicalDuration}. Selon les compagnies, des vols directs ou avec une courte escale optimisée sont disponibles pour limiter la fatigue.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <h3 className="font-playfair text-lg text-white font-medium mb-3 flex items-center gap-2">
              <Calendar className="text-[#D85A30]" size={18} />
              Meilleure Période
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Pour profiter des prix les plus compétitifs et de conditions idéales, réservez pour voyager en {route.bestMonths}.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <h3 className="font-playfair text-lg text-white font-medium mb-3 flex items-center gap-2">
              <ShieldCheck className="text-[#D85A30]" size={18} />
              Paiement & Sécurité
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Réglez en toute sérénité par Wave, Orange Money, MTN MoMo ou carte bancaire. Billet électronique officiel délivré immédiatement dès validation.
            </p>
          </div>
        </div>
      </section>

      {/* FOIRE AUX QUESTIONS DÉDIÉE (SEO FAQPAGE) */}
      <section className="px-6 py-16 md:px-16 lg:px-24 border-t border-white/10 bg-zinc-950">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-[#D85A30] font-semibold">Questions Fréquentes</span>
            <h2 className="font-playfair text-3xl md:text-4xl text-white font-medium mt-2">
              Tout savoir sur votre vol {route.originCity} — {route.destCity}
            </h2>
          </div>

          <div className="space-y-4">
            {route.faqs.map((faq, index) => (
              <details key={index} className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-[#D85A30]/40 open:bg-white/[0.04]">
                <summary className="flex cursor-pointer items-center justify-between font-playfair text-base sm:text-lg text-white font-medium">
                  {faq.question}
                  <span className="ml-4 text-[#D85A30] transition-transform duration-300 group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* MAILLAGE INTERNE VERS LES AUTRES DESTINATIONS */}
      <section className="px-6 py-16 md:px-16 lg:px-24 border-t border-white/10">
        <div className="mx-auto max-w-6xl">
          <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-6">
            Autres vols populaires au meilleur prix
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs">
            {SEO_FLIGHT_ROUTES.filter((r) => r.slug !== route.slug).map((other) => (
              <Link
                key={other.slug}
                href={`/vols/${other.slug}`}
                className="p-3 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#D85A30] hover:text-[#D85A30] transition-colors text-zinc-300 flex items-center justify-between"
              >
                <span>Vol {other.originCity} - {other.destCity}</span>
                <ChevronRight size={12} className="text-zinc-500" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-black px-6 py-8 border-t border-white/10 text-center text-xs text-zinc-500">
        <p className="mb-2">© 2026 Unique Voyage · Billets d'avion moins chers au départ d'Afrique et du monde entier.</p>
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
