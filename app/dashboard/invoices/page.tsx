// app/dashboard/invoices/page.tsx
import { fetchInvoicesPages } from '@/app/lib/data';
import InvoicesTable from '@/app/ui/invoices/table';
import Search from '@/app/ui/invoices/search';
import Pagination from '@/app/ui/invoices/pagination';
import { lusitana } from '@/app/ui/fonts';
import Link from 'next/link';
import { Suspense } from 'react';

function SearchFallback() {
  return <div>Loading search...</div>;
}

function InvoicesTableFallback() {
  return <div>Loading invoices...</div>;
} 

export default async function Page(props: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) {
  // tunggu searchParams dulu
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  // Ambil total halaman untuk pagination
  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>

      {/* Search bar dan tombol create */}
      <div className="mt-4 flex items-center justify-between gap-2">
        <Suspense fallback={<SearchFallback />}>
          <Search placeholder="Search invoices..." />
        </Suspense>
        <Link
          href="/dashboard/invoices/create"
          className="rounded-md bg-blue-500 px-4 py-2 text-white"
        >
          Create Invoice
        </Link>
      </div>

      {/* Table */}
      <Suspense key={query + currentPage} fallback={<InvoicesTableFallback />}>
        <InvoicesTable query={query} currentPage={currentPage} />
      </Suspense>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <Pagination totalPages={totalPages} currentPage={currentPage} query={query} />
      </div>
    </div>
  );
}
