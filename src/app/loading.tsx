export default function LoadingPage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-[1700]">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 w-full h-full border-4 border-t-blue-500 border-transparent rounded-full animate-spin z-10"></div>
        <div className="absolute inset-0 w-full h-full border-4 border-gray-300 rounded-full"></div>
      </div>
    </div>
  );
}
