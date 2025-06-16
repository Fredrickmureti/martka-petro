
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, MapPin, Clock, Briefcase } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';

interface CareerCardProps {
  career: Tables<'careers'>;
  onEdit: (career: Tables<'careers'>) => void;
  onDelete: (id: number) => void;
}

export const CareerCard = ({ career, onEdit, onDelete }: CareerCardProps) => {
  const getRequirementsArray = (requirements: any): string[] => {
    if (Array.isArray(requirements)) {
      return requirements;
    }
    return [];
  };

  const requirementsArray = getRequirementsArray(career.requirements);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl mb-2">{career.title}</CardTitle>
            <div className="flex flex-wrap gap-2 mb-2">
              {career.department && <Badge variant="outline">{career.department}</Badge>}
              {career.location && (
                <Badge variant="outline" className="text-blue-600">
                  <MapPin size={12} className="mr-1" />
                  {career.location}
                </Badge>
              )}
              {career.type && (
                <Badge variant="outline">
                  <Clock size={12} className="mr-1" />
                  {career.type}
                </Badge>
              )}
              {career.experience_required && (
                <Badge variant="outline">
                  <Briefcase size={12} className="mr-1" />
                  {career.experience_required}
                </Badge>
              )}
              <Badge variant={career.is_active ? "default" : "secondary"}>
                {career.is_active ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            {career.salary_range && (
              <div className="text-lg font-bold text-blue-600">{career.salary_range}</div>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(career)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(career.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {career.description && (
          <p className="text-muted-foreground mb-4">{career.description}</p>
        )}
        {requirementsArray.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2">Requirements:</h4>
            <ul className="space-y-1">
              {requirementsArray.map((req, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
