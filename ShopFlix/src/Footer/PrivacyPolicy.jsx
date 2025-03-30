import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8 sm:p-12">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          Privacy Policy
        </h1>
        
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          Welcome to ShopFlix. We value your privacy and are committed to protecting your personal information.
          This Privacy Policy explains how we collect, use, and share information about you when you use our website and services.
        </p>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Information We Collect</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            When you visit ShopFlix, we collect information to provide you with a seamless shopping and streaming experience. This includes:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed space-y-2">
            <li>
              <strong>Personal Information:</strong> Your name, email address, phone number, and payment details when you create an account or make a purchase.
            </li>
            <li>
              <strong>Usage Data:</strong> Details of your browsing history, search queries, and product interactions, which help us offer personalized recommendations.
            </li>
            <li>
              <strong>Device Information:</strong> Information from your device such as IP address, browser type, and operating system.
            </li>
            <li>
              <strong>Cookies & Tracking:</strong> Cookies are used to enhance your experience and track usage patterns.
            </li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">2. How We Use Your Information</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Your information is used to ensure that ShopFlix operates efficiently and to enhance your user experience. We use your data to:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed space-y-2">
            <li>Process your orders and manage transactions securely.</li>
            <li>Personalize your experience by providing tailored recommendations and targeted promotions.</li>
            <li>Improve our website, products, and services through continuous analysis and innovation.</li>
            <li>Communicate with you regarding updates, offers, and customer support.</li>
            <li>Monitor for and prevent fraudulent activity and ensure the security of our platform.</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Sharing Your Information</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            ShopFlix does not sell your personal information. We may share your data with trusted partners and service providers only as needed to:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed space-y-2">
            <li>Fulfill orders and provide customer service.</li>
            <li>Process payments securely.</li>
            <li>Analyze website usage and improve our services.</li>
          </ul>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            We may also disclose your information when required by law or to protect the rights and safety of our users.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Data Security and Retention</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            The security of your personal data is paramount to us. We implement industry-standard security measures such as encryption,
            secure servers, and continuous monitoring to safeguard your information.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            We retain your information only for as long as necessary to fulfill the purposes for which it was collected or as required by law.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Your Rights and Choices</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            You have the right to access, update, or delete your personal information, as well as to opt out of marketing communications.
            To exercise these rights, please contact our customer support team at <span className="font-semibold">support@shopflix.com</span>.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Changes to This Policy</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            We may update this Privacy Policy from time to time to reflect changes in our practices or regulatory requirements.
            Any significant changes will be communicated via our website and, where appropriate, through direct communication.
          </p>
        </section>
        
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-600">Last updated: August 2025</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
