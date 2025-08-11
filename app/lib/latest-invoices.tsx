// app/ui/dashboard/latest-invoices.tsx
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { LatestInvoice } from '@/app/lib/definitions';

export default async function LatestInvoices({
    latestInvoices,
}: {
    latestInvoices: LatestInvoice[];
}) {
    return (
        <div className="w-full">
            <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Latest Invoices
            </h2>
            <div className="flex flex-col gap-4">
                {latestInvoices.map((invoice) => (
                    <div
                        key={invoice.id}
                        className="flex items-center justify-between rounded-md bg-white p-4"
                    >
                        <div className="flex items-center gap-3">
                            <Image
                                src={invoice.image_url}
                                className="rounded-full"
                                alt={`${invoice.name}'s profile picture`}
                                width={40}
                                height={40}
                            />
                            <div>
                                <p className="font-medium">{invoice.name}</p>
                                <p className="text-sm text-gray-500">{invoice.email}</p>
                            </div>
                        </div>
                        <p className="font-medium">{invoice.amount}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}