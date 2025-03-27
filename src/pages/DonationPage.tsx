
import React from 'react';
import TopNavbar from '@/components/TopNavbar';
import Navigation from '@/components/Navigation';
import DonationForm from '@/components/donation/DonationForm';

const DonationPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNavbar title="Donation" />
      
      <div className="container mx-auto px-4 py-6 pb-20">
        <h1 className="text-2xl font-bold mb-6">Support Our Mission</h1>
        <p className="mb-6 text-gray-600">Your generous donations help us save lives through our blood donation initiatives.</p>
        
        <DonationForm 
          purpose="blood donation support"
          initialAmount={25}
          showRecurringOption={true}
        />
      </div>
      
      <Navigation />
    </div>
  );
};

export default DonationPage;
