import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  loading?: boolean; // Add loading prop
  loadingText?: string; // Optional custom loading text
}

function Table<T extends Record<string, React.ReactNode>>({
  columns,
  data,
  onSelectionChange,
  getRowLink,
  loading = false, // Default to false
  loadingText = 'Loading data...', // Default loading text
}: TableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [isAllSelected, setIsAllSelected] = useState(false);
  const isRowClickable = !!getRowLink;

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
            checked={isAllSelected && !loading} // Disable visual when loading
            disabled={loading} // Actually disable when loading
            onChange={(e) => !loading && handleSelectAll(e.target.checked)} // Prevent action when loading
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
            const rowLink = getRowLink(row, rowIndex);

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
                      <Link
                        to={rowLink}
                        className="block w-full h-full no-underline text-inherit"
                      >
                        {col.render
                          ? col.render(row, rowIndex)
                          : (row[col.key] as React.ReactNode)}
                      </Link>
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
    </div>
  );
}

export default Table;
