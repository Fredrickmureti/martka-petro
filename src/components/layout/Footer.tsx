
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">M</span>
              </div>
              <span className="text-xl font-bold">Martka Petroleum</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              World-class fuel solutions including construction of fuel stations, 
              installation of dispensers, and petroleum infrastructure consulting.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-300 hover:text-blue-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-slate-300 hover:text-blue-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-slate-300 hover:text-blue-400 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-slate-300 hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link to="/services" className="text-slate-300 hover:text-blue-400 transition-colors">Our Services</Link></li>
              <li><Link to="/projects" className="text-slate-300 hover:text-blue-400 transition-colors">Projects</Link></li>
              <li><Link to="/about" className="text-slate-300 hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="text-slate-300 hover:text-blue-400 transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-slate-300">Fuel Station Construction</li>
              <li className="text-slate-300">Dispenser Installation</li>
              <li className="text-slate-300">Computer Kit & POS Systems</li>
              <li className="text-slate-300">Maintenance Services</li>
              <li className="text-slate-300">Infrastructure Design</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <MapPin size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300">123 Petroleum Plaza, Energy District, Houston, TX 77002</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-blue-400" />
                <span className="text-slate-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-blue-400" />
                <span className="text-slate-300">info@martkapetroleum.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm">
              © {currentYear} Martka Petroleum. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-slate-400 hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-slate-400 hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
