'use client';

import { Customer } from '@/app/lib/definitions';
import { createInvoice } from '@/app/lib/actions';

export default function CreateForm({ customers }: { customers: Customer[] }) {
  return (
    <form action={createInvoice}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Pilih Pelanggan
          </label>
          <select
            id="customer"
            name="customerId"
            className="peer block w-full rounded-md border border-gray-200 py-2"
            required
          >
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Jumlah
          </label>
          <input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            className="peer block w-full rounded-md border border-gray-200 py-2"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="mb-2 block text-sm font-medium">
            Status
          </label>
          <select
            id="status"
            name="status"
            className="peer block w-full rounded-md border border-gray-200 py-2"
            required
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            type="submit"
            className="rounded-md bg-blue-500 px-4 py-2 text-white"
          >
            Buat Invoice
          </button>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 transition-colors"
          >
            Batal
          </button>
        </div>
      </div>
    </form>
  );
}