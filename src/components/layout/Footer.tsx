
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { useFooterContent, useHeaderContent } from '@/hooks/useContentManagement';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { data: footerContent } = useFooterContent();
  const { data: headerContent } = useHeaderContent();

  // Use database content or fallback to defaults
  const companyName = headerContent?.company_name || 'Martka Petroleum';
  const logoUrl = headerContent?.logo_url;

  // Helper function to get section content
  const getSectionContent = (sectionKey: string) => {
    return footerContent?.find(section => section.section_key === sectionKey);
  };

  const companyInfo = getSectionContent('company_info');
  const quickLinks = getSectionContent('quick_links');
  const services = getSectionContent('services');
  const contactInfo = getSectionContent('contact_info');
  const legalLinks = getSectionContent('legal_links');

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              {logoUrl ? (
                <img src={logoUrl} alt={companyName} className="w-8 h-8 rounded-lg" />
              ) : (
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">{companyName.charAt(0)}</span>
                </div>
              )}
              <span className="text-xl font-bold">{companyName}</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              {(companyInfo?.content as any)?.description || 'World-class fuel solutions including construction of fuel stations, installation of dispensers, and petroleum infrastructure consulting.'}
            </p>
            <div className="flex space-x-4">
              {(companyInfo?.content as any)?.social_links?.map((link: any, index: number) => (
                <a key={index} href={link.url} className="text-slate-300 hover:text-blue-400 transition-colors">
                  {link.platform === 'facebook' && <Facebook size={20} />}
                  {link.platform === 'twitter' && <Twitter size={20} />}
                  {link.platform === 'linkedin' && <Linkedin size={20} />}
                </a>
              )) || (
                <>
                  <a href="#" className="text-slate-300 hover:text-blue-400 transition-colors">
                    <Facebook size={20} />
                  </a>
                  <a href="#" className="text-slate-300 hover:text-blue-400 transition-colors">
                    <Twitter size={20} />
                  </a>
                  <a href="#" className="text-slate-300 hover:text-blue-400 transition-colors">
                    <Linkedin size={20} />
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{quickLinks?.title || 'Quick Links'}</h3>
            <ul className="space-y-2 text-sm">
              {(quickLinks?.content as any)?.links?.map((link: any, index: number) => (
                <li key={index}>
                  <Link to={link.url} className="text-slate-300 hover:text-blue-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              )) || (
                <>
                  <li><Link to="/" className="text-slate-300 hover:text-blue-400 transition-colors">Home</Link></li>
                  <li><Link to="/services" className="text-slate-300 hover:text-blue-400 transition-colors">Our Services</Link></li>
                  <li><Link to="/projects" className="text-slate-300 hover:text-blue-400 transition-colors">Projects</Link></li>
                  <li><Link to="/about" className="text-slate-300 hover:text-blue-400 transition-colors">About Us</Link></li>
                  <li><Link to="/careers" className="text-slate-300 hover:text-blue-400 transition-colors">Careers</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{services?.title || 'Services'}</h3>
            <ul className="space-y-2 text-sm">
              {(services?.content as any)?.items?.map((item: string, index: number) => (
                <li key={index} className="text-slate-300">{item}</li>
              )) || (
                <>
                  <li className="text-slate-300">Fuel Station Construction</li>
                  <li className="text-slate-300">Dispenser Installation</li>
                  <li className="text-slate-300">Computer Kit & POS Systems</li>
                  <li className="text-slate-300">Maintenance Services</li>
                  <li className="text-slate-300">Infrastructure Design</li>
                </>
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{contactInfo?.title || 'Contact Info'}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <MapPin size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300">
                  {(contactInfo?.content as any)?.address || '123 Petroleum Plaza, Energy District, Houston, TX 77002'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-blue-400" />
                <span className="text-slate-300">
                  {(contactInfo?.content as any)?.phone || '+1 (555) 123-4567'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-blue-400" />
                <span className="text-slate-300">
                  {(contactInfo?.content as any)?.email || 'info@martkapetroleum.com'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm">
              © {currentYear} {companyName}. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              {(legalLinks?.content as any)?.links?.map((link: any, index: number) => (
                <Link key={index} to={link.url} className="text-slate-400 hover:text-blue-400 transition-colors">
                  {link.label}
                </Link>
              )) || (
                <>
                  <Link to="/privacy" className="text-slate-400 hover:text-blue-400 transition-colors">
                    Privacy Policy
                  </Link>
                  <Link to="/terms" className="text-slate-400 hover:text-blue-400 transition-colors">
                    Terms of Service
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
