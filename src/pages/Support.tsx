
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
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            {isLoadingContent ? (
              <>
                <Skeleton className="h-16 w-3/4 mx-auto mb-6 bg-slate-700" />
                <Skeleton className="h-6 w-full mx-auto bg-slate-700" />
              </>
            ) : (
              <>
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  {heroContent?.title?.split(' ').slice(0, -1).join(' ')}
                  <span className="block text-blue-400">{heroContent?.title?.split(' ').slice(-1)[0]}</span>
                </h1>
                <p className="text-xl text-slate-300 mb-8">
                  {heroContent?.description}
                </p>
              </>
            )}
            
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
            {isLoadingContent ? <Skeleton className="h-9 w-80 mx-auto mb-4" /> : <h2 className="text-3xl font-bold mb-4">{helpContent?.title}</h2>}
            {isLoadingContent ? <Skeleton className="h-6 w-96 mx-auto" /> : <p className="text-muted-foreground">{helpContent?.description}</p>}
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {isLoadingSupportOptions ? Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}><CardContent className="p-8"><Skeleton className="h-48 w-full" /></CardContent></Card>
            )) : (supportOptions || []).map((option, index) => {
              const IconComponent = option.icon ? iconMap[option.icon] || MessageCircle : MessageCircle;
              return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <IconComponent size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                  <p className="text-muted-foreground mb-4">{option.description}</p>
                  <p className="text-sm text-blue-600 mb-4">{option.availability}</p>
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700"
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

      {/* FAQ Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              {isLoadingContent ? <Skeleton className="h-9 w-96 mx-auto mb-4" /> : <h2 className="text-3xl font-bold mb-4">{faqContent?.title}</h2>}
              {isLoadingContent ? <Skeleton className="h-6 w-full max-w-lg mx-auto" /> : <p className="text-muted-foreground">{faqContent?.description}</p>}
            </div>
            
            <div className="space-y-4">
              {isLoadingFaqs ? Array.from({ length: 6 }).map((_, i) => <Card key={i}><CardContent className="p-4"><Skeleton className="h-6 w-full" /></CardContent></Card>) : (faqs || []).map((faq, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader 
                    className="cursor-pointer hover:bg-slate-100 p-4 transition-colors"
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
                    <CardContent className="pt-0 p-4">
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
            {isLoadingContent ? <Skeleton className="h-9 w-96 mx-auto mb-4" /> : <h2 className="text-3xl font-bold mb-4">{downloadsContent?.title}</h2>}
            {isLoadingContent ? <Skeleton className="h-6 w-full max-w-lg mx-auto" /> : <p className="text-muted-foreground">{downloadsContent?.description}</p>}
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Database downloads */}
            {isLoadingDownloads ? Array.from({ length: 2 }).map((_, i) => <Card key={i}><CardContent className="p-6"><Skeleton className="h-20 w-full" /></CardContent></Card>) : (downloads || []).map((download, index) => (
              <Card key={`download-${index}`} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">{download.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{download.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-slate-500">
                        <span>{download.file_type}</span>
                        <span>{download.file_size}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => window.open(download.file_url || '#', '_blank')}>
                      <Download size={16} className="mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Document management downloads */}
            {isLoadingDocuments ? Array.from({ length: 2 }).map((_, i) => <Card key={i}><CardContent className="p-6"><Skeleton className="h-20 w-full" /></CardContent></Card>) : (documents || []).map((document, index) => (
              <Card key={`doc-${index}`} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">{document.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{document.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-slate-500">
                        <span>{document.file_type}</span>
                        <span>{document.file_size}</span>
                        <span className="capitalize">{document.category}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => window.open(document.file_url, '_blank')}>
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
          {isLoadingContent ? <Skeleton className="h-9 w-80 mx-auto mb-4 bg-red-500" /> : <h2 className="text-3xl font-bold mb-4">{emergencyContent?.title}</h2>}
          {isLoadingContent ? <Skeleton className="h-12 w-full max-w-2xl mx-auto bg-red-500" /> : <p className="text-red-100 mb-8 max-w-2xl mx-auto">{emergencyContent?.description}</p>}
          {isLoadingContent ? <Skeleton className="h-12 w-96 mx-auto bg-red-500" /> : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {emergencyData?.phone && (
                <Button size="lg" className="bg-white text-red-600 hover:bg-red-50">
                    <Phone className="mr-2" />
                    {emergencyData.button_text || `Call Emergency: ${emergencyData.phone}`}
                </Button>
                )}
                {emergencyData?.email_text && (
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
                    {emergencyData.email_text}
                </Button>
                )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Support;
