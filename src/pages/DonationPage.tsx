
import React from 'react';
import TopNavbar from '@/components/TopNavbar';
import Navigation from '@/components/Navigation';

const DonationPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNavbar title="Donation" />
      
      <div className="container mx-auto px-4 py-6 pb-20">
        <h1 className="text-2xl font-bold mb-6">Donation Page</h1>
        <p>This is the donation page content.</p>
      </div>
      
      <Navigation />
    </div>
  );
};

export default DonationPage;
