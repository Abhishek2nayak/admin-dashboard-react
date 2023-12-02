import React from "react";

const Pagination = ({ currentPage, handlePageChange, members }) => {
  const rowSize = 10;
  const totalPages = Math.ceil(members?.length / rowSize);
  
  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`btn pagination-item ${currentPage === i ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pages;
  };
  return (
    <div className="pagination-wrapper">
      <p>{currentPage} of {totalPages}</p>
      <button className="btn" onClick={() => handlePageChange(1)}>
        <i class="ri-arrow-left-double-line"></i>
      </button>
      <button className="btn" onClick={() => handlePageChange(currentPage - 1)}>
        <i class="ri-arrow-left-s-line"></i>
      </button>
      {renderPagination()}
      <button className="btn" onClick={() => handlePageChange(currentPage + 1)}>
        <i class="ri-arrow-right-s-line"></i>
      </button>
      <button className="btn" onClick={() => handlePageChange(totalPages)}>
        <i class="ri-arrow-right-double-line"></i>
      </button>
    </div>
  );
};

export default Pagination;
