// Simple pagination component
const SimplePagination = () => {
  if (!pagination) return null;

  const {
    currentPage,
    totalPages,
    onNext,
    onPrevious,
    hasNext,
    hasPrevious,
    totalCount,
  } = pagination;

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
      <div className="flex justify-between flex-1 sm:hidden">
        <button
          onClick={onPrevious}
          disabled={!hasPrevious}
          className={`px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 ${
            !hasPrevious ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={!hasNext}
          className={`px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 ${
            !hasNext ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Page <span className="font-medium">{currentPage}</span> of{' '}
            <span className="font-medium">{totalPages}</span>
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onPrevious}
            disabled={!hasPrevious}
            className={`px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 ${
              !hasPrevious ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Previous
          </button>
          <button
            onClick={onNext}
            disabled={!hasNext}
            className={`px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 ${
              !hasNext ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
