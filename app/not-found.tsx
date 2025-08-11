import { lusitana } from '@/app/ui/fonts';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className={`${lusitana.className} text-2xl`}>Page Not Found</h1>
      <p className="mt-4">Sorry, the page you are looking for does not exist.</p>
      <Link href="/dashboard" className="mt-4 text-blue-600">
        Back to Dashboard
      </Link>
    </div>
  );
}