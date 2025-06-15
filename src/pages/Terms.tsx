
import React from 'react';
import Layout from '@/components/layout/Layout';

const Terms = () => {
  return (
    <Layout>
      <section className="pt-8 pb-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground mb-8">
                Last updated: June 15, 2024
              </p>
              
              <h2 className="text-2xl font-bold mb-4">Acceptance of Terms</h2>
              <p className="mb-6">
                By accessing and using this website, you accept and agree to be bound by the terms 
                and provision of this agreement.
              </p>
              
              <h2 className="text-2xl font-bold mb-4">Use License</h2>
              <p className="mb-6">
                Permission is granted to temporarily download one copy of the materials on Martka Petroleum's 
                website for personal, non-commercial transitory viewing only.
              </p>
              
              <h2 className="text-2xl font-bold mb-4">Disclaimer</h2>
              <p className="mb-6">
                The materials on Martka Petroleum's website are provided on an 'as is' basis. 
                Martka Petroleum makes no warranties, expressed or implied.
              </p>
              
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <p>
                For questions about these Terms of Service, please contact us at 
                legal@martkapetroleum.com.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Terms;
