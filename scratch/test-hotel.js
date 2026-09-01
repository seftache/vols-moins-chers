const RAPIDAPI_KEY = 'f24bfd4f2dmshedfdbbb2f462307p1ef121jsnd7626ae57af2';
const RAPIDAPI_HOST = 'booking-com15.p.rapidapi.com';

async function test() {
  const url = new URL('https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels');
  url.searchParams.set('dest_id', '-3414440'); // Bangkok
  url.searchParams.set('search_type', 'city');
  url.searchParams.set('arrival_date', '2026-10-10');
  url.searchParams.set('departure_date', '2026-10-15');
  url.searchParams.set('adults', '2');
  url.searchParams.set('room_qty', '1');
  url.searchParams.set('page_number', '1');
  url.searchParams.set('units', 'metric');
  url.searchParams.set('temperature_unit', 'c');
  url.searchParams.set('languagecode', 'fr');
  url.searchParams.set('currency_code', 'EUR');
  url.searchParams.set('sort_by', 'review_score');
  url.searchParams.set('categories_filter', 'class::4,class::5');

  console.log("Fetching from Booking.com API...");
  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'x-rapidapi-key': RAPIDAPI_KEY,
      'x-rapidapi-host': RAPIDAPI_HOST,
    },
  });

  const json = await response.json();
  const hotels = json?.data?.hotels;
  if (!hotels || hotels.length === 0) {
    console.log("No hotels found or API error:", json);
    return;
  }

  const firstHotel = hotels[0];
  console.log("Keys of first hotel:", Object.keys(firstHotel));
  console.log("Keys of firstHotel.property:", Object.keys(firstHotel.property));
  console.log("Property detail values:", {
    id: firstHotel.property.id,
    name: firstHotel.property.name,
    countryCode: firstHotel.property.countryCode,
    wishlistName: firstHotel.property.wishlistName,
    propertyClass: firstHotel.property.propertyClass,
  });
  console.log("Let's look if there is any URL property anywhere in firstHotel:", 
    Object.keys(firstHotel).filter(k => k.toLowerCase().includes('url') || typeof firstHotel[k] === 'string' && firstHotel[k].includes('http'))
  );
  console.log("Let's look if there is any URL property in property:", 
    Object.keys(firstHotel.property).filter(k => k.toLowerCase().includes('url') || typeof firstHotel.property[k] === 'string' && firstHotel.property[k].includes('http'))
  );
}

test().catch(console.error);
