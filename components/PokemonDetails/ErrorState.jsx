const ErrorState = ({ onRetry }) => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <div className="text-red-500 text-6xl mb-6 animate-bounce">😞</div>
    <h3 className="text-xl font-semibold text-gray-900 mb-3">
      Failed to load details
    </h3>
    <p className="text-gray-600 mb-8 max-w-md">{error}</p>
    <button
      onClick={onRetry}
      className="px-8 py-3 bg-linear-to-r from-red-500 to-pink-500 text-white font-semibold rounded-2xl hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-red-500/30"
    >
      Try Again
    </button>
  </div>
);
export default ErrorState;
