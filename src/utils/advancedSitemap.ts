
import { fetchProducts } from '@/lib/products';
import { fetchPublicProjects } from '@/lib/projects';

interface SitemapUrl {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
  images?: Array<{
    url: string;
    title?: string;
    caption?: string;
  }>;
}

export const generateAdvancedSitemap = async (): Promise<string> => {
  const baseUrl = 'https://martka-petroleum.com';
  const currentDate = new Date().toISOString();
  
  const urls: SitemapUrl[] = [];

  // Static pages with high priority
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'daily' as const },
    { url: '/products', priority: '0.9', changefreq: 'daily' as const },
    { url: '/projects', priority: '0.9', changefreq: 'weekly' as const },
    { url: '/services', priority: '0.8', changefreq: 'weekly' as const },
    { url: '/about', priority: '0.7', changefreq: 'monthly' as const },
    { url: '/contact', priority: '0.8', changefreq: 'monthly' as const },
    { url: '/support', priority: '0.6', changefreq: 'weekly' as const },
    { url: '/careers', priority: '0.6', changefreq: 'weekly' as const },
  ];

  staticPages.forEach(page => {
    urls.push({
      url: `${baseUrl}${page.url}`,
      lastmod: currentDate,
      changefreq: page.changefreq,
      priority: page.priority
    });
  });

  try {
    // Dynamic product pages
    const products = await fetchProducts();
    products.forEach(product => {
      const images = [product.image, ...(product.gallery || [])].filter(Boolean).map(imageUrl => ({
        url: imageUrl,
        title: `${product.name} - ${product.category.name}`,
        caption: product.description
      }));

      urls.push({
        url: `${baseUrl}/products/${product.id}`,
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: product.popular ? '0.8' : '0.7',
        images
      });
    });

    // Dynamic project pages
    const projects = await fetchPublicProjects();
    projects.forEach(project => {
      const images = project.images?.map((img: any) => ({
        url: img.url,
        title: `${project.title} - ${project.location}`,
        caption: project.description
      })) || [];

      urls.push({
        url: `${baseUrl}/projects/${project.slug}`,
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: '0.7',
        images
      });
    });

  } catch (error) {
    console.error('Error fetching dynamic content for sitemap:', error);
  }

  // Generate XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

  urls.forEach(urlObj => {
    xml += `
  <url>
    <loc>${urlObj.url}</loc>
    <lastmod>${urlObj.lastmod}</lastmod>
    <changefreq>${urlObj.changefreq}</changefreq>
    <priority>${urlObj.priority}</priority>`;
    
    if (urlObj.images && urlObj.images.length > 0) {
      urlObj.images.forEach(image => {
        xml += `
    <image:image>
      <image:loc>${image.url}</image:loc>`;
        if (image.title) {
          xml += `
      <image:title>${escapeXml(image.title)}</image:title>`;
        }
        if (image.caption) {
          xml += `
      <image:caption>${escapeXml(image.caption)}</image:caption>`;
        }
        xml += `
    </image:image>`;
      });
    }
    
    xml += `
  </url>`;
  });

  xml += `
</urlset>`;

  return xml;
};

const escapeXml = (str: string): string => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

export const downloadAdvancedSitemap = async () => {
  try {
    const sitemap = await generateAdvancedSitemap();
    const blob = new Blob([sitemap], { type: 'application/xml' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sitemap.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    throw error;
  }
};
