
import React from 'react';
import { HomeBanner } from '@/components/HomeBanner';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <HomeBanner />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Welcome to DonorTide</h2>
        <p className="text-gray-700">
          Your platform for managing donations, events, and blood donation activities.
        </p>
      </div>
    </div>
  );
};

export default Home;
