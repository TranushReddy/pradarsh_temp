import React, { useState } from 'react';

const FAQ_ITEMS = [
  {
    question: "What is Pradarsh?",
    answer: "Pradarsh is a platform for developers to showcase their projects and portfolios and connect with the community. It allows builders to share functioning live demos, GitHub repositories, and developer stack specs."
  },
  {
    question: "Is there a limit on how many builds I can publish?",
    answer: "Currently, you can catalog as many projects as you build! We encourage keeping your listings updated with accurate summaries and screenshots to help other developers discover your work."
  },
  {
    question: "Can I customize the featured items on my developer profile?",
    answer: "Yes. All items you configure and deploy from your console dashboard will associate with your profile handle. You can update category selections and tech tags dynamically at any time."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-left">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">Frequently Asked Queries</h2>
        <p className="text-xs text-slate-500 mt-1">Answers regarding catalog directories and developer features.</p>
      </div>

      <div className="space-y-5">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = activeIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white border border-slate-200/85 rounded-3xl overflow-hidden hover:bg-gradient-to-r hover:from-white hover:to-accent-100/30 hover:border-primary-300 hover:shadow-xl hover:shadow-primary-500/10 hover:-translate-y-1 transition-all duration-300 shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full flex items-center justify-between px-8 py-6 focus:outline-none text-left cursor-pointer group"
              >
                <span className="text-sm sm:text-base font-bold text-slate-700 group-hover:text-primary-600 transition-colors">
                  {item.question}
                </span>
                <span className="text-lg text-primary-500 ml-4 font-mono font-bold group-hover:scale-110 transition-transform">
                  {isOpen ? '−' : '+'}
                </span>
              </button>

              {isOpen && (
                <div className="px-8 pb-6 text-xs sm:text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-4">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
