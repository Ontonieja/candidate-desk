type DataTableProps = {
  columns: { key: string; label: string }[];
  data: Record<string, string | number>[];
};

export default function DataTable({ columns, data }: DataTableProps) {
  return (
    <div className='w-full h-full bg-white rounded-3xl overflow-auto shadow-xs '>
      <table className='min-w-full border-collapse border-none rounded-3xl '>
        <thead className='border-b border-[#f0f0f0] shadow-[0_2px_6px_-4px_rgba(0,0,0,0.12)] '>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className='py-3 px-6 text-left font-medium'>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
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
                  <td key={col.key} className='px-4 py-3 border-b border-[#f0f0f0]'>
                    {row[col.key]}
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
