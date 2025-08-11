import { fetchCustomers } from '@/app/lib/data';
import CustomersTable from '@/app/dashboard/customers/table';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';

// Komponen fallback untuk Suspense
function CustomersTableFallback() {
  return <div>Loading customers...</div>;
}

export default async function Page() {
  const customers = await fetchCustomers();

  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} text-2xl font-semibold text-gray-800`}>
        Pelanggan
      </h1>

      <Suspense fallback={<CustomersTableFallback />}>
        <CustomersTable customers={customers} />
      </Suspense>
    </div>
  );
}