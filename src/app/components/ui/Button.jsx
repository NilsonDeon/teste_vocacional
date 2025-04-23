export function Button({ onClick, className = "", children, ...props }) {
  return (
    <button
      onClick={onClick}
      className={`bg-[#01446E] text-white text-center rounded-xl p-4 text-lg hover:bg-[#012f4a] transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
