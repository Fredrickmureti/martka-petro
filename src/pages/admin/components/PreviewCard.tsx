
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';

interface ProductPreviewCardProps {
  product: Tables<'products'> & {
    product_categories?: { name: string } | null;
  };
  onEdit: (product: Tables<'products'>) => void;
  onDelete: (id: number) => void;
  onView?: (product: Tables<'products'>) => void;
}

interface ProjectPreviewCardProps {
  project: Tables<'projects'>;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onView?: (project: Tables<'projects'>) => void;
}

export const ProductPreviewCard = ({ 
  product, 
  onEdit, 
  onDelete, 
  onView 
}: ProductPreviewCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-200">
      {product.image_url && (
        <div className="aspect-video overflow-hidden bg-muted">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.svg';
            }}
          />
        </div>
      )}
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {onView && (
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onView(product)}
                className="h-8 w-8"
              >
                <Eye className="h-4 w-4" />
              </Button>
            )}
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onEdit(product)}
              className="h-8 w-8"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onDelete(product.id)}
              className="h-8 w-8 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {product.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>
          )}
          
          <div className="flex flex-wrap gap-2">
            {product.product_categories?.name && (
              <Badge variant="secondary">{product.product_categories.name}</Badge>
            )}
            {product.manufacturer && (
              <Badge variant="outline">{product.manufacturer}</Badge>
            )}
            <Badge variant={product.in_stock ? 'default' : 'secondary'}>
              {product.in_stock ? 'In Stock' : 'Out of Stock'}
            </Badge>
            {product.popular && (
              <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">
                Popular
              </Badge>
            )}
          </div>
          
          {product.price && (
            <div className="text-lg font-semibold text-primary">
              {product.price}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export const ProjectPreviewCard = ({ 
  project, 
  onEdit, 
  onDelete, 
  onView 
}: ProjectPreviewCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-200">
      {project.hero_image_url && (
        <div className="aspect-video overflow-hidden bg-muted">
          <img
            src={project.hero_image_url}
            alt={project.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.svg';
            }}
          />
        </div>
      )}
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg line-clamp-2">{project.name}</CardTitle>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {onView && (
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onView(project)}
                className="h-8 w-8"
              >
                <Eye className="h-4 w-4" />
              </Button>
            )}
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onEdit(project.id)}
              className="h-8 w-8"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onDelete(project.id)}
              className="h-8 w-8 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {project.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {project.description}
            </p>
          )}
          
          <div className="flex flex-wrap gap-2">
            {project.category && (
              <Badge variant="secondary">{project.category}</Badge>
            )}
            {project.location && (
              <Badge variant="outline">{project.location}</Badge>
            )}
            {project.status && (
              <Badge 
                variant={project.status === 'Completed' ? 'default' : 'secondary'}
              >
                {project.status}
              </Badge>
            )}
            {project.year && (
              <Badge variant="outline">{project.year}</Badge>
            )}
          </div>
          
          <div className="text-sm text-muted-foreground">
            {project.client && <div>Client: {project.client}</div>}
            {project.area && <div>Area: {project.area}</div>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
