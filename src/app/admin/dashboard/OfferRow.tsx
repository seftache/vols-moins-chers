"use client";

import { useTransition } from "react";
import { forcePublishOffer, deleteOffer } from "../actions";
import { Loader2, RefreshCw, Trash2, ExternalLink } from "lucide-react";
import Link from "next/link";

interface OfferRowProps {
  offer: any; // On utilise any pour faire simple, ou on type si besoin
}

export default function OfferRow({ offer }: OfferRowProps) {
  const [isPending, startTransition] = useTransition();

  const handleForcePublish = () => {
    startTransition(async () => {
      try {
        await forcePublishOffer(offer.id);
        alert(`L'offre pour ${offer.destination_name} a été republiée (date mise à jour).`);
      } catch (e: any) {
        alert(`Erreur : ${e.message}`);
      }
    });
  };

  const handleDelete = () => {
    if (!confirm(`Voulez-vous vraiment supprimer l'offre vers ${offer.destination_name} ?`)) {
      return;
    }
    
    startTransition(async () => {
      try {
        await deleteOffer(offer.id);
      } catch (e: any) {
        alert(`Erreur : ${e.message}`);
      }
    });
  };

  // Calcul du statut (Expiré ou Actif)
  const generatedAt = new Date(offer.generated_at).getTime();
  const now = new Date().getTime();
  const hoursSinceGeneration = (now - generatedAt) / (1000 * 60 * 60);
  const isExpired = hoursSinceGeneration >= 72;

  return (
    <tr className="hover:bg-white/[0.02] transition-colors group">
      <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
        {offer.destination_name}
        <Link href={`/itinerary/${offer.id}`} target="_blank" className="opacity-0 group-hover:opacity-100 transition-opacity">
          <ExternalLink className="w-4 h-4 text-[#888] hover:text-white" />
        </Link>
      </td>
      <td className="px-6 py-4 text-[#888]">
        {new Date(offer.generated_at).toLocaleString("fr-FR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        })}
      </td>
      <td className="px-6 py-4">
        {isExpired ? (
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-[#7a1818]/20 text-[#ff4d4d] border border-[#7a1818]">
            Expiré
          </span>
        ) : (
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-green-500/10 text-green-400 border border-green-500/20">
            Actif
          </span>
        )}
      </td>
      <td className="px-6 py-4 text-right space-x-3">
        <button
          onClick={handleForcePublish}
          disabled={isPending}
          className="inline-flex items-center text-xs font-medium text-[#888] hover:text-white transition-colors disabled:opacity-50"
          title="Mettre à jour la date pour la remonter en page d'accueil"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-1" />}
          Forcer
        </button>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="inline-flex items-center text-xs font-medium text-[#ff4d4d]/70 hover:text-[#ff4d4d] transition-colors disabled:opacity-50"
          title="Supprimer définitivement"
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Supprimer
        </button>
      </td>
    </tr>
  );
}
