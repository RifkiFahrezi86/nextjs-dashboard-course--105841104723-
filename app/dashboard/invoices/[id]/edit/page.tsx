import { sql } from '@vercel/postgres';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import Link from 'next/link';
import EditForm from '@/app/ui/invoices/edit-form'; // Sesuaikan path impor sesuai struktur proyek Anda
import { Invoice, Customer } from '@/app/lib/definitions';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const data = await sql`SELECT * FROM invoices WHERE id = ${id}`;
    const invoice = data.rows[0];
    return {
      title: invoice ? `Edit Invoice ${invoice.id}` : 'Edit Invoice',
    };
  } catch {
    return { title: 'Edit Invoice' };
  }
}

export default async function EditInvoicePage({ params }: Props) {
  const { id } = await params;

  try {
    const invoiceData = await sql`SELECT * FROM invoices WHERE id = ${id}`;
    const customersData = await sql`SELECT id, name FROM customers ORDER BY name ASC`;
    const invoice = invoiceData.rows[0] as Invoice;
    const customers = customersData.rows as Customer[];

    if (!invoice) notFound();

    return (
      <div className="p-6">
        <h1 className={`${lusitana.className} mb-8 text-2xl font-semibold`}>
          Invoices / <span className="text-gray-500">Edit Invoice</span>
        </h1>
        <div className="rounded-lg bg-gray-50 p-6">
          <EditForm invoice={invoice} customers={customers} />
        </div>
        <div className="flex justify-end gap-4 mt-4">
          {/* <Link
            href="/dashboard/invoices"
            className="rounded-md bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
          >
            Batal
          </Link> */}
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    notFound();
  }
}