'use client';

import { UserGroupIcon, HomeIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Invoices', href: '/dashboard/invoices', icon: DocumentDuplicateIcon },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] w-full items-center gap-2 rounded-md p-3 text-sm font-medium transition-colors',
              isActive
                ? 'bg-sky-100 text-blue-600'
                : 'bg-gray-50 hover:bg-sky-100 hover:text-blue-600'
            )}
          >
            <LinkIcon className="w-6" />
            <span>{link.name}</span>
          </Link>
        );
      })}
    </>
  );
}
