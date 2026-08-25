'use client';

import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface FAQItem {
  id: string;
  number: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: '1',
    number: '01',
    question: 'Can I upload a CV?',
    answer:
      'Nunc sed a nisl purus. Nibh dis faucibus proin lacus tristique. Sit congue non vitae odio sit erat in. Felis eu ultrices a sed massa. Commodo fringilla sed tempor risus laoreet ultricies ipsum. Habitasse morbi faucibus in iaculis lectus. Nisi enim feugiat enim volutpat. Sem quis viverra viverra odio mauris nunc',
  },
  {
    id: '2',
    number: '02',
    question: 'How long will the recruitment process take?',
    answer:
      'The timeline varies depending on the position, but typically takes between 2 to 4 weeks from application submission to final interview.',
  },
  {
    id: '3',
    number: '04',
    question: 'Do you recruit for Graduates, Apprentices and Students?',
    answer:
      'Yes, we offer structured early-career programs including internship cohorts, graduate positions, and apprenticeship pathways.',
  },
  {
    id: '4',
    number: '03',
    question: 'What does the recruitment and selection process involve?',
    answer:
      'Our standard selection workflow consists of initial resume screening, an online skills assessment, a technical/behavioral interview, and a final offer meeting.',
  },
  {
    id: '5',
    number: '05',
    question: 'Can I receive notifications for any future jobs that may interest me?',
    answer:
      'Absolutely. You can create a candidate profile and enable automated job alerts tailored to your preferred roles, locations, and categories.',
  },
];

function FAQSection() {
  // Track open item ID (defaults to '1' to match the mockup image)
  const [openId, setOpenId] = useState<string | null>('1');

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-500 max-w-xl mx-auto">
            At eu lobortis pretium tincidunt amet lacus ut aenean aliquet
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqData.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className={`transition-all duration-300 rounded-2xl overflow-hidden ${
                  isOpen
                    ? 'bg-[#edf7f5] p-6 sm:p-8'
                    : 'bg-white border-b border-gray-100 p-6 sm:p-8'
                }`}
              >
                {/* Accordion Toggle Header */}
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full flex items-center justify-between text-left focus:outline-none group"
                >
                  <div className="flex items-center gap-6 pr-4">
                    <span
                      className={`text-lg sm:text-xl font-bold transition-colors ${
                        isOpen ? 'text-[#2a9d8f]' : 'text-gray-400'
                      }`}
                    >
                      {item.number}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                      {item.question}
                    </h3>
                  </div>

                  {/* Toggle Button Icon */}
                  <div className="shrink-0 ml-2">
                    {isOpen ? (
                      <div className="w-8 h-8 rounded-full bg-[#2a9d8f] flex items-center justify-center text-white transition-transform duration-200">
                        <X className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full border border-[#2a9d8f] text-[#2a9d8f] flex items-center justify-center transition-all duration-200 group-hover:bg-[#2a9d8f] group-hover:text-white">
                        <Plus className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </button>

                {/* Collapsible Answer Body */}
                {isOpen && (
                  <div className="mt-4 pl-12 pr-10 text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default  FAQSection