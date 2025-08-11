'use client';

import { deleteInvoice } from '@/app/lib/actions';
import { Trash2 } from 'lucide-react'; // ikon tempat sampah

export default function DeleteInvoiceButton({ id }: { id: string }) {
    return (
        <form
            action={async (formData: FormData) => {
                if (!confirm('Yakin ingin menghapus invoice ini?')) {
                    return;
                }
                await deleteInvoice(id);
            }}
            className="inline"
        >
            <button
                type="submit"
                aria-label="Hapus Invoice"
                className="rounded-md border border-500 p-2 text-black-600 hover:bg-red-50"
            >
                <Trash2 size={20} />
            </button>
        </form>
    );
}
