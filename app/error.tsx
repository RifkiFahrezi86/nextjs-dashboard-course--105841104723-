'use client';

import { lusitana } from '@/app/ui/fonts';
import Link from 'next/link';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className={`${lusitana.className} text-2xl`}>Something went wrong!</h1>
      <p className="mt-4">{error.message}</p>
      <button
        onClick={reset}
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white"
      >
        Try again
      </button>
      <Link href="/dashboard" className="mt-4 text-blue-600">
        Back to Dashboard
      </Link>
    </div>
  );
}