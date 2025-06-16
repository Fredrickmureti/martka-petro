
import React, { useState } from 'react';
import { Search, Download, MessageCircle, Phone, ChevronDown, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';
import { useSupportPageContent, useSupportFaqs, useSupportDownloads, useSupportOptions } from '@/hooks/useSupportPage';
import { useDocuments } from '@/hooks/useDocuments';
import { Skeleton } from '@/components/ui/skeleton';

const iconMap: { [key: string]: React.ElementType } = {
  Phone,
  MessageCircle,
  Download,
};

const Support = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const { data: content, isLoading: isLoadingContent } = useSupportPageContent();
  const { data: faqs, isLoading: isLoadingFaqs } = useSupportFaqs();
  const { data: downloads, isLoading: isLoadingDownloads } = useSupportDownloads();
  const { data: supportOptions, isLoading: isLoadingSupportOptions } = useSupportOptions();
  const { data: documents, isLoading: isLoadingDocuments } = useDocuments();
  
  const heroContent = content?.hero;
  const helpContent = content?.help_section;
  const faqContent = content?.faq_section;
  const downloadsContent = content?.downloads_section;
  const emergencyContent = content?.emergency_section;
  const emergencyData = emergencyContent?.content as { phone?: string, email_text?: string, button_text?: string };

  const handleSupportAction = (option: any) => {
    if (option.action_type === 'phone' && option.action_url) {
      window.location.href = option.action_url;
    } else if (option.action_type === 'whatsapp' && option.action_url) {
      window.open(option.action_url, '_blank');
    } else if (option.action_type === 'email' && option.action_url) {
      window.location.href = option.action_url;
    } else if (option.action_url) {
      if (option.action_url.startsWith('/')) {
        window.location.href = option.action_url;
      } else {
        window.open(option.action_url, '_blank');
      }
    }
  };

  return (
    <Layout>
      {/* Enhanced Hero Section with 3D Effects */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden perspective-1500">
        {/* Floating geometric shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-24 h-24 bg-blue-400/10 rounded-full blur-xl animate-float-gentle stagger-1"></div>
          <div className="absolute top-40 right-20 w-20 h-20 bg-cyan-400/10 rounded-lg blur-lg animate-pulse-3d stagger-2"></div>
          <div className="absolute bottom-40 left-20 w-16 h-16 bg-blue-300/10 rounded-full blur-lg animate-float-slow stagger-3"></div>
          <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-violet-400/10 rounded-lg blur-md animate-float stagger-4"></div>
        </div>

        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center transform-gpu perspective-1000">
            {isLoadingContent ? (
              <>
                <Skeleton className="h-16 w-3/4 mx-auto mb-6 bg-slate-700" />
                <Skeleton className="h-6 w-full mx-auto bg-slate-700" />
              </>
            ) : (
              <>
                <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight transform hover:scale-105 transition-all duration-700 animate-fade-in-down" 
                    style={{ 
                      animation: 'fadeInDown 1s ease-out, float 8s ease-in-out infinite',
                      transform: 'translateZ(50px)'
                    }}>
                  {heroContent?.title?.split(' ').slice(0, -1).join(' ')}
                  <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent transform hover:scale-110 transition-transform duration-500" 
                        style={{ transform: 'translateZ(80px)' }}>
                    {heroContent?.title?.split(' ').slice(-1)[0]}
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed transform hover:scale-105 transition-all duration-500"
                   style={{ 
                     animation: 'fadeInUp 1s ease-out 0.3s both, floatGentle 6s ease-in-out infinite',
                     transform: 'translateZ(30px)'
                   }}>
                  {heroContent?.description}
                </p>
              </>
            )}
            
            {/* Enhanced Search Bar */}
            <div className="max-w-2xl mx-auto relative transform hover:scale-105 hover:translateZ-20 transition-all duration-500"
                 style={{ animation: 'fadeInUp 1s ease-out 0.6s both' }}>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-xl blur-lg"></div>
              <div className="relative glass-card rounded-xl p-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-300 z-10" size={20} />
                <Input 
                  className="pl-12 pr-4 py-4 text-lg bg-white/10 border-white/20 text-white placeholder-slate-300 backdrop-blur-md"
                  placeholder="Search for help articles, manuals, or FAQs..."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Support Options with 3D Cards */}
      <section className="py-20 bg-background perspective-1200">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 transform hover:scale-105 transition-all duration-500">
            {isLoadingContent ? <Skeleton className="h-9 w-80 mx-auto mb-4" /> : <h2 className="text-4xl font-bold mb-6 animate-fade-in-up">{helpContent?.title}</h2>}
            {isLoadingContent ? <Skeleton className="h-6 w-96 mx-auto" /> : <p className="text-xl text-muted-foreground animate-fade-in-up stagger-1">{helpContent?.description}</p>}
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 perspective-1000">
            {isLoadingSupportOptions ? Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="transform hover:scale-105 transition-all duration-500">
                  <CardContent className="p-8"><Skeleton className="h-48 w-full" /></CardContent>
                </Card>
            )) : (supportOptions || []).map((option, index) => {
              const IconComponent = option.icon ? iconMap[option.icon] || MessageCircle : MessageCircle;
              return (
              <Card key={index} 
                    className="interactive-card hover-3d-gentle group transform-gpu"
                    style={{ 
                      animation: `fadeInUp 0.8s ease-out ${0.1 * (index + 1)}s both`,
                      transformStyle: 'preserve-3d'
                    }}>
                <CardContent className="p-8 card-content">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-6 card-icon group-hover:shadow-2xl group-hover:shadow-blue-500/25 transition-all duration-500">
                    <IconComponent size={32} className="text-white transform group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 card-title group-hover:text-blue-600 transition-colors duration-300">{option.title}</h3>
                  <p className="text-muted-foreground mb-4 transform group-hover:translateZ-10 transition-transform duration-300">{option.description}</p>
                  <p className="text-sm text-blue-600 mb-4 transform group-hover:translateZ-10 transition-transform duration-300">{option.availability}</p>
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 hover:translateZ-10 transition-all duration-300"
                    onClick={() => handleSupportAction(option)}
                  >
                    {option.action_text}
                  </Button>
                </CardContent>
              </Card>
            )})}
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 perspective-1000">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 transform hover:scale-105 transition-all duration-500">
              {isLoadingContent ? <Skeleton className="h-9 w-96 mx-auto mb-4" /> : <h2 className="text-4xl font-bold mb-6 animate-fade-in-up">{faqContent?.title}</h2>}
              {isLoadingContent ? <Skeleton className="h-6 w-full max-w-lg mx-auto" /> : <p className="text-xl text-muted-foreground animate-fade-in-up stagger-1">{faqContent?.description}</p>}
            </div>
            
            <div className="space-y-6">
              {isLoadingFaqs ? Array.from({ length: 6 }).map((_, i) => 
                <Card key={i} className="transform hover:scale-102 transition-all duration-300">
                  <CardContent className="p-4"><Skeleton className="h-6 w-full" /></CardContent>
                </Card>
              ) : (faqs || []).map((faq, index) => (
                <Card key={index} 
                      className="overflow-hidden hover-lift transform-gpu group"
                      style={{ 
                        animation: `fadeInLeft 0.6s ease-out ${0.1 * index}s both`,
                        transformStyle: 'preserve-3d'
                      }}>
                  <CardHeader 
                    className="cursor-pointer hover:bg-slate-100/50 p-6 transition-all duration-300 group-hover:translateZ-5"
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  >
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg transform group-hover:translateZ-10 transition-transform duration-300">{faq.question}</CardTitle>
                      <div className="transform group-hover:translateZ-15 group-hover:scale-110 transition-all duration-300">
                        {expandedFaq === index ? (
                          <ChevronDown size={20} className="text-blue-600 transform rotate-180 transition-transform duration-300" />
                        ) : (
                          <ChevronRight size={20} className="text-slate-400" />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  {expandedFaq === index && (
                    <CardContent className="pt-0 p-6 animate-fade-in-up">
                      <div className="glass-card p-4 rounded-lg transform hover:translateZ-5 transition-transform duration-300">
                        <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Downloads Section */}
      <section className="py-20 bg-background perspective-1200">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 transform hover:scale-105 transition-all duration-500">
            {isLoadingContent ? <Skeleton className="h-9 w-96 mx-auto mb-4" /> : <h2 className="text-4xl font-bold mb-6 animate-fade-in-up">{downloadsContent?.title}</h2>}
            {isLoadingContent ? <Skeleton className="h-6 w-full max-w-lg mx-auto" /> : <p className="text-xl text-muted-foreground animate-fade-in-up stagger-1">{downloadsContent?.description}</p>}
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Database downloads */}
            {isLoadingDownloads ? Array.from({ length: 2 }).map((_, i) => 
              <Card key={i} className="hover-3d-gentle transform transition-all duration-500">
                <CardContent className="p-6"><Skeleton className="h-20 w-full" /></CardContent>
              </Card>
            ) : (downloads || []).map((download, index) => (
              <Card key={`download-${index}`} 
                    className="hover-3d-gentle group transform-gpu"
                    style={{ 
                      animation: `fadeInRight 0.6s ease-out ${0.2 * index}s both`,
                      transformStyle: 'preserve-3d'
                    }}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 transform group-hover:translateZ-10 transition-transform duration-300">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors duration-300">{download.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{download.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-slate-500">
                        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">{download.file_type}</span>
                        <span>{download.file_size}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" 
                            className="transform group-hover:translateZ-20 group-hover:scale-110 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
                            onClick={() => window.open(download.file_url || '#', '_blank')}>
                      <Download size={16} className="mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Document management downloads */}
            {isLoadingDocuments ? Array.from({ length: 2 }).map((_, i) => 
              <Card key={i} className="hover-3d-gentle transform transition-all duration-500">
                <CardContent className="p-6"><Skeleton className="h-20 w-full" /></CardContent>
              </Card>
            ) : (documents || []).map((document, index) => (
              <Card key={`doc-${index}`} 
                    className="hover-3d-gentle group transform-gpu"
                    style={{ 
                      animation: `fadeInLeft 0.6s ease-out ${0.2 * index}s both`,
                      transformStyle: 'preserve-3d'
                    }}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 transform group-hover:translateZ-10 transition-transform duration-300">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors duration-300">{document.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{document.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-slate-500">
                        <span className="bg-green-100 text-green-600 px-2 py-1 rounded">{document.file_type}</span>
                        <span>{document.file_size}</span>
                        <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded capitalize">{document.category}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" 
                            className="transform group-hover:translateZ-20 group-hover:scale-110 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
                            onClick={() => window.open(document.file_url, '_blank')}>
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

      {/* Enhanced Emergency Support Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white perspective-1000 gradient-shift">
        <div className="container mx-auto px-6 text-center">
          <div className="transform hover:scale-105 transition-all duration-500">
            {isLoadingContent ? <Skeleton className="h-9 w-80 mx-auto mb-4 bg-red-500" /> : <h2 className="text-4xl font-bold mb-6 animate-fade-in-up">{emergencyContent?.title}</h2>}
            {isLoadingContent ? <Skeleton className="h-12 w-full max-w-2xl mx-auto bg-red-500" /> : <p className="text-red-100 mb-10 max-w-2xl mx-auto text-lg animate-fade-in-up stagger-1">{emergencyContent?.description}</p>}
            {isLoadingContent ? <Skeleton className="h-12 w-96 mx-auto bg-red-500" /> : (
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  {emergencyData?.phone && (
                  <Button size="lg" 
                          className="bg-white text-red-600 hover:bg-red-50 transform hover:scale-110 hover:translateZ-10 hover:shadow-2xl transition-all duration-300 animate-fade-in-left stagger-2">
                      <Phone className="mr-2 transform group-hover:scale-110 transition-transform duration-300" />
                      {emergencyData.button_text || `Call Emergency: ${emergencyData.phone}`}
                  </Button>
                  )}
                  {emergencyData?.email_text && (
                  <Button size="lg" variant="outline" 
                          className="border-white text-white hover:bg-white hover:text-red-600 transform hover:scale-110 hover:translateZ-10 hover:shadow-2xl transition-all duration-300 animate-fade-in-right stagger-3">
                      {emergencyData.email_text}
                  </Button>
                  )}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Support;
