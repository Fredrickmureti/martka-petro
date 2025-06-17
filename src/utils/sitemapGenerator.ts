
import { fetchProducts } from '@/lib/products';
import { fetchPublicProjects } from '@/lib/projects';

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const generateSitemap = async (): Promise<string> => {
  const baseUrl = window.location.origin;
  const urls: SitemapUrl[] = [];

  // Static pages
  const staticPages = [
    { path: '/', priority: 1.0, changefreq: 'weekly' as const },
    { path: '/products', priority: 0.9, changefreq: 'weekly' as const },
    { path: '/projects', priority: 0.9, changefreq: 'weekly' as const },
    { path: '/services', priority: 0.8, changefreq: 'monthly' as const },
    { path: '/about', priority: 0.7, changefreq: 'monthly' as const },
    { path: '/contact', priority: 0.8, changefreq: 'monthly' as const },
    { path: '/careers', priority: 0.6, changefreq: 'monthly' as const },
    { path: '/support', priority: 0.6, changefreq: 'monthly' as const },
  ];

  staticPages.forEach(page => {
    urls.push({
      loc: `${baseUrl}${page.path}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: page.changefreq,
      priority: page.priority,
    });
  });

  try {
    // Dynamic product pages
    const products = await fetchProducts();
    products.forEach(product => {
      urls.push({
        loc: `${baseUrl}/products/${product.id}`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: 0.8,
      });
    });

    // Dynamic project pages
    const projects = await fetchPublicProjects();
    projects.forEach(project => {
      urls.push({
        loc: `${baseUrl}/projects/${project.slug}`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.7,
      });
    });
  } catch (error) {
    console.error('Error fetching dynamic pages for sitemap:', error);
  }

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return xml;
};

export const downloadSitemap = async () => {
  const xml = await generateSitemap();
  const blob = new Blob([xml], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sitemap.xml';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
