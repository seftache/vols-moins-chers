async function getWikiImage(cityName) {
  try {
    const cleanName = cityName.replace(/\s*\(.*?\)\s*/g, '').trim();
    
    // We try several search queries in order of relevance
    const queries = [
      `${cleanName} skyline`,
      `${cleanName} landscape`,
      `${cleanName} city view`,
      cleanName
    ];

    for (const q of queries) {
      const url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=File:${encodeURIComponent(q)}&gsrnamespace=6&prop=imageinfo&iiprop=url&gsrlimit=5&format=json`;
      console.log(`[Query] City: ${cleanName}, URL: ${url}`);
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(`[Response] City: ${cleanName}, Data keys:`, data?.query?.pages ? Object.keys(data.query.pages) : "no pages");
        const pages = data?.query?.pages;
        if (pages) {
          for (const id in pages) {
            const page = pages[id];
            const imgUrl = page.imageinfo?.[0]?.url;
            console.log(`[Image] City: ${cleanName}, imgUrl:`, imgUrl);
            if (imgUrl && (imgUrl.toLowerCase().endsWith('.jpg') || imgUrl.toLowerCase().endsWith('.jpeg') || imgUrl.toLowerCase().endsWith('.png'))) {
              // Exclude logos, coats of arms, flags, maps
              const lower = imgUrl.toLowerCase();
              if (!lower.includes('flag') && !lower.includes('coat_of_arms') && !lower.includes('map') && !lower.includes('logo') && !lower.includes('seal')) {
                return imgUrl;
              }
            }
          }
        }
      }
    }

    // Fallback: standard pageimage
    let url = `https://fr.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${encodeURIComponent(cleanName)}`;
    let response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      const pages = data?.query?.pages;
      if (pages) {
        const pageId = Object.keys(pages)[0];
        if (pageId !== '-1' && pages[pageId].original?.source) {
          return pages[pageId].original.source;
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
  return null;
}

async function run() {
  const cities = ["Bangkok", "Washington", "La Mecque", "Seychelles", "Canton", "Paris", "Dubaï"];
  for (const city of cities) {
    console.log(`${city}:`, await getWikiImage(city));
  }
}

run();
