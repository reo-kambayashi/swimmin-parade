import React, { useState } from 'react';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/members', label: 'Members' },
  { href: '/releases', label: 'Releases' },
  { href: '/contact', label: 'Contact' },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="p-2" aria-label="Open menu">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-white z-50 p-4">
          <div className="flex justify-between items-center mb-8">
            <a href="/" className="text-2xl font-bold font-heading text-text">swimmin' parade</a>
            <button onClick={() => setIsOpen(false)} className="p-2" aria-label="Close menu">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <ul className="space-y-4">
            {navItems.map(item => (
              <li key={item.href}>
                <a href={item.href} className="block text-2xl font-bold text-center py-4 rounded-lg hover:bg-primary-light transition-colors" onClick={() => setIsOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
