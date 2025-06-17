
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useSupportPageContent, useSupportFaqs, useSupportDownloads, useSupportOptions } from '@/hooks/useSupportPage';
import { useSupportContentSections } from '@/hooks/useSupportContentSections';
import { useDocuments } from '@/hooks/useDocuments';
import { SupportHero } from './Support/components/SupportHero';
import { SupportContentSections } from './Support/components/SupportContentSections';
import { SupportOptions } from './Support/components/SupportOptions';
import { SupportFAQ } from './Support/components/SupportFAQ';
import { SupportDownloads } from './Support/components/SupportDownloads';
import { SupportContact } from './Support/components/SupportContact';
import { SupportEmergency } from './Support/components/SupportEmergency';

const Support = () => {
  const { data: content, isLoading: isLoadingContent } = useSupportPageContent();
  const { data: faqs, isLoading: isLoadingFaqs } = useSupportFaqs();
  const { data: downloads, isLoading: isLoadingDownloads } = useSupportDownloads();
  const { data: supportOptions, isLoading: isLoadingSupportOptions } = useSupportOptions();
  const { data: documents, isLoading: isLoadingDocuments } = useDocuments();
  const { data: contentSections, isLoading: isLoadingContentSections } = useSupportContentSections();
  
  const heroContent = content?.hero;
  const helpContent = content?.help_section;
  const faqContent = content?.faq_section;
  const downloadsContent = content?.downloads_section;
  const emergencyContent = content?.emergency_section;
  const contactContent = content?.contact_section;
  
  const emergencyData = emergencyContent?.content as { phone?: string, email_text?: string, button_text?: string };
  const contactData = contactContent?.content as { subtitle?: string, phone?: string, email?: string, hours?: string };

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
      <SupportHero heroContent={heroContent} isLoading={isLoadingContent} />
      
      {/* Section Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

      <SupportContentSections 
        sections={contentSections}
        isLoading={isLoadingContentSections}
      />

      {/* Section Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

      <SupportOptions 
        helpContent={helpContent}
        supportOptions={supportOptions}
        isLoadingContent={isLoadingContent}
        isLoadingSupportOptions={isLoadingSupportOptions}
        onSupportAction={handleSupportAction}
      />

      {/* Section Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

      <SupportFAQ 
        faqContent={faqContent}
        faqs={faqs}
        isLoadingContent={isLoadingContent}
        isLoadingFaqs={isLoadingFaqs}
      />

      {/* Section Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

      <SupportDownloads 
        downloadsContent={downloadsContent}
        downloads={downloads}
        documents={documents}
        isLoadingContent={isLoadingContent}
        isLoadingDownloads={isLoadingDownloads}
        isLoadingDocuments={isLoadingDocuments}
      />

      {/* Section Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

      <SupportContact 
        contactContent={contactContent}
        contactData={contactData}
        isLoadingContent={isLoadingContent}
      />

      {/* Section Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

      <SupportEmergency 
        emergencyContent={emergencyContent}
        emergencyData={emergencyData}
        isLoadingContent={isLoadingContent}
      />
    </Layout>
  );
};

export default Support;
