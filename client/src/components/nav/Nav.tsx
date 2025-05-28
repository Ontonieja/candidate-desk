import GradientText from '../ui/GradientText';

export default function Navigation() {
  return (
    <header className='flex justify-center items-center'>
      <h1>
        <GradientText
          text='Teamtailor candidates desk'
          className='font-bold text-2xl md:text-3xl'
        />
      </h1>
    </header>
  );
}
