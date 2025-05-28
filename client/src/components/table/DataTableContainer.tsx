import { IoIosSearch } from 'react-icons/io';
import DataTable from '../table/DataTable';
import { FaFileExport } from 'react-icons/fa6';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa6';
import columns from './columns';
import { useCandidatesQueryOptions } from '../../queryOptions/candidatesQuery';
import type { Candidate } from '../../types/candidatesTypes';

export default function DataTableContainer() {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextUrl, setNextUrl] = useState<string | null>(null);

  const queryOptions = useCandidatesQueryOptions(nextUrl, pageSize);
  const { isLoading, data, isFetching } = useQuery(queryOptions);

  const handleNext = () => {
    if (data?.meta?.nextPage) {
      setNextUrl(data.meta.nextPage);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (data?.meta?.prevPage) {
      setNextUrl(data.meta.prevPage);
      setCurrentPage((prev) => prev - 1);
    }
  };

  const currentCandidates = data?.candidates ? data.candidates.slice(0, pageSize) : [];

  return (
    <main className='mt-8 md:mt-12 '>
      <div className='flex justify-between'>
        <h2 className='text-2xl font-bold hidden md:block'>Candidates</h2>
        <div className='gap-3 flex items-center w-full max-md:justify-between justify-end'>
          <div className='relative'>
            <input
              type='text'
              className='border border-[#f0f0f0] text-xs sm:text-sm  w-full px-8 focus:outline-none rounded-xl py-2 sm:w-full'
              placeholder='Search candidates'
            ></input>
            <IoIosSearch className='absolute top-1/2 left-3 -translate-y-1/2 size-4 text-gray-400' />
          </div>
          <div>
            <button
              className='bg-primary-accent text-white text-xs sm:text-sm px-4 py-2 rounded-lg flex gap-2 items-center cursor-pointer ease-in-out duration-300 hover:bg-primary'
              onClick={() => {
                window.open('http://localhost:3000/api/v1/candidates/export/csv', '_blank');
              }}
            >
              <FaFileExport className='size-4' />
              <p className='font-semibold whitespace-nowrap'>Export candidates</p>
            </button>
          </div>
        </div>
      </div>
      <div className='w-full rounded-3xl text-xs bg-[#fbfbfb] mt-4 p-2'>
        <div className='w-full'>
          <DataTable
            columns={columns}
            data={currentCandidates as Candidate[]}
            loading={isLoading}
            pageSize={pageSize}
          />
        </div>
      </div>

      <div className='flex justify-between text-xs md:px-4 mt-4 text-gray-700 font-medium'>
        <div className='flex  items-center'>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setNextUrl(null);
              setCurrentPage(1);
            }}
            className='border border-[#f0f0f0] rounded-xl py-2 px-3 mr-2 focus:outline-none appearance-none'
          >
            {[5, 10, 20, 30].map((size) => (
              <option className='outline-none' key={size} value={size}>
                {size} / page
              </option>
            ))}
          </select>

          <p>
            {data?.meta
              ? `${pageSize * (currentPage - 1) + 1} - ${Math.min(pageSize * currentPage, data.meta.recordCount)} of ${data.meta.recordCount}`
              : '...'}
          </p>
        </div>

        <div className='flex gap-4 items-center'>
          {data?.meta?.prevPage && !isFetching && (
            <button
              onClick={handlePrev}
              disabled={!data?.meta?.prevPage || isFetching}
              className='cursor-pointer hover:text-primary-accent ease-in-out duration-300 bg-transparent border-none'
            >
              <FaArrowLeft className='size-4' />
            </button>
          )}
          <span>{data?.meta ? `${currentPage} of ${data.meta.pageCount}` : '...'}</span>
          <button
            onClick={handleNext}
            disabled={!data?.meta?.nextPage || isFetching}
            className='cursor-pointer hover:text-primary-accent ease-in-out duration-300 bg-transparent border-none'
          >
            <FaArrowRight className='size-4' />
          </button>
        </div>
      </div>
    </main>
  );
}
