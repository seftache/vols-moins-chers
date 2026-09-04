import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, FileText, Globe, Mail, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Mentions Légales",
  description: "Mentions légales, informations éditeur et politique de protection de la plateforme Unique Voyage.",
  robots: { index: true, follow: true },
};

export default function MentionsLegalesPage() {
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
            <ShieldCheck size={16} />
            Cadre Réglementaire & Juridique
          </div>
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Mentions Légales
          </h1>
          <p className="mt-4 text-sm font-light text-zinc-400">
            Dernière mise à jour : Février 2026. Conforme aux dispositions relatives à la confiance dans l'économie numérique et à la protection des données personnelles.
          </p>
        </div>

        {/* Sections juridiques */}
        <div className="space-y-12 leading-relaxed text-sm md:text-base font-light">
          {/* Section 1 : Éditeur du site */}
          <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8">
            <h2 className="font-playfair text-2xl text-white font-medium mb-4 flex items-center gap-3">
              <FileText size={20} className="text-[#D85A30]" />
              1. Éditeur de la Plateforme
            </h2>
            <div className="space-y-3 text-zinc-300">
              <p>
                Le site web accessible à l'adresse <strong className="text-white">https://uniquevoyage.site</strong> (ci-après désigné la « Plateforme ») est édité et exploité par :
              </p>
              <ul className="list-disc pl-5 space-y-1 text-zinc-400">
                <li><strong className="text-white">Dénomination :</strong> Unique Voyage (Plateforme technologique indépendante de comparatif et conciergerie de voyage).</li>
                <li><strong className="text-white">Nature de l'activité :</strong> Outil technologique de veille tarifaire, comparateur indépendant de billets d'avion et hébergements, service de mise en relation et conciergerie voyage via WhatsApp.</li>
                <li><strong className="text-white">Contact conciergerie & support :</strong> Via WhatsApp officiel au <span className="text-white font-mono">+225 05 45 74 57 49</span>.</li>
                <li><strong className="text-white">Directeur de la publication :</strong> La direction de Unique Voyage.</li>
              </ul>
            </div>
          </section>

          {/* Section 2 : Hébergement */}
          <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8">
            <h2 className="font-playfair text-2xl text-white font-medium mb-4 flex items-center gap-3">
              <Globe size={20} className="text-[#D85A30]" />
              2. Hébergement de la Plateforme
            </h2>
            <div className="space-y-3 text-zinc-300">
              <p>
                La Plateforme et ses bases de données sont hébergées par des infrastructures mondiales assurant haute disponibilité et sécurité :
              </p>
              <ul className="list-disc pl-5 space-y-1 text-zinc-400">
                <li><strong className="text-white">Hébergeur principal :</strong> Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.</li>
                <li><strong className="text-white">Infrastructures de données sécurisées :</strong> Supabase Inc. (Bases chiffrées SSL/TLS 256 bits).</li>
              </ul>
            </div>
          </section>

          {/* Section 3 : Rôle d'intermédiaire technologique */}
          <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8">
            <h2 className="font-playfair text-2xl text-white font-medium mb-4 flex items-center gap-3">
              <ShieldCheck size={20} className="text-[#D85A30]" />
              3. Nature du Service & Rôle d'Intermédiation
            </h2>
            <div className="space-y-4 text-zinc-300">
              <p>
                <strong className="text-white">Unique Voyage n'est en aucun cas une compagnie aérienne, ni un transporteur direct de passagers.</strong> Unique Voyage agit exclusivement en qualité de comparateur d'informations technologiques et de prestataire de conciergerie digitale.
              </p>
              <p>
                Les propositions tarifaires affichées résultent de scans algorithmiques en temps réel de bases de données de billetterie mondiale (GDS, consolidateurs aériens, compagnies partenaires). La conclusion du contrat de transport s'opère directement et exclusivement entre le voyageur et la compagnie aérienne émettrice ou le distributeur agréé.
              </p>
              <div className="text-zinc-400 text-xs italic bg-white/[0.03] p-4 rounded-xl border border-white/[0.04]">
                Clause de non-responsabilité : Unique Voyage décline expressément toute responsabilité relative à l'exécution du vol, retards, annulations, correspondances manquées, refus d'embarquement, avaries ou pertes de bagages, lesquels relèvent de la responsabilité légale exclusive du transporteur aérien effectif.
              </div>
            </div>
          </section>

          {/* Section 4 : Propriété intellectuelle */}
          <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8">
            <h2 className="font-playfair text-2xl text-white font-medium mb-4 flex items-center gap-3">
              <Lock size={20} className="text-[#D85A30]" />
              4. Propriété Intellectuelle
            </h2>
            <div className="space-y-3 text-zinc-300">
              <p>
                L'ensemble des éléments constituant la Plateforme Unique Voyage (structure générale, codes sources, design graphique, logotypes, algorithmes de détection, charte éditoriale, base de données) sont protégés par le droit international de la propriété intellectuelle.
              </p>
              <p>
                Toute reproduction, extraction, imitation, capture de données (scraping non autorisé) ou exploitation partielle ou totale des contenus sans autorisation écrite préalable est strictement interdite.
              </p>
            </div>
          </section>

          {/* Section 5 : Données personnelles */}
          <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8">
            <h2 className="font-playfair text-2xl text-white font-medium mb-4 flex items-center gap-3">
              <Mail size={20} className="text-[#D85A30]" />
              5. Protection des Données Personnelles
            </h2>
            <div className="space-y-3 text-zinc-300">
              <p>
                Unique Voyage accorde une importance primordiale au respect de votre vie privée et à la sécurité de vos données :
              </p>
              <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                <li><strong className="text-white">Collecte minimale :</strong> Les seules données collectées (adresse email, numéro WhatsApp) le sont avec votre consentement explicite, exclusivement pour l'envoi d'alertes de tarifs bas ou le suivi personnalisé de conciergerie.</li>
                <li><strong className="text-white">Absence de revente :</strong> Unique Voyage s'engage formellement à ne jamais céder, vendre ou louer vos coordonnées à des tiers à des fins publicitaires.</li>
                <li><strong className="text-white">Droit d'accès et de suppression :</strong> Vous pouvez à tout moment demander l'accès, la rectification ou la suppression de vos informations en contactant notre service conciergerie sur WhatsApp.</li>
              </ul>
            </div>
          </section>
        </div>

        {/* CTA retour */}
        <div className="mt-16 text-center border-t border-white/[0.08] pt-12">
          <Link
            href="/offres"
            className="inline-block bg-[#D85A30] px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-transform hover:scale-105"
          >
            Découvrir les offres de vols
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
