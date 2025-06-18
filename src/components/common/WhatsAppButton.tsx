
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCompanyContact } from '@/hooks/useCompanyContact';

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
  variant?: 'fixed' | 'inline';
  messageType?: 'general' | 'quote' | 'careers';
  children?: React.ReactNode;
}

const WhatsAppButton = ({ 
  message,
  className = "",
  variant = "fixed",
  messageType = "general",
  children
}: WhatsAppButtonProps) => {
  const { data: contact } = useCompanyContact();

  const getDefaultMessage = () => {
    switch (messageType) {
      case 'quote':
        return "Hello! I'm interested in getting a quote for your petroleum infrastructure services. Could you please provide me with more information about your offerings and pricing?";
      case 'careers':
        return "Hello! I'm interested in career opportunities at your company. Could you please share information about current openings or future opportunities?";
      default:
        return "Hello! I'm interested in your petroleum infrastructure services and would like to learn more about how you can help with my project.";
    }
  };

  const finalMessage = message || getDefaultMessage();
  
  const handleWhatsAppClick = () => {
    if (!contact?.phone) return;
    
    // Clean phone number (remove spaces, dashes, parentheses)
    const cleanPhone = contact.phone.replace(/[\s\-\(\)]/g, '');
    const encodedMessage = encodeURIComponent(finalMessage);
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  if (variant === 'fixed') {
    return (
      <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
        <Button
          onClick={handleWhatsAppClick}
          size="lg"
          className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 p-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          aria-label="Contact us on WhatsApp"
          disabled={!contact?.phone}
        >
          <MessageCircle size={24} />
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={handleWhatsAppClick}
      className={`bg-green-500 hover:bg-green-600 text-white ${className}`}
      disabled={!contact?.phone}
    >
      <MessageCircle className="mr-2" size={18} />
      {children || "WhatsApp"}
    </Button>
  );
};

export default WhatsAppButton;
