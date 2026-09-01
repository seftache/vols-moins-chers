const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jqmpyjxqgoqvrybruien.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxbXB5anhxZ29xdnJ5YnJ1aWVuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjczMjEzOCwiZXhwIjoyMDk4MzA4MTM4fQ.uR9jukWpyw2NbfPeQ4gSPSC0LAyoUwoFBcN9L9MaL9M';

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data, error } = await supabase
    .from('premium_itineraries')
    .select('id, destination_name, flight_details, hotel_details')
    .order('generated_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error(error);
    return;
  }

  console.log("Latest itineraries:");
  for (const it of data) {
    console.log(`Itinerary ID: ${it.id} to ${it.destination_name}`);
    console.log("Hotel Details:", it.hotel_details);
    console.log("-----------------------------------------");
  }
}

run().catch(console.error);
