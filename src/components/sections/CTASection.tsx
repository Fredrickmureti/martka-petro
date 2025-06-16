
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import WhatsAppButton from '@/components/common/WhatsAppButton';

const CTASection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10"></div>
      <div className="container mx-auto px-6 text-center relative">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Start Your Project?
        </h2>
        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
          Get in touch with our experts today and let us discuss how we can help you achieve your petroleum infrastructure goals.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <div>
            <WhatsAppButton 
              messageType="quote"
              variant="inline"
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
            />
          </div>
          <div>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-800 bg-transparent px-8 py-4 text-lg"
              onClick={() => navigate('/projects')}
            >
              View Our Portfolio
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
