import { MetadataRoute } from 'next';
import { supabaseAdmin } from '../lib/supabase-admin';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://uniquevoyage.site';

  // 1. Pages statiques
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
      priority: 0.9,
    },
  ];

  // 2. Pages dynamiques de chaque itinéraire
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

    return [...staticRoutes, ...dynamicRoutes];
  } catch (e) {
    return staticRoutes;
  }
}
