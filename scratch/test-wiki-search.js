async function getWikiSearchImage(cityName) {
  try {
    // We search Wikipedia Commons for files related to the city + "skyline" or "tourism"
    // e.g. "File:Bangkok skyline" or "File:Bangkok tourism"
    const query = `${cityName} skyline`;
    const url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=File:${encodeURIComponent(query)}&gsrnamespace=6&prop=imageinfo&iiprop=url&gsrlimit=10&format=json`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      const pages = data?.query?.pages;
      if (pages) {
        // Find the first image that is a JPG or PNG (no SVG, no PDF, etc.)
        for (const id in pages) {
          const page = pages[id];
          const url = page.imageinfo?.[0]?.url;
          if (url && (url.toLowerCase().endsWith('.jpg') || url.toLowerCase().endsWith('.jpeg') || url.toLowerCase().endsWith('.png'))) {
            return url;
          }
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
  return null;
}

async function run() {
  console.log("Bangkok:", await getWikiSearchImage("Bangkok"));
  console.log("Washington:", await getWikiSearchImage("Washington"));
}

run();
