export function Card({ children }) {
  return (
    <div className="text-black bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
