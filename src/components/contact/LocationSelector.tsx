
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';
import WhatsAppButton from '@/components/common/WhatsAppButton';

interface LocationSelectorProps {
  locations: Tables<'locations'>[];
  selectedLocation: Tables<'locations'> | null;
  onLocationSelect: (location: Tables<'locations'>) => void;
}

const LocationSelector = ({ locations, selectedLocation, onLocationSelect }: LocationSelectorProps) => {
  return (
    <div className="space-y-6">
      {/* Location Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {locations.map((location) => (
          <Button
            key={location.id}
            variant={selectedLocation?.id === location.id ? 'default' : 'outline'}
            onClick={() => onLocationSelect(location)}
            className="mb-2"
          >
            <MapPin className="mr-2 h-4 w-4" />
            {location.name}
          </Button>
        ))}
      </div>

      {/* Selected Location Details */}
      {selectedLocation && (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Location Information */}
          <Card className="hover-3d-gentle">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-4 text-blue-600">
                {selectedLocation.name}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="text-blue-600 mt-1 flex-shrink-0" size={18} />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-muted-foreground">
                      {selectedLocation.address}, {selectedLocation.city}, {selectedLocation.country}
                    </p>
                  </div>
                </div>

                {selectedLocation.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="text-blue-600 flex-shrink-0" size={18} />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-muted-foreground">{selectedLocation.phone}</p>
                    </div>
                  </div>
                )}

                {selectedLocation.email && (
                  <div className="flex items-center space-x-3">
                    <Mail className="text-blue-600 flex-shrink-0" size={18} />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">{selectedLocation.email}</p>
                    </div>
                  </div>
                )}

                {selectedLocation.business_hours && (
                  <div className="flex items-start space-x-3">
                    <Clock className="text-blue-600 mt-1 flex-shrink-0" size={18} />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-muted-foreground">{selectedLocation.business_hours}</p>
                    </div>
                  </div>
                )}

                {/* Location-specific WhatsApp Button */}
                {selectedLocation.phone && (
                  <div className="pt-4 border-t">
                    <LocationWhatsAppButton 
                      location={selectedLocation}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Map Section */}
          <Card className="hover-3d-gentle">
            <CardContent className="p-0">
              <div className="h-full min-h-[400px] bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-lg flex items-center justify-center relative">
                {selectedLocation.map_embed_url ? (
                  <iframe
                    src={selectedLocation.map_embed_url}
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                  />
                ) : selectedLocation.map_image_url ? (
                  <img
                    src={selectedLocation.map_image_url}
                    alt={`Map of ${selectedLocation.name}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-center">
                    <MapPin size={48} className="mx-auto mb-4 text-slate-500" />
                    <p className="text-slate-600 dark:text-slate-400">
                      Map for {selectedLocation.name}
                    </p>
                    {selectedLocation.latitude && selectedLocation.longitude && (
                      <p className="text-sm text-slate-500 mt-2">
                        Coordinates: {selectedLocation.latitude}, {selectedLocation.longitude}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

// Location-specific WhatsApp Button Component
interface LocationWhatsAppButtonProps {
  location: Tables<'locations'>;
}

const LocationWhatsAppButton = ({ location }: LocationWhatsAppButtonProps) => {
  const handleWhatsAppClick = () => {
    if (!location.phone) return;
    
    // Clean phone number (remove spaces, dashes, parentheses)
    const cleanPhone = location.phone.replace(/[\s\-\(\)]/g, '');
    const message = `Hello! I'm interested in contacting your ${location.name} office. Could you please provide me with more information about your petroleum infrastructure services?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="w-full bg-green-500 hover:bg-green-600 text-white"
      disabled={!location.phone}
    >
      <Phone className="mr-2" size={18} />
      Chat with {location.name}
    </Button>
  );
};

export default LocationSelector;
