
import React, { useEffect, useRef } from 'react';
import { ShoppingBag, CreditCard, User, Package } from 'lucide-react';

const features = [
  {
    icon: ShoppingBag,
    title: 'Custom Store URL',
    description: 'Get your unique store URL (yourplatform.com/@storename) or use your own domain.',
    delay: '0.1s'
  },
  {
    icon: CreditCard,
    title: 'Direct Payments',
    description: 'Payments go directly to your account. Connect your preferred payment gateway.',
    delay: '0.2s'
  },
  {
    icon: User,
    title: 'Guest Checkout',
    description: 'Customers can purchase without creating an account for a smooth experience.',
    delay: '0.3s'
  },
  {
    icon: Package,
    title: 'Product Management',
    description: 'Easily add, edit, and organize your products with our intuitive dashboard.',
    delay: '0.4s'
  }
];

const Features = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (featuresRef.current) {
      const elements = featuresRef.current.querySelectorAll('.text-reveal');
      elements.forEach((el) => observer.observe(el));
    }

    return () => {
      if (featuresRef.current) {
        const elements = featuresRef.current.querySelectorAll('.text-reveal');
        elements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  return (
    <section ref={featuresRef} className="py-20 px-6 md:px-10 bg-white">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <span className="inline-block text-oksale-700 font-medium mb-4 text-reveal">Features</span>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-reveal" style={{ transitionDelay: '0.1s' }}>
          Everything you need to sell online
        </h2>
        <p className="text-oksale-600 max-w-2xl mx-auto text-lg text-reveal" style={{ transitionDelay: '0.2s' }}>
          OKsale provides all the tools you need to create, manage, and grow your online store without any technical knowledge.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-reveal"
            style={{ transitionDelay: feature.delay }}
          >
            <div className="w-12 h-12 bg-oksale-100 rounded-lg flex items-center justify-center mb-5">
              <feature.icon className="h-6 w-6 text-oksale-700" />
            </div>
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-oksale-600">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 relative overflow-hidden rounded-2xl bg-oksale-800 text-white text-reveal" style={{ transitionDelay: '0.5s' }}>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-oksale-300"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-oksale-400"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 p-8 md:p-12 lg:p-16">
          <div className="lg:pr-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">Your store, your way</h3>
            <p className="text-oksale-100 mb-8">
              Customize everything from your store's look and feel to how customers interact with your products. No coding required.
            </p>

            <ul className="space-y-4">
              {[
                'Fully customizable store design',
                'Multiple product display options',
                'Custom checkout experience',
                'Mobile-optimized by default'
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <svg className="h-6 w-6 text-oksale-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 lg:mt-0 flex justify-center items-center">
            <div className="relative w-full max-w-sm aspect-[3/4] bg-white rounded-xl overflow-hidden shadow-2xl">
              <div className="h-20 bg-oksale-700 flex items-center px-4">
                <div className="w-8 h-8 bg-white rounded-md mr-3"></div>
                <div>
                  <div className="h-3 w-24 bg-white rounded-full"></div>
                  <div className="h-2 w-16 bg-white bg-opacity-70 rounded-full mt-2"></div>
                </div>
              </div>
              <div className="p-4 space-y-4">
                <div className="w-full h-36 bg-oksale-100 rounded-lg"></div>
                <div className="w-full h-4 bg-oksale-200 rounded-full"></div>
                <div className="w-2/3 h-4 bg-oksale-200 rounded-full"></div>
                <div className="w-1/2 h-8 bg-oksale-300 rounded-md mt-6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
