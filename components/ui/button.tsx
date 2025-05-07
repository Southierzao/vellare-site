export function Button({ children, className }: any) {
  return <button className={`rounded px-4 py-2 ${className}`}>{children}</button>;
}
