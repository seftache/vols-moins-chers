import { MetadataRoute } from 'next';
import { supabaseAdmin } from '../lib/supabase-admin';
import { getAllRouteSlugs, getAllHubSlugs } from '../lib/routes-seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://uniquevoyage.site';

  // 1. Pages statiques principales & Hub Central
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/vols-pas-chers`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/offres`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/conditions-utilisation`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // 2. Grands Hubs Régionaux SEO
  const hubSlugs = getAllHubSlugs();
  const hubPages: MetadataRoute.Sitemap = hubSlugs.map((slug) => ({
    url: `${baseUrl}/vols-pas-chers/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.95,
  }));

  // 3. Pages dédiées par liaison de vol (/vols-pas-chers/[slug])
  const routeSlugs = getAllRouteSlugs();
  const routePages: MetadataRoute.Sitemap = routeSlugs.map((slug) => ({
    url: `${baseUrl}/vols-pas-chers/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  // 4. Pages dynamiques de chaque itinéraire
  try {
    const { data: itineraries } = await supabaseAdmin
      .from('premium_itineraries')
      .select('id, generated_at');

    const dynamicRoutes: MetadataRoute.Sitemap = (itineraries || []).map((item) => ({
      url: `${baseUrl}/itinerary/${item.id}`,
      lastModified: new Date(item.generated_at || new Date()),
      changeFrequency: 'daily',
      priority: 0.8,
    }));

    return [...staticRoutes, ...hubPages, ...routePages, ...dynamicRoutes];
  } catch (e) {
    return [...staticRoutes, ...hubPages, ...routePages];
  }
}
