
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import FeaturedStores from '@/components/FeaturedStores';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const Index = () => {
  // Smooth scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <Features />
      
      {/* How It Works Section */}
      <section className="py-20 px-6 md:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-oksale-700 font-medium">Simple Process</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">How OKsale Works</h2>
            <p className="text-oksale-600 max-w-2xl mx-auto">
              Creating your online store with OKsale is easy and straightforward. Follow these simple steps to get started.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Create Your Account',
                description: 'Sign up and complete your merchant profile with basic information about your business.'
              },
              {
                step: '02',
                title: 'Set Up Your Store',
                description: 'Customize your store appearance, connect your payment gateway, and configure shipping options.'
              },
              {
                step: '03',
                title: 'Add Products & Sell',
                description: 'Upload your products with high-quality images, set prices, and start selling to customers.'
              }
            ].map((item, index) => (
              <div key={index} className="relative p-6 border border-oksale-100 rounded-xl bg-white">
                <div className="absolute -top-5 left-6 bg-oksale-800 text-white text-lg font-bold w-10 h-10 rounded-full flex items-center justify-center">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mt-6 mb-3">{item.title}</h3>
                <p className="text-oksale-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Stores Section */}
      <FeaturedStores />
      
      {/* CTA Section */}
      <section className="py-20 px-6 md:px-10 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start selling online?</h2>
          <p className="text-oksale-600 text-lg mb-8">
            Join thousands of merchants who trust OKsale to power their online businesses. 
            No technical skills required, no middlemen taking cuts from your sales.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              className="bg-oksale-800 hover:bg-oksale-900 text-white px-6 py-6 text-lg btn-animation w-full sm:w-auto"
            >
              Create Your Store Now
            </Button>
            <Button 
              variant="outline" 
              className="border-oksale-300 bg-transparent hover:bg-oksale-50 px-6 py-6 text-lg w-full sm:w-auto"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
