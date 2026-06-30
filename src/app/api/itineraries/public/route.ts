import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../../lib/supabase-admin';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data: itineraries, error } = await supabaseAdmin
      .from('premium_itineraries')
      .select(`
        id, 
        destination_name, 
        generated_at,
        detected_deals (
          price_fcfa,
          discount_percent
        )
      `)
      .limit(100);

    if (error) {
      console.error('Erreur Supabase lors de la récupération des itinéraires publics :', error);
      return NextResponse.json({ error: 'Erreur lors de la récupération des itinéraires.' }, { status: 500 });
    }

    // Grouper par destination et ne retenir que l'itinéraire avec le prix le plus bas (meilleur deal)
    const destinationsMap: Record<string, any> = {};
    
    for (const itinerary of itineraries || []) {
      const destName = itinerary.destination_name.toLowerCase().trim();
      const deal = itinerary.detected_deals as any;
      const price = deal ? (deal.price_fcfa || Infinity) : Infinity;
      
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
      let image = "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop"; // Avion par défaut
      
      if (dest.includes('dubaï') || dest.includes('dubai')) image = "/images/destinations/dubai.jpg";
      else if (dest.includes('paris')) image = "/images/destinations/Paris.jpg";
      else if (dest.includes('dakar')) image = "/images/destinations/dakar.jpg";
      else if (dest.includes('montréal') || dest.includes('montreal')) image = "/images/destinations/montreal.jpg";
      else if (dest.includes('londres') || dest.includes('london')) image = "/images/destinations/londres.jpg";
      else if (dest.includes('tokyo')) image = "/images/destinations/tokyo.jpg";
      else if (dest.includes('bamako')) image = "https://images.unsplash.com/photo-1614531341673-0402120aa4ea?q=80&w=800&auto=format&fit=crop"; // Default Bamako-style image
      else if (dest.includes('douala') || dest.includes('yaoundé') || dest.includes('yaounde')) image = "https://images.unsplash.com/photo-1547471080-7bc2caa7eaa3?q=80&w=800&auto=format&fit=crop"; // Cameroon nature
      else if (dest.includes('conakry')) image = "https://images.unsplash.com/photo-1588725899388-3e479a059d6f?q=80&w=800&auto=format&fit=crop"; // West Africa coast
      else if (dest.includes('mecque') || dest.includes('jeddah') || dest.includes('djeddah')) image = "https://images.unsplash.com/photo-1590076215667-873d6f00918c?q=80&w=800&auto=format&fit=crop"; // Mecca/Jeddah
      else if (dest.includes('seychelles')) image = "https://images.unsplash.com/photo-1589979482837-e74f2e145060?q=80&w=800&auto=format&fit=crop"; // Seychelles beach
      else if (dest.includes('canton') || dest.includes('guangzhou')) image = "https://images.unsplash.com/photo-1601004123512-b13c723f538e?q=80&w=800&auto=format&fit=crop"; // Guangzhou skyline at night

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
