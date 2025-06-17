
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Mail, ExternalLink, Users, Globe, Shield, Clock } from 'lucide-react';

interface ContentPreviewProps {
  sectionKey: string;
  title?: string;
  description?: string;
  content?: any;
  isActive?: boolean;
}

export const ContentPreview = ({ sectionKey, title, description, content, isActive }: ContentPreviewProps) => {
  const renderFooterContent = () => {
    if (!content) return null;

    switch (sectionKey) {
      case 'company_info':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-blue-600" />
              <span className="font-medium">{content.company_name || 'Company Name'}</span>
            </div>
            <p className="text-sm text-muted-foreground">{content.description || 'Company description goes here...'}</p>
            {content.address && (
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-blue-600 mt-0.5" />
                <span className="text-sm">{content.address}</span>
              </div>
            )}
            {content.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-600" />
                <span className="text-sm">{content.phone}</span>
              </div>
            )}
            {content.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-600" />
                <span className="text-sm">{content.email}</span>
              </div>
            )}
          </div>
        );

      case 'quick_links':
        return (
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Quick Links</h4>
            <div className="space-y-2">
              {content.links?.map((link: any, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <ExternalLink className="h-3 w-3 text-blue-600" />
                  <span className="text-sm hover:text-blue-600 cursor-pointer">{link.label}</span>
                </div>
              )) || <p className="text-xs text-muted-foreground">No links added yet</p>}
            </div>
          </div>
        );

      case 'services':
        return (
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Our Services</h4>
            <div className="space-y-2">
              {content.services?.map((service: string, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <Shield className="h-3 w-3 text-blue-600" />
                  <span className="text-sm">{service}</span>
                </div>
              )) || <p className="text-xs text-muted-foreground">No services added yet</p>}
            </div>
          </div>
        );

      case 'contact_info':
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Contact Information</h4>
            {content.office_hours && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="text-sm">{content.office_hours}</span>
              </div>
            )}
            {content.support_email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-600" />
                <span className="text-sm">{content.support_email}</span>
              </div>
            )}
            {content.emergency_phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium">Emergency: {content.emergency_phone}</span>
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="space-y-3">
            {content.subtitle && (
              <p className="text-sm text-muted-foreground">{content.subtitle}</p>
            )}
            {content.features && Array.isArray(content.features) && (
              <div className="space-y-2">
                <h5 className="text-xs font-medium uppercase tracking-wide">Features</h5>
                <div className="grid grid-cols-1 gap-1">
                  {content.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  const renderAboutContent = () => {
    if (!content) return null;

    return (
      <div className="space-y-4">
        {content.subtitle && (
          <p className="text-sm text-muted-foreground">{content.subtitle}</p>
        )}
        {content.image_url && (
          <div className="w-full h-32 bg-slate-100 rounded-lg flex items-center justify-center">
            <img 
              src={content.image_url} 
              alt={title || 'Section image'} 
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling!.style.display = 'flex';
              }}
            />
            <div className="hidden w-full h-full bg-slate-100 rounded-lg items-center justify-center">
              <span className="text-xs text-muted-foreground">Image Preview</span>
            </div>
          </div>
        )}
        {content.highlights && Array.isArray(content.highlights) && (
          <div className="space-y-2">
            <h5 className="text-xs font-medium uppercase tracking-wide">Key Highlights</h5>
            <div className="grid grid-cols-1 gap-1">
              {content.highlights.map((highlight: string, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                  <span className="text-sm">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {content.stats && (
          <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg">
            {Object.entries(content.stats).map(([key, value]: [string, any]) => (
              <div key={key} className="text-center">
                <div className="text-lg font-bold text-blue-600">{value}</div>
                <div className="text-xs text-muted-foreground capitalize">{key.replace('_', ' ')}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderSupportContent = () => {
    if (!content) return null;

    switch (sectionKey) {
      case 'contact_section':
        return (
          <div className="space-y-4">
            {content.subtitle && (
              <p className="text-sm text-muted-foreground">{content.subtitle}</p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {content.phone && (
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <Phone className="h-5 w-5 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-xs text-muted-foreground">{content.phone}</p>
                </div>
              )}
              {content.email && (
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <Mail className="h-5 w-5 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-xs text-muted-foreground">{content.email}</p>
                </div>
              )}
              {content.hours && (
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <Clock className="h-5 w-5 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm font-medium">Hours</p>
                  <p className="text-xs text-muted-foreground">{content.hours}</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'emergency_section':
        return (
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Phone className="h-5 w-5 text-red-600" />
                <span className="font-semibold text-red-800">Emergency Contact</span>
              </div>
              {content.phone && (
                <p className="text-sm text-red-700">{content.phone}</p>
              )}
              {content.email_text && (
                <p className="text-xs text-red-600 mt-2">{content.email_text}</p>
              )}
            </div>
          </div>
        );

      default:
        if (content.features && Array.isArray(content.features)) {
          return (
            <div className="space-y-3">
              {content.subtitle && (
                <p className="text-sm text-muted-foreground">{content.subtitle}</p>
              )}
              <div className="space-y-2">
                <h5 className="text-xs font-medium uppercase tracking-wide">Features</h5>
                <div className="grid grid-cols-1 gap-1">
                  {content.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        }
        return null;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{title || 'Untitled Section'}</CardTitle>
          <Badge variant={isActive ? "default" : "secondary"} className="text-xs">
            {isActive ? 'Active' : 'Inactive'}
          </Badge>
        </div>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        {sectionKey.includes('footer') && renderFooterContent()}
        {sectionKey.includes('about') && renderAboutContent()}
        {(sectionKey.includes('support') || sectionKey.includes('contact') || sectionKey.includes('emergency')) && renderSupportContent()}
      </CardContent>
    </Card>
  );
};
