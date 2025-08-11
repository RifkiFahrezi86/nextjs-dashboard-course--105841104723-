// app/login/page.tsx
'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { lusitana } from '@/app/ui/fonts';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError('Email atau kata sandi salah.');
      } else {
        router.push('/dashboard');
      }
    } catch {
      setError('Terjadi kesalahan saat login. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        {/* Logo segitiga & Title */}
        <div className="mb-6 text-center">
          <div className="shape"></div>
          <h1
            className={`${lusitana.className} mt-4 text-2xl font-semibold text-gray-800`}
          >
            Log in to Acme Dashboard
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="peer block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 disabled:bg-gray-100"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 disabled:bg-gray-100"
              required
              disabled={isLoading}
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="mt-2 w-full rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:bg-blue-300"
            disabled={isLoading}
          >
            {isLoading ? 'Memproses...' : 'Log in'}
          </button>
        </form>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-blue-600 transition-colors hover:underline"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
