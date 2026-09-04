import { MetadataRoute } from 'next';
import { supabaseAdmin } from '../lib/supabase-admin';
import { getAllRouteSlugs } from '../lib/routes-seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://uniquevoyage.site';

  // 1. Pages statiques principales
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
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
  ];

  // 2. Pages dédiées par liaison de vol (Programmatic SEO ultra-ciblé)
  const routeSlugs = getAllRouteSlugs();
  const routePages: MetadataRoute.Sitemap = routeSlugs.map((slug) => ({
    url: `${baseUrl}/vols/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  // 3. Pages dynamiques de chaque itinéraire
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

    return [...staticRoutes, ...routePages, ...dynamicRoutes];
  } catch (e) {
    return [...staticRoutes, ...routePages];
  }
}
