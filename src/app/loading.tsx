export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-lg font-medium text-gray-900">Loading HR System...</h2>
        <p className="text-sm text-gray-500 mt-2">Please wait while we prepare your dashboard</p>
      </div>
    </div>
  );
}