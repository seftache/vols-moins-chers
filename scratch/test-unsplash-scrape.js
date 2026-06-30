async function getUnsplashImage(cityName) {
  try {
    const url = `https://unsplash.com/s/photos/${encodeURIComponent(cityName)}+travel`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (!response.ok) return null;
    const html = await response.text();
    
    // Find all links matching https://images.unsplash.com/photo-...
    const regex = /https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-_]+(?:\?[a-zA-Z0-9\-_=&;]+)?/g;
    const matches = html.match(regex);
    if (matches && matches.length > 0) {
      // Find the first image that has auto=format&fit=crop and w=800 (or similar parameters)
      // Usually the search page contains several high-res photos
      // Let's filter out profile images (which are small)
      const validImages = matches.filter(img => img.includes('auto=format') || img.includes('crop'));
      if (validImages.length > 0) {
        // clean up the URL to make it a nice 800px preview
        const base = validImages[0].split('?')[0];
        return `${base}?q=80&w=800&auto=format&fit=crop`;
      }
      return matches[0];
    }
  } catch (err) {
    console.error(err);
  }
  return null;
}

async function run() {
  console.log("Bangkok:", await getUnsplashImage("Bangkok"));
  console.log("Washington:", await getUnsplashImage("Washington"));
}

run();
