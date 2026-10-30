import React, { useState, useEffect } from 'react';
import { Info, BookOpen, UserPlus } from 'lucide-react';
import { useLenis } from '../../hooks/useLenis';

export const EventTabBar = () => {
  const [activeSection, setActiveSection] = useState('info');
  const { scrollTo } = useLenis();

  const tabs = [
    { id: 'info', label: '01 // Event Overview', icon: Info },
    { id: 'rules', label: '02 // Rules & Regulations', icon: BookOpen },
    { id: 'register', label: '03 // Registration', icon: UserPlus },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const infoEl = document.getElementById('info');
      const rulesEl = document.getElementById('rules');
      const regEl = document.getElementById('register');

      if (!infoEl || !rulesEl || !regEl) return;

      const scrollPos = window.scrollY + 180;

      if (scrollPos >= regEl.offsetTop) {
        setActiveSection('register');
      } else if (scrollPos >= rulesEl.offsetTop) {
        setActiveSection('rules');
      } else {
        setActiveSection('info');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabClick = (id) => {
    scrollTo(`#${id}`);
  };

  return (
    <div className="sticky top-16 sm:top-20 z-40 py-3 mb-12 bg-paper/95 backdrop-blur-md border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center sm:justify-start gap-2 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeSection === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide border transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-black text-white border-black shadow-sm'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
