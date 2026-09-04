import { permanentRedirect, notFound } from 'next/navigation';
import { getRouteBySlug, getAllRouteSlugs } from '../../../lib/routes-seo';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return getAllRouteSlugs().map((slug) => ({ slug }));
}

export default async function VolRedirectPage({ params }: Props) {
  const { slug } = await params;
  const route = getRouteBySlug(slug);

  if (!route) {
    notFound();
  }

  permanentRedirect(`/vols-pas-chers/${slug}`);
}
