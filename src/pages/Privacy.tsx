
import React from 'react';
import Layout from '@/components/layout/Layout';

const Privacy = () => {
  return (
    <Layout>
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground mb-8">
                Last updated: June 15, 2024
              </p>
              
              <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
              <p className="mb-6">
                We collect information you provide directly to us, such as when you create an account, 
                contact us, or use our services. This may include your name, email address, phone number, 
                and company information.
              </p>
              
              <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
              <p className="mb-6">
                We use the information we collect to provide, maintain, and improve our services, 
                communicate with you, and comply with legal obligations.
              </p>
              
              <h2 className="text-2xl font-bold mb-4">Information Sharing</h2>
              <p className="mb-6">
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                without your consent, except as described in this policy.
              </p>
              
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at 
                privacy@martkapetroleum.com.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Privacy;
