interface GradientTextProps {
  text: string;
  className?: string;
  from?: string;
  via?: string;
  to?: string;
  glowStrength?: string;
}

export default function GradientText({
  text,
  className = '',
  from = 'from-primary-accent',
  via = 'via-primary',
  to = 'to-[#eb4899]',
  glowStrength = 'blur-xl'
}: GradientTextProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span
        className={`
          absolute inset-0
          bg-gradient-to-r ${from} ${via} ${to}
          opacity-15
          ${glowStrength}
          pointer-events-none
        `}
        aria-hidden='true'
      >
        <span className='invisible'>{text}</span>
      </span>
      <span
        className={`relative bg-clip-text text-transparent bg-gradient-to-r ${from} ${via} ${to}`}
      >
        {text}
      </span>
    </span>
  );
}
