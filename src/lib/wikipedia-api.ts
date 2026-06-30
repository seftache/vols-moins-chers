export async function getCityImageUrl(cityName: string): Promise<string | null> {
  try {
    // Nettoyer le nom de la ville (enlever les parenthèses éventuelles comme "Canton (Guangzhou)")
    const cleanName = cityName.replace(/\s*\(.*?\)\s*/g, '').trim();
    
    // Essayer de chercher sur Wikipedia FR
    let url = `https://fr.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${encodeURIComponent(cleanName)}`;
    let response = await fetch(url, { next: { revalidate: 86400 } });
    
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

    // Si pas trouvé, essayer Wikipedia EN
    url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${encodeURIComponent(cleanName)}`;
    response = await fetch(url, { next: { revalidate: 86400 } });
    
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
  } catch (error) {
    console.error(`Erreur Wikipedia API pour la ville ${cityName}:`, error);
  }
  
  return null;
}
