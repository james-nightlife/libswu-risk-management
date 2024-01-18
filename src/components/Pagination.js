import ReactPaginate from "react-paginate";

const Pagination = ({handlePageClick, pageCount}) => {
    return(
        <ReactPaginate
                breakLabel='...'
                nextLabel='Next >'
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel='< Previous'
                renderOnZeroPageCount={null}
            />
    );
}

export default Pagination;