import React from 'react';
import Pagination from 'react-pagination-js';
import 'react-pagination-js/dist/styles.css';

function CPagination({ totalPages, currentPage, callBack }) {
  if (totalPages && totalPages > 1) {
    return (
      <div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalSize={totalPages}
          changeCurrentPage={(num) => callBack(num)}
          sizePerPage={1}
          theme="bootstrap"
        />
      </div>
    );
  } else {
    return null;
  }
}

export default CPagination;
