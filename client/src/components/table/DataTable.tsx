import { format } from 'date-fns';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface DataTableProps<T> {
  columns: { key: keyof T; label: string }[];
  data: T[];
  loading: boolean;
  pageSize: number;
}

export default function DataTable<T>({ columns, data, loading, pageSize }: DataTableProps<T>) {
  return (
    <div className='w-full h-full bg-white rounded-3xl shadow-xs overflow-auto'>
      <table className='border-collapse border-none w-full overflow-auto rounded-3xl min-w-[1000px]'>
        <thead className='border-b border-[#f0f0f0] shadow-[0_2px_6px_-4px_rgba(0,0,0,0.12)] '>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key as string}
                className='px-4 py-3 text-left font-medium whitespace-nowrap'
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: pageSize }).map((_, i) => (
              <tr key={i}>
                {columns.map((col) => (
                  <td key={col.key as string} className='py-3 px-6 border-b border-[#f0f0f0]'>
                    <Skeleton height={12} baseColor='#f0f0f0' highlightColor='#f5f5f5' />
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className='px-4 py-2 text-center font-normal text-gray-400'
              >
                No data
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx} className='hover:bg-gray-50'>
                {columns.map((col) => (
                  <td className='px-4 py-3 border-b border-[#f0f0f0]'>
                    {col.key === 'job_application_created_at'
                      ? format(new Date(row[col.key] as string), 'dd.MM.yyyy HH:mm')
                      : (row[col.key] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
