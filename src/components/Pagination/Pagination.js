import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

function Pagination({ handlePaginate, totalPages }) {
  return (
    <ReactPaginate
      previousLabel="Previous"
      nextLabel="Next"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      disabledLinkClassName="page-item-disabled"
      nextLinkClassName="page-link"
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName="pagination"
      activeClassName="active"
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={handlePaginate}
      pageCount={totalPages}
      renderOnZeroPageCount={null}
    />
  );
}

Pagination.propTypes = {
  handlePaginate: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default Pagination;
