import { useState } from "react";

const usePagination = ({ totalItems, itemsPerPage, pagesPerRange }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const startPage = Math.floor((currentPage - 1) / pagesPerRange) * pagesPerRange + 1;
    const endPage = Math.min(startPage + pagesPerRange - 1, totalPages);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return {
        currentPage,
        totalPages,
        startPage,
        endPage,
        handlePageChange
    };
};

export default usePagination;
