import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldAlert, CheckCircle2, AlertTriangle, CreditCard, Plane, Scale, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Conditions d'Utilisation",
  description: "Conditions générales d'utilisation, limitation de responsabilité et règles d'intermédiation de Unique Voyage.",
  robots: { index: true, follow: true },
};

export default function ConditionsUtilisationPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-zinc-300 font-sans selection:bg-[#D85A30]/30 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#050505]/90 backdrop-blur-md px-6 py-4 md:px-16 lg:px-24">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-2 text-xs font-light uppercase tracking-widest text-zinc-400 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1 text-[#D85A30]" />
            Retour à l'accueil
          </Link>
          <Link href="/" className="font-playfair text-xl font-bold tracking-wider text-white">
            Unique<span className="text-[#D85A30]">Voyage</span>
          </Link>
        </div>
      </header>

      {/* Contenu principal */}
      <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        {/* Titre & En-tête */}
        <div className="mb-14 border-b border-white/[0.08] pb-10">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#D85A30] mb-3">
            <Scale size={16} />
            Conditions Contractuelles & Décharge de Responsabilité
          </div>
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Conditions d'Utilisation
          </h1>
          <p className="mt-4 text-sm font-light text-zinc-400">
            En vigueur au 1er Février 2026. Toute navigation ou utilisation des services proposés par Unique Voyage emporte acceptation pleine et entière des présentes conditions.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12 leading-relaxed text-sm md:text-base font-light">
          {/* Article 1 : Objet & Acceptation */}
          <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8">
            <h2 className="font-playfair text-2xl text-white font-medium mb-4 flex items-center gap-3">
              <CheckCircle2 size={20} className="text-[#D85A30]" />
              Article 1 : Objet & Champ d'Application
            </h2>
            <div className="space-y-3 text-zinc-300">
              <p>
                Les présentes Conditions Générales d'Utilisation (ci-après « CGU ») encadrent juridiquement l'accès et l'utilisation de la plateforme <strong className="text-white">Unique Voyage</strong> (accessible sur le site https://uniquevoyage.site et via ses canaux de conciergerie WhatsApp).
              </p>
              <p>
                En consultant le site, en s'inscrivant aux alertes ou en sollicitant notre service de conciergerie, l'utilisateur reconnaît avoir pris connaissance des présentes conditions et les accepter sans réserve.
              </p>
            </div>
          </section>

          {/* Article 2 : Statut d'intermédiaire exclusif */}
          <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8">
            <h2 className="font-playfair text-2xl text-white font-medium mb-4 flex items-center gap-3">
              <Plane size={20} className="text-[#D85A30]" />
              Article 2 : Qualité d'Intermédiaire Technologique Indépendant
            </h2>
            <div className="space-y-4 text-zinc-300">
              <p>
                <strong className="text-white">2.1. Non-qualité de transporteur :</strong> Unique Voyage opère uniquement en qualité de comparateur technologique, moteur d'agrégation d'opportunités tarifaires et facilitateur d'information de voyage. Unique Voyage n'est ni transporteur aérien, ni hôtelier, ni organisateur de voyages à forfait au sens direct du transport.
              </p>
              <p>
                <strong className="text-white">2.2. Contrat de transport direct :</strong> Tout billet d'avion ou réservation hôtelière émis lie contractuellement et exclusivement le voyageur à la compagnie aérienne opératrice (ex : Air France, Corsair, Emirates, Ethiopian Airlines, Turkish Airlines, etc.) ou à la centrale de réservation partenaire agréée.
              </p>
            </div>
          </section>

          {/* Article 3 : Volatilité des prix & Disponibilité */}
          <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8">
            <h2 className="font-playfair text-2xl text-white font-medium mb-4 flex items-center gap-3">
              <AlertTriangle size={20} className="text-[#D85A30]" />
              Article 3 : Volatilité des Tarifs Aériens & Disponibilité des Sièges
            </h2>
            <div className="space-y-4 text-zinc-300">
              <p>
                <strong className="text-white">3.1. Caractère indicatif en temps réel :</strong> Les tarifs affichés sur la Plateforme proviennent d'analyses en direct de bases de données de billetterie mondiale. En raison de la tarification dynamique (Yield Management) pratiquée par les compagnies aériennes, les prix et les disponibilités de sièges peuvent fluctuer de minute en minute.
              </p>
              <p>
                Le prix définitif n'est garanti qu'au moment de l'émission effective du billet électronique par la compagnie ou le partenaire de paiement. Unique Voyage ne garantit en aucun cas le maintien d'un tarif si le quota de sièges promotionnels est épuisé entre la consultation et la confirmation.
              </p>
              <p>
                <strong className="text-white">3.2. Erreurs tarifaires manifestes :</strong> Dans l'éventualité où une anomalie manifeste de prix résulterait d'un dysfonctionnement technique d'un distributeur tiers ou d'une compagnie aérienne, celle-ci dispose du droit légal d'annuler la commande avant départ. Unique Voyage ne saurait en aucun cas être tenue pour responsable d'un tel refus d'émission.
              </p>
            </div>
          </section>

          {/* Article 4 : Modalités de Paiement & Frais Opérateurs */}
          <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8">
            <h2 className="font-playfair text-2xl text-white font-medium mb-4 flex items-center gap-3">
              <CreditCard size={20} className="text-[#D85A30]" />
              Article 4 : Modalités de Règlement & Frais Tiers
            </h2>
            <div className="space-y-4 text-zinc-300">
              <p>
                <strong className="text-white">4.1. Moyens de paiement acceptés :</strong> Les réservations et assistances peuvent être réglées par les méthodes de paiement sécurisées : Mobile Money, Wave, PayPal ou cartes bancaires internationales (Visa, Mastercard).
              </p>
              <p>
                <strong className="text-white">4.2. Frais d'opérateurs tiers et de réseau :</strong> Unique Voyage ne prélève aucun frais occulte ou caché sur les transactions. Toutefois, le client reconnaît expressément que :
              </p>
              <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                <li>Des frais propres aux opérateurs téléphoniques, réseaux de transfert (ex: frais de retrait ou d'envoi Mobile Money / Wave) peuvent s'appliquer selon la grille tarifaire propre à l'opérateur du client.</li>
                <li>Des frais de conversion de devises ou commissions bancaires internationales peuvent être prélevés par la banque ou l'émetteur de carte du voyageur si la transaction s'effectue dans une devise étrangère.</li>
                <li>Ces frais relèvent de la relation contractuelle exclusive entre le voyageur et son prestataire de paiement, et ne sauraient en aucun cas être réclamés ou imputés à Unique Voyage.</li>
              </ul>
            </div>
          </section>

          {/* Article 5 : Retards, Annulations & Responsabilité Transporteur */}
          <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8">
            <h2 className="font-playfair text-2xl text-white font-medium mb-4 flex items-center gap-3">
              <ShieldAlert size={20} className="text-[#D85A30]" />
              Article 5 : Exonération Totale de Responsabilité Transport
            </h2>
            <div className="space-y-4 text-zinc-300">
              <p>
                En application des traités et conventions internationales régissant le transport aérien (notamment la Convention de Montréal de 1999 et la Convention de Varsovie de 1929) :
              </p>
              <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                <li><strong className="text-white">Exécution du vol :</strong> La compagnie aérienne assurant le vol est seule et uniquement responsable de l'embarquement, du respect des horaires, des retards de vol, des annulations, des changements d'appareils ou d'itinéraires et des refus d'embarquement (surréservation).</li>
                <li><strong className="text-white">Bagages :</strong> Tout retard, détérioration ou perte de bagages enregistrés relève de la responsabilité exclusive du transporteur aérien auprès duquel la réclamation officielle (PIR - Property Irregularity Report) doit être déposée à l'aéroport.</li>
                <li><strong className="text-white">Documents de voyage & Visas :</strong> Il appartient sous sa responsabilité exclusive à chaque voyageur de s'assurer de la validité de son passeport (minimum 6 mois après date retour), de l'obtention des visas nécessaires, formalités douanières et obligations sanitaires.</li>
              </ul>
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-xs text-zinc-400">
                <strong className="text-white">Dégagement de responsabilité :</strong> Unique Voyage ne saurait être tenue pour responsable des préjudices directs ou indirects causés par une inexécution ou mauvaise exécution imputable au transporteur aérien, au voyageur ou à un cas de force majeure (intempéries, grèves du contrôle aérien, instabilité géopolitique, fermetures d'espaces aériens).
              </div>
            </div>
          </section>

          {/* Article 6 : Service Conciergerie WhatsApp */}
          <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8">
            <h2 className="font-playfair text-2xl text-white font-medium mb-4 flex items-center gap-3">
              <HelpCircle size={20} className="text-[#D85A30]" />
              Article 6 : Assistance Conciergerie WhatsApp
            </h2>
            <div className="space-y-3 text-zinc-300">
              <p>
                Le service d'assistance conciergerie via WhatsApp a pour objet de guider le voyageur, d'identifier les liaisons les plus économiques et de l'orienter dans ses démarches.
              </p>
              <p>
                Ce service est dispensé dans le cadre d'une obligation de moyens et non d'une obligation de résultat. Unique Voyage met en œuvre toute son expertise pour proposer les meilleurs compromis tarifaires, sans pouvoir garantir l'absence de variations imposées par les transporteurs.
              </p>
            </div>
          </section>

          {/* Article 7 : Droit applicable */}
          <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8">
            <h2 className="font-playfair text-2xl text-white font-medium mb-4 flex items-center gap-3">
              <Scale size={20} className="text-[#D85A30]" />
              Article 7 : Droit Applicable & Règlement Amiable
            </h2>
            <div className="space-y-3 text-zinc-300">
              <p>
                Les présentes Conditions d'Utilisation sont régies par le droit en vigueur. En cas de différend ou de litige survenant à l'occasion de l'utilisation du service, les parties s'engagent expressément à privilégier une solution de conciliation amiable par échange écrit avant toute action contentieuse.
              </p>
            </div>
          </section>
        </div>

        {/* CTA retour */}
        <div className="mt-16 text-center border-t border-white/[0.08] pt-12">
          <Link
            href="/offres"
            className="inline-block bg-[#D85A30] px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-transform hover:scale-105"
          >
            Explorer les vols disponibles
          </Link>
        </div>
      </div>

      {/* Footer sobre */}
      <footer className="border-t border-white/[0.06] bg-black py-8 px-6 text-center text-xs text-zinc-500">
        <p>© 2026 Unique Voyage. Tous droits réservés. Design by Gadjico.</p>
      </footer>
    </main>
  );
}
