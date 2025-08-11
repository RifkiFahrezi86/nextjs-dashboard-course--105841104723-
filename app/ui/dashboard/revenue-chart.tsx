import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { Revenue } from '@/app/lib/definitions';

export default async function RevenueChart({
  revenue,
}: {
  revenue: Revenue[];
}) {
  const chartHeight = 350;

  // Pastikan data revenue ada, jika tidak kembalikan pesan kosong
  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  // Hitung label Y-axis berdasarkan jumlah peminjaman (revenue) dengan rentang yang sesuai
  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  // Jika topLabel tidak mencapai $50K, sesuaikan secara manual untuk mencocokkan grafik
  const adjustedTopLabel = Math.max(topLabel, 50); // Pastikan maksimum minimal $50K

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Recent Revenue
      </h2>

      <div className="rounded-xl bg-gray-50 p-4">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          {/* Y-Axis (kiri) - Dalam ribuan dolar dengan rentang yang benar */}
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {['$60K','$50K', '$40K', '$30K', '$20K', '$10K', '$0K'].map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {/* Bar Chart */}
          {revenue.map((month) => (
            <div key={month.month} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-blue-300"
                style={{
                  height: `${(chartHeight / adjustedTopLabel) * month.revenue}px`,
                }}
              ></div>
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                {month.month}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Chart */}
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Last 6 months</h3>
        </div>
      </div>
    </div>
  );
}