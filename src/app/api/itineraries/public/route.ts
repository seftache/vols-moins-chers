import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../../lib/supabase-admin';
import { unstable_cache } from 'next/cache';

const getCachedItineraries = unstable_cache(
  async () => {
    const { data: itineraries, error } = await supabaseAdmin
      .from('premium_itineraries')
      .select('id, destination_name, generated_at, flight_details')
      .limit(100);

    if (error) {
      throw error;
    }
    return itineraries || [];
  },
  ['public-itineraries-list'],
  { revalidate: 600, tags: ['itineraries'] }
);

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const itineraries = await getCachedItineraries();

    // Grouper par destination et ne retenir que l'itinéraire avec le prix le plus bas (meilleur deal)
    const destinationsMap: Record<string, any> = {};
    
    for (const itinerary of itineraries || []) {
      const destName = itinerary.destination_name.toLowerCase().trim();
      const flight = itinerary.flight_details as any;
      const price = flight ? (flight.price_fcfa || Infinity) : Infinity;
      
      // Si la destination n'existe pas encore ou si ce vol est moins cher, on le garde
      if (!destinationsMap[destName] || price < destinationsMap[destName].price) {
        destinationsMap[destName] = {
          itinerary,
          price
        };
      }
    }

    // Convertir en tableau unique, trier par date de génération descendante et limiter à 6
    const uniqueItineraries = Object.values(destinationsMap)
      .map((item: any) => item.itinerary)
      .sort((a, b) => new Date(b.generated_at).getTime() - new Date(a.generated_at).getTime())
      .slice(0, 6);

    // Associer une image en fonction de la destination (très basique)
    const formattedItineraries = uniqueItineraries.map(itinerary => {
      const dest = itinerary.destination_name.toLowerCase();
      let image = itinerary.flight_details?.destination_image;
      
      // Fallbacks au cas où l'image n'est pas dans flight_details (anciens itinéraires) ou est le default.jpg cassé
      if (!image || image === '/images/destinations/default.jpg') {
        if (dest.includes('dubaï') || dest.includes('dubai')) image = "/images/destinations/dubai.jpg";
        else if (dest.includes('paris')) image = "/images/destinations/Paris.jpg";
        else if (dest.includes('dakar')) image = "/images/destinations/dakar.jpg";
        else if (dest.includes('montréal') || dest.includes('montreal')) image = "/images/destinations/montreal.jpg";
        else if (dest.includes('londres') || dest.includes('london')) image = "/images/destinations/londres.jpg";
        else if (dest.includes('tokyo')) image = "/images/destinations/tokyo.jpg";
        else image = "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop"; // Image avion par défaut esthétique et stable
      }

      return {
        id: itinerary.id,
        title: itinerary.destination_name,
        image: image,
        description: `Découvrez des expériences inoubliables à ${itinerary.destination_name}.`,
        generated_at: itinerary.generated_at,
      };
    });

    return NextResponse.json(formattedItineraries, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
      }
    });
  } catch (error) {
    console.error('Erreur API public itineraries:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur.' }, { status: 500 });
  }
}
