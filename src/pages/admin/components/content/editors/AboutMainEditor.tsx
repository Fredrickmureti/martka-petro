
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface AboutMainEditorProps {
  data: {
    description?: string;
    location?: string;
    team_size?: string;
    founded?: string;
    markets?: string;
    image_url?: string;
    stats?: Record<string, string>;
    highlights?: string[];
  };
  onSave: (data: any) => void;
  isLoading: boolean;
}

export const AboutMainEditor = ({ data, onSave, isLoading }: AboutMainEditorProps) => {
  const [formData, setFormData] = useState({
    description: data.description || '',
    location: data.location || '',
    team_size: data.team_size || '',
    founded: data.founded || '',
    markets: data.markets || '',
    image_url: data.image_url || '',
    stats: data.stats || {},
    highlights: data.highlights || []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleStatsChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      stats: { ...prev.stats, [key]: value }
    }));
  };

  const handleHighlightsChange = (index: number, value: string) => {
    const newHighlights = [...formData.highlights];
    newHighlights[index] = value;
    setFormData(prev => ({ ...prev, highlights: newHighlights }));
  };

  const addHighlight = () => {
    setFormData(prev => ({
      ...prev,
      highlights: [...prev.highlights, '']
    }));
  };

  const removeHighlight = (index: number) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            placeholder="Global Operations"
          />
        </div>
        <div>
          <Label htmlFor="team_size">Team Size</Label>
          <Input
            id="team_size"
            value={formData.team_size}
            onChange={(e) => setFormData(prev => ({ ...prev, team_size: e.target.value }))}
            placeholder="Expert Team"
          />
        </div>
        <div>
          <Label htmlFor="founded">Founded</Label>
          <Input
            id="founded"
            value={formData.founded}
            onChange={(e) => setFormData(prev => ({ ...prev, founded: e.target.value }))}
            placeholder="2020"
          />
        </div>
        <div>
          <Label htmlFor="markets">Markets</Label>
          <Input
            id="markets"
            value={formData.markets}
            onChange={(e) => setFormData(prev => ({ ...prev, markets: e.target.value }))}
            placeholder="International Markets"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Company description"
          rows={4}
        />
      </div>

      <div>
        <Label htmlFor="image_url">Image URL</Label>
        <Input
          id="image_url"
          value={formData.image_url}
          onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div>
        <Label>Statistics</Label>
        <div className="space-y-2">
          {Object.entries(formData.stats).map(([key, value], index) => (
            <div key={index} className="grid grid-cols-2 gap-2">
              <Input
                value={key}
                onChange={(e) => {
                  const newStats = { ...formData.stats };
                  delete newStats[key];
                  newStats[e.target.value] = value;
                  setFormData(prev => ({ ...prev, stats: newStats }));
                }}
                placeholder="Stat name"
              />
              <Input
                value={value}
                onChange={(e) => handleStatsChange(key, e.target.value)}
                placeholder="Stat value"
              />
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => handleStatsChange('', '')}
            className="w-full"
          >
            Add Statistic
          </Button>
        </div>
      </div>

      <div>
        <Label>Key Highlights</Label>
        <div className="space-y-2">
          {formData.highlights.map((highlight, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={highlight}
                onChange={(e) => handleHighlightsChange(index, e.target.value)}
                placeholder="Enter highlight"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => removeHighlight(index)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={addHighlight}
            className="w-full"
          >
            Add Highlight
          </Button>
        </div>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  );
};
