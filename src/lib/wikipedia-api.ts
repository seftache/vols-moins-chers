const cityAliases: Record<string, string> = {
  'canton': 'Guangzhou',
  'la mecque': 'Mecca',
  'seychelles': 'Seychelles',
  'washington': 'Washington D.C.',
  'jeddah': 'Jeddah',
  'djeddah': 'Jeddah'
};

export async function getCityImageUrl(cityName: string): Promise<string | null> {
  try {
    let cleanName = cityName.replace(/\s*\(.*?\)\s*/g, '').trim();
    const lowerName = cleanName.toLowerCase();
    
    // Appliquer l'alias si disponible
    if (cityAliases[lowerName]) {
      cleanName = cityAliases[lowerName];
    }

    // Requêtes de recherche par ordre de pertinence
    const queries = [
      `${cleanName} skyline`,
      `${cleanName} landscape`,
      `${cleanName} city view`,
      cleanName
    ];

    for (const q of queries) {
      const url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=File:${encodeURIComponent(q)}&gsrnamespace=6&prop=imageinfo&iiprop=url&gsrlimit=5&format=json`;
      const response = await fetch(url, { next: { revalidate: 86400 } }); // Cache de 24h
      
      if (response.ok) {
        const data = await response.json();
        const pages = data?.query?.pages;
        if (pages) {
          for (const id in pages) {
            const page = pages[id];
            const imgUrl = page.imageinfo?.[0]?.url;
            if (imgUrl) {
              const lower = imgUrl.toLowerCase();
              
              // S'assurer que c'est un format d'image valide et pas un plan/carte/logo
              const isValidFormat = lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.png');
              const isNotGraphic = !lower.includes('flag') && 
                                   !lower.includes('coat_of_arms') && 
                                   !lower.includes('map') && 
                                   !lower.includes('logo') && 
                                   !lower.includes('seal') &&
                                   !lower.includes('symbol') &&
                                   !lower.includes('chart') &&
                                   !lower.includes('graph') &&
                                   !lower.includes('drawing') &&
                                   !lower.includes('icon') &&
                                   !lower.includes('structure');

              if (isValidFormat && isNotGraphic) {
                return imgUrl;
              }
            }
          }
        }
      }
    }

    // Deuxième fallback: Essayer la pageimage standard de Wikipedia FR
    const frUrl = `https://fr.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${encodeURIComponent(cleanName)}`;
    const frRes = await fetch(frUrl, { next: { revalidate: 86400 } });
    if (frRes.ok) {
      const frData = await frRes.json();
      const pages = frData?.query?.pages;
      if (pages) {
        const pageId = Object.keys(pages)[0];
        if (pageId !== '-1' && pages[pageId].original?.source) {
          const imgUrl = pages[pageId].original.source;
          const lower = imgUrl.toLowerCase();
          if (!lower.includes('flag') && !lower.includes('coat_of_arms') && !lower.includes('map') && !lower.includes('logo')) {
            return imgUrl;
          }
        }
      }
    }
  } catch (error) {
    console.error(`Erreur Wikipedia API pour la ville ${cityName}:`, error);
  }
  
  // Fallback ultime : une magnifique photo générique de voyage stable
  return "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop";
}
