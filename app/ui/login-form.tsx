'use client';

import { signIn } from '@/app/lib/auth';
import { useFormState } from 'react-dom';
import { lusitana } from '@/app/ui/fonts';
import Link from 'next/link';

// Fungsi pembungkus untuk menangani FormData dan memanggil signIn
async function loginAction(_prevState: { message: string | null }, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { message: 'Email dan kata sandi wajib diisi.' };
  }

  try {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false, // Nonaktifkan redirect otomatis
    });

    if (result?.error) {
      return { message: 'Kredensial tidak valid.' };
    }

    // Redirect manual ke dashboard setelah login berhasil
    window.location.href = '/dashboard';
    return { message: null };
  } catch (error) {
    return { message: 'Terjadi kesalahan saat login.' };
  }
}

export default function LoginPage() {
  const initialState = { message: null };
  const [state, dispatch] = useFormState(loginAction, initialState);

  return (
    <div className="flex min-h-screen flex-col justify-center p-6">
      <h1 className={`${lusitana.className} text-2xl`}>Masuk ke Acme Dashboard</h1>
      <form action={dispatch} className="mt-4 max-w-md">
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="peer block w-full rounded-md border border-gray-200 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="mb-2 block text-sm font-medium">
            Kata Sandi
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="peer block w-full rounded-md border border-gray-200 py-2"
            required
          />
        </div>
        {state.message && <p className="text-red-500">{state.message}</p>}
        <button type="submit" className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white">
          Masuk
        </button>
      </form>
      <Link href="/" className="mt-4 block text-blue-600">
        Kembali ke Beranda
      </Link>
    </div>
  );
}