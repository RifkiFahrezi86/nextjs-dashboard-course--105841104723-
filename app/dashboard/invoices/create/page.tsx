import CreateForm from '@/app/ui/invoices/create-form';
import { fetchCustomers } from '@/app/lib/data';
import { lusitana } from '@/app/ui/fonts';

export default async function Page() {
  const customers = await fetchCustomers();

  return (
    <div className="w-full space-y-4">
      <h1 className={`${lusitana.className} text-2xl font-bold`}>
        Create Invoice
      </h1>

      {customers && customers.length > 0 ? (
        <CreateForm customers={customers} />
      ) : (
        <p className="text-sm text-gray-500">
          Tidak ada pelanggan yang tersedia. Tambahkan pelanggan terlebih dahulu.
        </p>
      )}
    </div>
  );
}
