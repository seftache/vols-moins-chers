import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../../lib/supabase-admin';

export async function GET() {
  try {
    const { data: itineraries, error } = await supabaseAdmin
      .from('premium_itineraries')
      .select('id, destination_name, generated_at')
      .order('generated_at', { ascending: false })
      .limit(6);

    if (error) {
      console.error('Erreur Supabase lors de la récupération des itinéraires publics :', error);
      return NextResponse.json({ error: 'Erreur lors de la récupération des itinéraires.' }, { status: 500 });
    }

    // Associer une image en fonction de la destination (très basique)
    const formattedItineraries = itineraries.map(itinerary => {
      const dest = itinerary.destination_name.toLowerCase();
      let image = "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop"; // Avion par défaut
      
      if (dest.includes('dubaï') || dest.includes('dubai')) image = "/images/destinations/dubai.jpg";
      else if (dest.includes('paris')) image = "/images/destinations/Paris.jpg";
      else if (dest.includes('dakar')) image = "/images/destinations/dakar.jpg";
      else if (dest.includes('montréal') || dest.includes('montreal')) image = "/images/destinations/montreal.jpg";
      else if (dest.includes('londres') || dest.includes('london')) image = "/images/destinations/londres.jpg";
      else if (dest.includes('tokyo')) image = "/images/destinations/tokyo.jpg";

      return {
        id: itinerary.id,
        title: itinerary.destination_name,
        image: image,
        description: `Découvrez des expériences inoubliables à ${itinerary.destination_name}.`,
        generated_at: itinerary.generated_at,
      };
    });

    return NextResponse.json(formattedItineraries, { status: 200 });
  } catch (error) {
    console.error('Erreur API public itineraries:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur.' }, { status: 500 });
  }
}
