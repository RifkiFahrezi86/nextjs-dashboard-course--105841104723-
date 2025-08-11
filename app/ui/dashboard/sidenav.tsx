'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon, Bars3Icon, XMarkIcon, HomeIcon, DocumentIcon, UsersIcon } from '@heroicons/react/24/outline';
import { signOut } from 'next-auth/react';

// Definisi komponen NavLinks di dalam file yang sama untuk keperluan jarak dan active state
const NavLinks = ({ onLinkClick }: { onLinkClick?: () => void }) => {
  const pathname = usePathname();

  return (
    <nav className="space-y-2"> {/* Jarak vertikal antar item */}
      <Link
        href="/dashboard"
        onClick={onLinkClick}
        className={`flex items-center p-2 text-gray-700 rounded-lg transition-colors ${
          pathname === '/dashboard' ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-gray-100'
        }`}
      >
        <HomeIcon className="h-5 w-5 mr-2" />
        Home
      </Link>
      <Link
        href="/dashboard/invoices"
        onClick={onLinkClick}
        className={`flex items-center p-2 rounded-lg transition-colors ${
          pathname === '/dashboard/invoices' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <DocumentIcon className="h-5 w-5 mr-2" />
        Invoices
      </Link>
      <Link
        href="/dashboard/customers"
        onClick={onLinkClick}
        className={`flex items-center p-2 text-gray-700 rounded-lg transition-colors ${
          pathname === '/dashboard/customers' ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-gray-100'
        }`}
      >
        <UsersIcon className="h-5 w-5 mr-2" />
        Customers
      </Link>
    </nav>
  );
};

export default function SideNav() {
  const [isOpen, setIsOpen] = useState(false);

  // Disable body scroll when mobile sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      alert('Failed to sign out. Please try again.');
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Toggle Button for Mobile - Moved to Right */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 transform bg-white border-r px-4 py-6 flex flex-col w-72 max-w-[90%] h-full transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:static md:translate-x-0 md:w-64 md:max-w-full md:shadow-none md:border-r md:bg-white lg:w-72`}
        role="navigation"
        aria-label="Sidebar navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="mb-6 flex items-center justify-start rounded-lg bg-blue-600 p-4 h-20 md:h-24 transition-colors hover:bg-blue-700"
          onClick={() => setIsOpen(false)} // Close sidebar on logo click in mobile
        >
          <div className="w-32 text-white md:w-40">
            <AcmeLogo />
          </div>
        </Link>

        {/* Menu */}
        <div className="flex grow flex-col justify-between space-y-3">
          <div>
            <NavLinks onLinkClick={() => setIsOpen(false)} /> {/* Tutup sidebar saat link diklik */}
          </div>

          {/* Sign out */}
          <button
            onClick={handleSignOut}
            className="flex h-12 w-full items-center gap-3 rounded-lg bg-gray-50 p-3 text-sm font-medium hover:bg-red-100 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
            aria-label="Sign out"
          >
            <PowerIcon className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden transition-opacity duration-300 ease-in-out"
          aria-hidden="true"
        />
      )}
    </>
  );
}