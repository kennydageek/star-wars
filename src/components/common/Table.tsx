import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';

export interface Column<T> {
  key: keyof T | string;
  header: React.ReactNode;
  render?: (row: T, rowIndex?: number) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onSelectionChange?: (selectedRows: T[]) => void;
  getRowLink: (row: T, rowIndex: number) => string;
  loading?: boolean;
  loadingText?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onNext: () => void;
    onPrevious: () => void;
    hasNext: boolean;
    hasPrevious: boolean;
    totalCount: number;
  };
}

function Table<T extends Record<string, React.ReactNode>>({
  columns,
  data,
  onSelectionChange,
  getRowLink,
  loading = false,
  loadingText = 'Loading data...',
  pagination,
}: TableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [isAllSelected, setIsAllSelected] = useState(false);
  const isRowClickable = !!getRowLink;
  const navigate = useNavigate();

  const handleNavigate = (row: T, rowIndex: number) => {
    const rowLink = getRowLink(row, rowIndex);
    navigate(rowLink);
  };

  // Handle header checkbox change
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allRowIndices = new Set(data.map((_, index) => index));
      setSelectedRows(allRowIndices);
      setIsAllSelected(true);
    } else {
      setSelectedRows(new Set());
      setIsAllSelected(false);
    }
  };

  // Handle individual row checkbox change
  const handleRowSelect = (rowIndex: number, checked: boolean) => {
    const newSelectedRows = new Set(selectedRows);

    if (checked) {
      newSelectedRows.add(rowIndex);
    } else {
      newSelectedRows.delete(rowIndex);
    }

    setSelectedRows(newSelectedRows);
    setIsAllSelected(newSelectedRows.size === data.length);
  };

  // Notify parent component when selection changes
  useEffect(() => {
    if (onSelectionChange) {
      const selectedData = data.filter((_, index) => selectedRows.has(index));
      onSelectionChange(selectedData);
    }
  }, [selectedRows, data, onSelectionChange]);

  // Reset selection when data changes
  useEffect(() => {
    setSelectedRows(new Set());
    setIsAllSelected(false);
  }, [data]);

  // Add checkbox column to the beginning
  const columnsWithCheckbox: Column<T>[] = [
    {
      key: 'selection',
      header: (
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isAllSelected && !loading}
            disabled={loading}
            onChange={(e) => !loading && handleSelectAll(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      ),
      render: (row, rowIndex) => (
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={selectedRows.has(rowIndex as number)}
            disabled={loading}
            onChange={(e) =>
              !loading && handleRowSelect(rowIndex as number, e.target.checked)
            }
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      ),
    },
    ...columns,
  ];

  // Simple Pagination Component
  const Pagination = () => {
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
            className={`px-4 py-2  text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 ${
              !hasPrevious ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            Previous
          </button>
          <button
            onClick={onNext}
            disabled={!hasNext}
            className={`px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 ${
              !hasNext ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer '
            }`}
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Page <span className="font-medium">{currentPage}</span> of{' '}
              <span className="font-medium">{totalPages}</span> •{' '}
              <span className="font-medium">{totalCount}</span> total items
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onPrevious}
              disabled={!hasPrevious}
              className={`px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 ${
                !hasPrevious
                  ? 'opacity-50 cursor-not-allowed'
                  : 'cursor-pointer'
              }`}
            >
              Previous
            </button>
            <button
              onClick={onNext}
              disabled={!hasNext}
              className={`px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 ${
                !hasNext ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="overflow-x-auto rounded border border-[#A4A7B766]">
        <table className="min-w-full text-left text-sm text-gray-700">
          <thead className="bg-gray-50 text-xs font-medium text-gray-500">
            <tr>
              {columnsWithCheckbox.map((col) => (
                <th
                  key={col.key as string}
                  className="px-6 py-6 text-[#A4A7B7]"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan={columnsWithCheckbox.length}
                className="px-6 py-12 text-center text-gray-500"
              >
                <Spinner loadingText={loadingText} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  // Empty state
  if (data.length === 0) {
    return (
      <div className="overflow-x-auto rounded border border-[#A4A7B766]">
        <table className="min-w-full text-left text-sm text-gray-700">
          <thead className="bg-gray-50 text-xs font-medium text-gray-500">
            <tr>
              {columnsWithCheckbox.map((col) => (
                <th
                  key={col.key as string}
                  className="px-6 py-6 text-[#A4A7B7]"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan={columnsWithCheckbox.length}
                className="px-6 py-12 text-center text-gray-500"
              >
                No data available
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded border border-[#A4A7B766]">
      <table className="min-w-full text-left text-sm text-gray-700">
        <thead className="bg-gray-50 text-xs font-medium text-gray-500">
          <tr>
            {columnsWithCheckbox.map((col) => (
              <th key={col.key as string} className="px-6 py-6 text-[#A4A7B7]">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((row, rowIndex) => {
            return (
              <tr
                key={rowIndex}
                className={`
                  transition-all duration-200 ease-in-out
                  hover:shadow-md
                  shadow-gray-50
                  relative
                  ${isRowClickable ? 'cursor-pointer' : ''}
                `}
              >
                {columnsWithCheckbox.map((col) => (
                  <td
                    key={col.key as string}
                    className="px-6 py-4 text-[#303B54] font-medium"
                  >
                    {col.key === 'selection' ? (
                      col.render?.(row, rowIndex)
                    ) : isRowClickable ? (
                      <span
                        onClick={() => handleNavigate(row, rowIndex)}
                        className="block w-full h-full  no-underline text-inherit"
                      >
                        {col.render
                          ? col.render(row, rowIndex)
                          : (row[col.key] as React.ReactNode)}
                      </span>
                    ) : col.render ? (
                      col.render(row, rowIndex)
                    ) : (
                      (row[col.key] as React.ReactNode)
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <Pagination />
    </div>
  );
}

export default Table;
