
import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Headquarters',
      details: ['123 Petroleum Plaza', 'Energy District', 'Houston, TX 77002'],
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['+1 (555) 123-4567', '+1 (555) 123-4568 (Emergency)'],
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@martkapetroleum.com', 'support@martkapetroleum.com'],
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Mon - Fri: 8:00 AM - 6:00 PM', 'Emergency: 24/7 Available'],
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Get In
              <span className="block text-blue-400">Touch</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Ready to discuss your fuel infrastructure project? We're here to help 
              you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Send Us a Message</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <Input placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <Input placeholder="Doe" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input type="email" placeholder="john@company.com" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <Input type="tel" placeholder="+1 (555) 123-4567" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Company</label>
                  <Input placeholder="Your Company Name" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Service Interest</label>
                  <select className="w-full p-3 border border-input rounded-md bg-background">
                    <option>Select a service</option>
                    <option>Fuel Station Construction</option>
                    <option>Dispenser Installation</option>
                    <option>Computer Kit & POS Systems</option>
                    <option>Maintenance Services</option>
                    <option>Custom Infrastructure Design</option>
                    <option>Consulting</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea 
                    className="w-full p-3 border border-input rounded-md bg-background h-32 resize-none"
                    placeholder="Tell us about your project requirements..."
                  />
                </div>
                
                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center flex-shrink-0">
                          <info.icon size={24} className="text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-2">{info.title}</h3>
                          {info.details.map((detail, detailIndex) => (
                            <p key={detailIndex} className="text-muted-foreground">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quick Actions */}
              <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
                <CardHeader>
                  <CardTitle>Need Immediate Assistance?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-100 mb-4">
                    For urgent technical support or emergency services, contact us directly.
                  </p>
                  <div className="space-y-3">
                    <Button className="w-full bg-white text-blue-600 hover:bg-blue-50">
                      Call Emergency Line
                    </Button>
                    <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-blue-600">
                      Schedule Consultation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Visit Our Headquarters</h2>
            <p className="text-muted-foreground">
              Located in the heart of Houston's energy district
            </p>
          </div>
          
          <Card className="overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={48} className="text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-600 mb-2">Interactive Map</h3>
                <p className="text-slate-500">
                  123 Petroleum Plaza, Houston, TX 77002
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
