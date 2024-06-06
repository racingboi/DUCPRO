// src/pages/admin/Pagination.jsx
import React from 'react';

// eslint-disable-next-line react/prop-types
const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handleFirstPage = () => onPageChange(1);
    const handleLastPage = () => onPageChange(totalPages);
    const handlePreviousPage = () => currentPage > 1 && onPageChange(currentPage - 1);
    const handleNextPage = () => currentPage < totalPages && onPageChange(currentPage + 1);

    return (
        <div className="flex items-center justify-center gap-2 my-4">
            <button
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleFirstPage}
                disabled={currentPage === 1}>
                First
            </button>
            <button
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}>
                Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i}
                    className={`px-3 py-1 text-sm font-medium rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
                    onClick={() => onPageChange(i + 1)}
                    disabled={currentPage === i + 1}>
                    {i + 1}
                </button>
            ))}
            <button
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}>
                Next
            </button>
            <button
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleLastPage}
                disabled={currentPage === totalPages}>
                Last
            </button>
        </div>
    );
};

export default Pagination;
