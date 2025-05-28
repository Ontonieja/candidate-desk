import Navigation from './components/nav/Nav';
import BlurredShape from './components/ui/BlurredShape';

import DataTableContainer from './components/table/DataTableContainer';

export default function App() {
  return (
    <div className='min-h-screen w-full relative overflow-hidden font-inter flex flex-col items-center py-8 px-8 sm:pt-10 sm:px-12 text-sm'>
      <BlurredShape className='-top-50 -right-30 h-[400px] w-[240px] md:w-[320px] md:h-[300px] xl:w-[360px] 2xl:w-[500px]  bg-[#fef3c5] opacity-30'></BlurredShape>
      <BlurredShape className='-bottom-80 -left-24 h-[400px] w-[240px] md:w-[320px] md:h-[400px] xl:w-[360px] 2xl:w-[600px]  bg-[#ffc7dc] opacity-50'></BlurredShape>

      <Navigation />
      <DataTableContainer />
    </div>
  );
}
