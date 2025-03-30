import React, { useState } from 'react';

const faqs = [
  {
    question: "What is ShopFlix?",
    answer:
      "ShopFlix is an innovative platform that combines online shopping with streaming entertainment. Join billions of users who enjoy a seamless experience for discovering products and watching movies."
  },
  {
    question: "How does the Movies section work?",
    answer:
      "In the Movies section, you can stream the latest blockbuster movies and exclusive content. Enjoy high-quality streaming and curated recommendations based on your interests."
  },
  {
    question: "How does the Shop section work?",
    answer:
      "Our Shop section offers a curated selection of high-quality products across multiple categories. Whether you're looking for the latest fashion, gadgets, or home essentials, ShopFlix makes shopping easy and enjoyable."
  },
  {
    question: "Is my data secure on ShopFlix?",
    answer:
      "Absolutely. We prioritize your privacy and use state-of-the-art security measures to protect your personal data and ensure safe transactions on our platform."
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "ShopFlix accepts all major credit and debit cards, as well as popular digital payment options, ensuring a hassle-free checkout experience for our global community."
  },
  {
    question: "Can I download movies to watch offline?",
    answer:
      "Yes! ShopFlix allows you to download select movies so you can watch them offline anytime, anywhere."
  },
  {
    question: "Is there a subscription fee for streaming movies?",
    answer:
      "ShopFlix offers both free and premium streaming options. While some content is available for free, our premium subscription unlocks exclusive content and ad-free viewing."
  },
  {
    question: "How can I return a product?",
    answer:
      "If you're not satisfied with your purchase, you can initiate a return through the 'My Orders' section in your account. Follow the instructions to process the return hassle-free."
  },
  {
    question: "Does ShopFlix offer customer support?",
    answer:
      "Yes! Our customer support team is available 24/7 to assist you. You can reach out via chat, email, or phone for any queries or issues."
  },
  {
    question: "How do I track my order?",
    answer:
      "You can track your order in the 'My Orders' section. Once shipped, you'll receive a tracking number to monitor your package in real-time."
  },
  {
    question: "Are there discounts available on ShopFlix?",
    answer:
      "Yes! ShopFlix regularly offers discounts, deals, and exclusive promotions. Keep an eye on our homepage and subscribe to our newsletter for updates."
  },
  {
    question: "Can I share my ShopFlix account with family members?",
    answer:
      "Yes, with a premium subscription, you can create multiple profiles under one account, allowing your family members to enjoy personalized recommendations."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-red-500 to-indigo-500 text-transparent bg-clip-text">
          Frequently Asked Questions
        </h1>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white shadow rounded-lg overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
              >
                <span className="text-lg font-medium text-gray-800">{faq.question}</span>
                <span className="text-gray-500">
                  <svg
                    className={`w-6 h-6 transform transition-transform duration-300 ${activeIndex === index ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              {activeIndex === index && (
                <div className="px-6 py-4 border-t border-gray-200 text-gray-700">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
