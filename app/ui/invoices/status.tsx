import clsx from 'clsx';

export default function InvoiceStatus({ status }: { status: 'pending' | 'paid' }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-sm',
        {
          'bg-gray-100 text-gray-500': status === 'pending',
          'bg-green-500 text-white': status === 'paid',
        }
      )}
    >
      {status === 'pending' ? 'Menunggu' : 'Lunas'}
    </span>
  );
}