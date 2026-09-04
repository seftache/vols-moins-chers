import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  Plane, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  ChevronRight, 
  Sparkles, 
  CheckCircle2, 
  Bell, 
  Luggage, 
  MessageSquare,
  Compass
} from 'lucide-react';
import { supabaseAdmin } from '../../../lib/supabase-admin';
import { 
  SEO_FLIGHT_ROUTES, 
  ROUTE_ZONE_HUBS, 
  getRouteBySlug, 
  getHubBySlug, 
  getAllSEOPaths 
} from '../../../lib/routes-seo';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return getAllSEOPaths().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const hub = getHubBySlug(slug);

  if (hub) {
    return {
      title: hub.metaTitle,
      description: hub.metaDescription,
      keywords: [
        `vols pas chers ${hub.title.toLowerCase()}`,
        `billet avion ${hub.slug.replace('-', ' ')}`,
        `conciergerie voyage afrique`,
        `unique voyage alertes whatsapp`,
        `meilleur prix vol afrique europe`
      ],
      openGraph: {
        title: hub.metaTitle,
        description: hub.metaDescription,
        url: `https://uniquevoyage.site/vols-pas-chers/${hub.slug}`,
        siteName: 'Unique Voyage',
        images: [{ url: '/logos/Logo_UniqueVoyage.png', width: 1200, height: 630, alt: hub.title }],
        locale: 'fr_FR',
        type: 'website',
      },
      alternates: {
        canonical: `https://uniquevoyage.site/vols-pas-chers/${hub.slug}`,
      },
    };
  }

  const route = getRouteBySlug(slug);
  if (!route) {
    return {
      title: "Billets d'Avion Moins Chers & Conciergerie VIP | Unique Voyage",
      description: "Trouvez votre vol pas cher au meilleur prix avec Unique Voyage, conciergerie IA haut de gamme.",
    };
  }

  // Chercher le tarif réel en direct en BDD Supabase
  const { data: lowestDeal } = await supabaseAdmin
    .from('detected_deals')
    .select('price_fcfa')
    .eq('origin', route.originCode)
    .eq('destination', route.destCode)
    .order('price_fcfa', { ascending: true })
    .limit(1)
    .maybeSingle();

  const lowestPriceFormatted = lowestDeal?.price_fcfa 
    ? `${lowestDeal.price_fcfa.toLocaleString()} FCFA`
    : `dès ${(Math.round(route.avgPriceFCFA * 0.75)).toLocaleString()} FCFA`;

  const title = route.metaTitle || `Billet d'Avion ${route.originCity} ➔ ${route.destCity} dès ${lowestPriceFormatted} | Unique Voyage`;
  const description = route.metaDescription || `Réservez votre vol pas cher de ${route.originCity} vers ${route.destCity} au meilleur prix garanti. Conciergerie VIP WhatsApp, franchise bagage et paiement Wave/Mobile Money.`;

  return {
    title,
    description,
    keywords: [
      `billet avion ${route.originCity.toLowerCase()} ${route.destCity.toLowerCase()} moins cher`,
      `vol pas cher ${route.originCity.toLowerCase()} ${route.destCity.toLowerCase()}`,
      `promo vol ${route.destCity.toLowerCase()}`,
      `conciergerie voyage ${route.originCity.toLowerCase()}`,
      `alerte vol whatsapp ${route.destCity.toLowerCase()}`,
      `unique voyage ${route.destCity.toLowerCase()}`
    ],
    openGraph: {
      title,
      description,
      url: `https://uniquevoyage.site/vols-pas-chers/${route.slug}`,
      siteName: 'Unique Voyage',
      images: [{ url: '/logos/Logo_UniqueVoyage.png', width: 1200, height: 630, alt: `Vol ${route.originCity} - ${route.destCity}` }],
      locale: 'fr_FR',
      type: 'website',
    },
    alternates: {
      canonical: `https://uniquevoyage.site/vols-pas-chers/${route.slug}`,
    },
  };
}

export default async function VolPasCherDetailPage({ params }: Props) {
  const { slug } = await params;
  const hub = getHubBySlug(slug);
  const route = getRouteBySlug(slug);

  if (!hub && !route) {
    notFound();
  }

  // ==========================================
  // VUE 1 : PAGE HUB RÉGIONAL (ex: afrique-europe)
  // ==========================================
  if (hub) {
    // Récupérer les routes associées à ce hub
    const hubRoutes = SEO_FLIGHT_ROUTES.filter((r) => hub.routeSlugs.includes(r.slug));
    const otherHubs = ROUTE_ZONE_HUBS.filter((h) => h.slug !== hub.slug);

    // Données structurées conformes Google 2026 (sans faux avis)
    const hubStructuredData = {
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
          description: hub.metaDescription,
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
            {
              '@type': 'ListItem',
              position: 3,
              name: hub.title,
              item: `https://uniquevoyage.site/vols-pas-chers/${hub.slug}`,
            },
          ],
        },
        {
          '@type': 'FAQPage',
          mainEntity: hub.faqs.map((faq) => ({
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

    const whatsappHubMessage = `Bonjour Unique Voyage Conciergerie, je souhaite recevoir vos alertes VIP pour les vols de la zone ${hub.title}.`;
    const whatsappHubUrl = `https://wa.me/2250545745749?text=${encodeURIComponent(whatsappHubMessage)}`;

    return (
      <main className="min-h-screen bg-[#070707] text-white selection:bg-[#D85A30] selection:text-white font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hubStructuredData) }}
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
              href="/vols-pas-chers"
              className="text-xs uppercase tracking-widest text-zinc-300 hover:text-[#D85A30] transition-colors"
            >
              Tous les hubs
            </Link>
            <a
              href={whatsappHubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-[#D85A30] px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white hover:bg-[#c04b24] transition-all shadow-md"
            >
              <Bell size={14} />
              Alerte VIP WhatsApp
            </a>
          </div>
        </header>

        {/* BREADCRUMB */}
        <div className="mx-auto max-w-6xl px-6 pt-6 text-xs text-zinc-500 flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
          <ChevronRight size={12} />
          <Link href="/vols-pas-chers" className="hover:text-white transition-colors">Vols Pas Chers</Link>
          <ChevronRight size={12} />
          <span className="text-zinc-300">{hub.title}</span>
        </div>

        {/* HUB HERO */}
        <section className="relative px-6 py-12 md:py-20 md:px-16 lg:px-24">
          <div className="mx-auto max-w-6xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D85A30]/15 border border-[#D85A30]/30 text-[#D85A30] text-xs font-bold uppercase tracking-wider mb-6">
              <Compass size={14} />
              Grand Hub Régional & Conciergerie VIP
            </div>

            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl text-white font-medium leading-tight mb-6">
              {hub.title} : <span className="text-[#D85A30]">Vols Moins Chers & Billets Négociés</span>
            </h1>

            <p className="text-lg text-zinc-300 max-w-3xl leading-relaxed mb-8">
              {hub.description}
            </p>

            {/* AVANTAGES CONCIERGERIE */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
              {hub.features.map((feat, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#D85A30]/40 transition-colors">
                  <h3 className="font-playfair text-lg text-white font-medium mb-2 flex items-center gap-2">
                    <Sparkles className="text-[#D85A30]" size={16} />
                    {feat.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* CALLOUT VIP WHATSAPP */}
            <div className="p-8 rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-black border border-[#D85A30]/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 my-12">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#D85A30] font-bold">Privilège Conciergerie</span>
                <h3 className="font-playfair text-2xl md:text-3xl text-white font-medium">
                  Recevez les alertes secrètes pour {hub.title}
                </h3>
                <p className="text-sm text-zinc-400 max-w-xl">
                  Ne manquez plus aucun billet bradé ni réajustement tarifaire. Nos conseillers vous transmettent les opportunités privées directement sur WhatsApp.
                </p>
              </div>
              <a
                href={whatsappHubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap px-8 py-4 bg-[#D85A30] hover:bg-[#b84a25] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center gap-2"
              >
                <Bell size={16} />
                Activer mes alertes VIP
              </a>
            </div>
          </div>
        </section>

        {/* LISTE DES ROUTES DU HUB */}
        <section className="px-6 py-16 md:px-16 lg:px-24 bg-zinc-950/60 border-t border-b border-white/10">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#D85A30] font-semibold">Liaisons Disponibles</span>
                <h2 className="font-playfair text-3xl text-white font-medium mt-1">
                  Les meilleures routes aériennes {hub.title}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {hubRoutes.map((r) => (
                <Link
                  key={r.slug}
                  href={`/vols-pas-chers/${r.slug}`}
                  className="group p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#D85A30] hover:bg-white/[0.04] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-zinc-400 mb-3">
                      <span className="font-mono px-2 py-0.5 rounded bg-white/10 text-white font-bold">{r.originCode} ➔ {r.destCode}</span>
                      <span className="text-[#D85A30] font-semibold">{r.typicalDuration}</span>
                    </div>
                    <h3 className="font-playfair text-xl text-white font-medium group-hover:text-[#D85A30] transition-colors mb-2">
                      {r.originCity} ➔ {r.destCity}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-2 mb-4">
                      {r.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Tarif indicatif dès</p>
                      <p className="font-mono text-lg font-bold text-white">
                        {(Math.round(r.avgPriceFCFA * 0.72)).toLocaleString()} <span className="text-xs font-sans text-[#D85A30]">FCFA</span>
                      </p>
                    </div>
                    <span className="p-2 rounded-lg bg-white/5 group-hover:bg-[#D85A30] text-white transition-colors">
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQS DÉDIÉES DU HUB */}
        <section className="px-6 py-16 md:px-16 lg:px-24">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-widest text-[#D85A30] font-semibold">Foire Aux Questions</span>
              <h2 className="font-playfair text-3xl md:text-4xl text-white font-medium mt-2">
                Questions fréquentes : {hub.title}
              </h2>
            </div>

            <div className="space-y-4">
              {hub.faqs.map((faq, index) => (
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

        {/* AUTRES HUBS RÉGIONAUX */}
        <section className="px-6 py-16 md:px-16 lg:px-24 border-t border-white/10">
          <div className="mx-auto max-w-6xl">
            <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-6">
              Explorer les autres grands hubs régionaux
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {otherHubs.map((oh) => (
                <Link
                  key={oh.slug}
                  href={`/vols-pas-chers/${oh.slug}`}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#D85A30] transition-colors flex items-center justify-between group"
                >
                  <div>
                    <h4 className="font-playfair text-base text-white group-hover:text-[#D85A30] transition-colors">{oh.title}</h4>
                    <p className="text-[11px] text-zinc-500 mt-1">{oh.routeSlugs.length} liaisons directes & optimisées</p>
                  </div>
                  <ChevronRight size={16} className="text-zinc-500 group-hover:text-[#D85A30] transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="w-full bg-black px-6 py-8 border-t border-white/10 text-center text-xs text-zinc-500">
          <p className="mb-2">© 2026 Unique Voyage · Conciergerie IA de voyage haut de gamme pour l'Afrique francophone.</p>
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

  // ==========================================
  // VUE 2 : PAGE ROUTE VOL (ex: abidjan-istanbul)
  // ==========================================
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

  const whatsappMessage = `Bonjour Unique Voyage Conciergerie, je souhaite réserver le vol ${route.originCity} (${route.originCode}) vers ${route.destCity} (${route.destCode}) au tarif négocié (${bestPrice.toLocaleString()} FCFA). Pouvez-vous me bloquer les meilleures dates ?`;
  const whatsappUrl = `https://wa.me/2250545745749?text=${encodeURIComponent(whatsappMessage)}`;

  const whatsappAlertMessage = `Bonjour Unique Voyage, j'aimerais recevoir les alertes VIP WhatsApp pour les baisses de tarifs sur la ligne ${route.originCity} - ${route.destCity}.`;
  const whatsappAlertUrl = `https://wa.me/2250545745749?text=${encodeURIComponent(whatsappAlertMessage)}`;

  // Schéma de données enrichies pour Google 2026 (100% conforme, 0 faux avis)
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
          {
            '@type': 'ListItem',
            position: 3,
            name: `Vol ${route.originCity} - ${route.destCity}`,
            item: `https://uniquevoyage.site/vols-pas-chers/${route.slug}`,
          },
        ],
      },
      {
        '@type': 'Offer',
        name: `Billet d'avion ${route.originCity} vers ${route.destCity}`,
        description: route.description,
        price: String(bestPrice),
        priceCurrency: 'XOF',
        availability: 'https://schema.org/InStock',
        url: `https://uniquevoyage.site/vols-pas-chers/${route.slug}`,
        seller: {
          '@type': 'TravelAgency',
          name: 'Unique Voyage',
        },
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

  // Maillage interne ciblé (3 à 5 routes associées)
  const relatedRoutes = route.relatedSlugs && route.relatedSlugs.length > 0
    ? route.relatedSlugs.map((s) => getRouteBySlug(s)).filter((r): r is typeof route => Boolean(r))
    : SEO_FLIGHT_ROUTES.filter((r) => r.slug !== route.slug).slice(0, 4);

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
            href="/vols-pas-chers"
            className="text-xs uppercase tracking-widest text-zinc-300 hover:text-[#D85A30] transition-colors"
          >
            Toutes les liaisons
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

      {/* FIL D'ARIANE (BREADCRUMB) */}
      <div className="mx-auto max-w-6xl px-6 pt-6 text-xs text-zinc-500 flex items-center gap-2">
        <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
        <ChevronRight size={12} />
        <Link href="/vols-pas-chers" className="hover:text-white transition-colors">Vols Pas Chers</Link>
        <ChevronRight size={12} />
        <span className="text-zinc-300">{route.originCity} vers {route.destCity}</span>
      </div>

      {/* HERO SECTION DE LA LIAISON */}
      <section className="relative px-6 py-12 md:py-20 md:px-16 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D85A30]/15 border border-[#D85A30]/30 text-[#D85A30] text-xs font-bold uppercase tracking-wider mb-6">
            <ShieldCheck size={14} />
            Conciergerie Privée & IA · Économisez jusqu'à -{discountPercent}%
          </div>

          <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl text-white font-medium leading-tight mb-6">
            {route.h1Title || `Billet d'avion ${route.originCity} vers ${route.destCity} au tarif le plus bas`}
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 max-w-3xl leading-relaxed mb-6">
            {route.description}
          </p>

          {/* NOTE ÉDITORIALE DE LA CONCIERGERIE */}
          {route.conciergeNote && (
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 max-w-3xl mb-10 flex items-start gap-3">
              <Sparkles className="text-[#D85A30] shrink-0 mt-0.5" size={18} />
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                {route.conciergeNote}
              </p>
            </div>
          )}

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
                  <p className="text-xs text-zinc-400 uppercase tracking-wider">Tarif négocié en direct</p>
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

              <a
                href={whatsappAlertUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-6 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-center font-semibold text-xs uppercase tracking-wider rounded-xl border border-white/10 transition-all flex items-center justify-center gap-2"
              >
                <Bell size={14} className="text-[#D85A30]" />
                Rejoindre l'alerte VIP WhatsApp
              </a>

              <p className="text-[11px] text-center text-zinc-400">
                Paiement sécurisé par Mobile Money, Wave, PayPal ou Carte Bancaire
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DIFFÉRENCIATEUR : LE SERVICE CONCIERGERIE VIP */}
      <section className="px-6 py-12 md:px-16 lg:px-24 bg-zinc-950/80 border-t border-b border-white/10">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest text-[#D85A30] font-semibold">L'Expérience Unique Voyage</span>
            <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl text-white font-medium mt-2">
              Bien plus qu'un comparateur : une conciergerie privée pour votre vol
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#D85A30]/15 flex items-center justify-center text-[#D85A30]">
                <Bell size={20} />
              </div>
              <h3 className="font-playfair text-lg text-white font-medium">Alertes VIP WhatsApp Personnalisées</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Nos algorithmes surveillent les inventaires 24h/24. Dès qu'une baisse de prix secrète ou un déstockage est détecté sur la ligne {route.originCity} - {route.destCity}, vous recevez une alerte immédiate sur WhatsApp.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#D85A30]/15 flex items-center justify-center text-[#D85A30]">
                <Luggage size={20} />
              </div>
              <h3 className="font-playfair text-lg text-white font-medium">Franchise Bagages & Tarifs Négociés</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Fini les mauvaises surprises à l'aéroport. Notre conciergerie sélectionne en priorité les tarifs avec 2x23kg de bagages en soute et négocie des conditions d'émission souples.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#D85A30]/15 flex items-center justify-center text-[#D85A30]">
                <ShieldCheck size={20} />
              </div>
              <h3 className="font-playfair text-lg text-white font-medium">Paiement Sécurisé & Concierge Dédié</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Réglez en toute confiance par Mobile Money, Wave, PayPal ou carte bancaire. Un concierge dédié vous assiste jusqu'à l'embarquement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OFFRES LIVE DÉTECTÉES EN BDD */}
      {liveDeals && liveDeals.length > 0 && (
        <section className="px-6 py-12 md:px-16 lg:px-24 border-b border-white/10">
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
                    Bloquer cette date
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
              Temps de trajet moyen estimé à {route.typicalDuration}. Notre conciergerie privilégie les vols sans escale ou avec des transits fluides sans changement de terminal complexe.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <h3 className="font-playfair text-lg text-white font-medium mb-3 flex items-center gap-2">
              <Calendar className="text-[#D85A30]" size={18} />
              Meilleure Période
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Pour bénéficier des tarifs les plus avantageux et de conditions météo idéales, réservez pour voyager en {route.bestMonths}.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <h3 className="font-playfair text-lg text-white font-medium mb-3 flex items-center gap-2">
              <ShieldCheck className="text-[#D85A30]" size={18} />
              Garantie Conciergerie
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Assistance complète par messagerie WhatsApp avant, pendant et après votre voyage. Billets électroniques officiels émis directement auprès des compagnies accréditées.
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

      {/* MAILLAGE INTERNE CIBLÉ (3 À 5 ROUTES CONNEXES) */}
      <section className="px-6 py-16 md:px-16 lg:px-24 border-t border-white/10">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">
              Liaisons connexes recommandées par notre conciergerie
            </h3>
            <Link href="/vols-pas-chers" className="text-xs text-[#D85A30] hover:underline flex items-center gap-1">
              Voir tout le catalogue <ChevronRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            {relatedRoutes.map((other) => (
              <Link
                key={other.slug}
                href={`/vols-pas-chers/${other.slug}`}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#D85A30] hover:text-[#D85A30] transition-colors text-zinc-300 flex items-center justify-between group"
              >
                <div>
                  <span className="font-medium text-white group-hover:text-[#D85A30] transition-colors block">
                    Vol {other.originCity} - {other.destCity}
                  </span>
                  <span className="text-[10px] text-zinc-500 mt-1 block">
                    dès {(Math.round(other.avgPriceFCFA * 0.72)).toLocaleString()} FCFA
                  </span>
                </div>
                <ChevronRight size={14} className="text-zinc-500 group-hover:text-[#D85A30]" />
              </Link>
            ))}
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
