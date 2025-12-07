const LoadingState = () => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <div className="animate-spin rounded-full h-20 w-20 border-4 border-red-500/20 border-t-red-500 mb-8" />
    <div className="space-y-2">
      <div className="h-8 w-48 bg-gray-200 rounded-full animate-pulse mx-auto" />
      <p className="text-gray-500 text-lg">Loading Pokemon details...</p>
    </div>
  </div>
);

export default LoadingState;
