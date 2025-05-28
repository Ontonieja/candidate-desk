export default function BlurredShape({ className }: { className: string }) {
  return <div className={`absolute -z-10  blur-3xl rounded-full ${className}`}></div>;
}
