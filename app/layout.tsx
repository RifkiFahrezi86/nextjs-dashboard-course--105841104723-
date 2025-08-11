// app/layout.tsx
import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: 'Acme Dashboard',
  description: 'A financial dashboard to manage your invoices and customers.',
  openGraph: {
    title: 'Acme Dashboard',
    description: 'Manage your finances with ease!',
    url: '/dashboard', // Gunakan URL relatif
    images: [{ url: '/hero-desktop.png', width: 1000, height: 760, alt: 'Acme Dashboard Screenshot' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}