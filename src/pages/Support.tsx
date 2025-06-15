
import React, { useState } from 'react';
import { Search, Download, MessageCircle, Phone, ChevronDown, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';

const Support = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What maintenance services do you provide?',
      answer: 'We offer comprehensive maintenance including preventive maintenance, emergency repairs, equipment upgrades, compliance auditing, and 24/7 monitoring services for all fuel infrastructure components.',
    },
    {
      question: 'How long does fuel station construction typically take?',
      answer: 'Construction timelines vary based on project scope, but typical fuel station construction takes 8-12 weeks from groundbreaking to completion, including permits, excavation, installation, and testing.',
    },
    {
      question: 'Do you provide training for new equipment?',
      answer: 'Yes, we provide comprehensive training programs for all equipment installations, including operator training, technical documentation, and ongoing support to ensure safe and efficient operation.',
    },
    {
      question: 'What safety standards do you follow?',
      answer: 'We adhere to all federal, state, and local safety regulations including EPA, OSHA, and industry-specific standards. Our installations exceed minimum requirements for environmental protection and operational safety.',
    },
    {
      question: 'How do I schedule emergency maintenance?',
      answer: 'For emergency maintenance, call our 24/7 emergency line at +1 (555) 123-4568. Our technicians are on standby to respond to critical issues that could affect safety or operations.',
    },
    {
      question: 'What warranty do you provide on installations?',
      answer: 'We provide comprehensive warranties on all installations: 5 years on structural work, 3 years on equipment installations, and 1 year on maintenance services, with extended warranty options available.',
    },
  ];

  const downloads = [
    {
      title: 'Product Catalog 2024',
      description: 'Complete overview of our fuel infrastructure solutions',
      size: '2.3 MB',
      type: 'PDF',
    },
    {
      title: 'Maintenance Guidelines',
      description: 'Best practices for fuel equipment maintenance',
      size: '1.8 MB',
      type: 'PDF',
    },
    {
      title: 'Safety Protocols Manual',
      description: 'Comprehensive safety procedures and protocols',
      size: '3.1 MB',
      type: 'PDF',
    },
    {
      title: 'Installation Specifications',
      description: 'Technical specifications for equipment installation',
      size: '2.7 MB',
      type: 'PDF',
    },
  ];

  const supportOptions = [
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with our technical experts',
      action: 'Call Now',
      availability: 'Mon-Fri, 8AM-6PM',
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      action: 'Start Chat',
      availability: 'Available 24/7',
    },
    {
      icon: Download,
      title: 'Documentation',
      description: 'Access manuals, guides, and resources',
      action: 'Browse Docs',
      availability: 'Always Available',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Support
              <span className="block text-blue-400">Center</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Get the help you need with comprehensive support resources, 
              documentation, and expert assistance.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <Input 
                className="pl-12 pr-4 py-4 text-lg bg-white/10 border-white/20 text-white placeholder-slate-300"
                placeholder="Search for help articles, manuals, or FAQs..."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How Can We Help You?</h2>
            <p className="text-muted-foreground">Choose the support option that works best for you</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {supportOptions.map((option, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <option.icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                  <p className="text-muted-foreground mb-4">{option.description}</p>
                  <p className="text-sm text-blue-600 mb-4">{option.availability}</p>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700">
                    {option.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Find answers to common questions about our services</p>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader 
                    className="cursor-pointer hover:bg-slate-50 transition-colors"
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  >
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                      {expandedFaq === index ? (
                        <ChevronDown size={20} className="text-blue-600" />
                      ) : (
                        <ChevronRight size={20} className="text-slate-400" />
                      )}
                    </div>
                  </CardHeader>
                  {expandedFaq === index && (
                    <CardContent className="pt-0">
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Downloads Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Downloads & Resources</h2>
            <p className="text-muted-foreground">Access technical documentation, manuals, and guides</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {downloads.map((download, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">{download.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{download.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-slate-500">
                        <span>{download.type}</span>
                        <span>{download.size}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download size={16} className="mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Support */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Emergency Support</h2>
          <p className="text-red-100 mb-8 max-w-2xl mx-auto">
            For critical issues affecting safety or operations, our emergency support team 
            is available 24/7 to provide immediate assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-red-600 hover:bg-red-50">
              <Phone className="mr-2" />
              Call Emergency: +1 (555) 123-4568
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
              Emergency Email Support
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Support;
