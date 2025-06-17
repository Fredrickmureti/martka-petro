
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className }) => {
  // Generate structured data for breadcrumbs
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `${window.location.origin}${item.href}` : undefined,
    })),
  };

  React.useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    script.id = 'breadcrumb-structured-data';
    
    const existing = document.getElementById('breadcrumb-structured-data');
    if (existing) {
      document.head.removeChild(existing);
    }
    
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('breadcrumb-structured-data');
      if (scriptToRemove) {
        document.head.removeChild(scriptToRemove);
      }
    };
  }, [items]);

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {item.href && index < items.length - 1 ? (
                <BreadcrumbLink asChild>
                  <Link to={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < items.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
