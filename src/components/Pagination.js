import ReactPaginate from "react-paginate";

const Pagination = ({handlePageClick, pageCount}) => {
    return(
        <>
            <ReactPaginate
                className='pt-3'
                breakLabel='...'
                nextLabel='Next >'
                onPageChange={handlePageClick}
                pageRangeDisplayed={0}
                marginPagesDisplayed={1}
                pageCount={pageCount}
                previousLabel='< Previous'
                renderOnZeroPageCount={null}
            />
            <hr />
        </> 
    );
}

export default Pagination;