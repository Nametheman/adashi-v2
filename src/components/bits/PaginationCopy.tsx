import styled from "styled-components";

import { CurrPageInfoTypes } from "../TransactionTable";

type PaginationProps = {
  transPerPage: number;
  totalTrans: number;
  // paginationHandler: (num: number) => void;
  setCurrPageInfo: Function;
  currPageInfo: CurrPageInfoTypes;
  currentPage: number;
  lastPage: number;
  pageLimit: number;
  refetch: Function;
};

const Pagination = (props: PaginationProps) => {
  const {
    transPerPage,
    totalTrans,
    setCurrPageInfo,
    currPageInfo,
    pageLimit,
    lastPage,
    refetch,
  } = props;
  const PageNumbers: any[] = [];

  const prevPage = () => {
    setCurrPageInfo((currInfo: CurrPageInfoTypes) => {
      return {
        ...currInfo,
        pageNo: currInfo.pageNo - 1,
      };
    });
    refetch();
  };

  const nextPage = () => {
    setCurrPageInfo((currInfo: CurrPageInfoTypes) => {
      return {
        ...currInfo,
        pageNo: currInfo.pageNo + 1,
      };
    });
    refetch();
  };

  const changePage = (page: number) => {
    setCurrPageInfo((currInfo: CurrPageInfoTypes) => {
      return {
        ...currInfo,
        pageNo: page,
      };
    });
    refetch();
  };

  const currPage = currPageInfo.pageNo;

  // const totalPages = Math.ceil(totalTrans / transPerPage);
  // add pagination grouping

  const getPaginationGroup = () => {
    let start = Math.floor((currPage - 1) / pageLimit) * pageLimit;
    return new Array(Math.min(lastPage, pageLimit))
      .fill(0)
      .map((_, idx) => start + idx + 1);
  };

  for (let index = 1; index <= Math.ceil(totalTrans / transPerPage); index++) {
    PageNumbers.push(index);
  }

  return (
    <nav>
      <Lists className="pagination">
        <button onClick={prevPage} className={currPage === 1 ? `disabled` : ""}>
          Prev
        </button>

        {getPaginationGroup().map(
          (number, id) =>
            number <= lastPage && (
              <button
                key={id}
                onClick={() => changePage(number)}
                className={currPage === number ? `active` : ""}
              >
                {number}
              </button>
            )
        )}

        <button
          onClick={nextPage}
          className={currPage === lastPage ? `disabled` : ""}
        >
          Next
        </button>
      </Lists>
    </nav>
  );
};

export default Pagination;

const Lists = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem auto;
  button {
    padding: 0.5rem 1rem;
    margin-right: 1rem;
    color: #33277b;
    border: none;
    font-weight: bold;
    font-size: 20px;
    background-color: rgba(207, 232, 222, 0.2);
    border-radius: 5px;
  }
  .active {
    color: #059157;
    background-color: white;
  }
  .disabled {
    pointer-events: none;
    box-shadow: none;
    color: #999;
  }
  button:hover,
  button:focus,
  button:active {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  }

  @media screen and (min-width: 500px) {
    margin: 1rem auto;
    button {
      padding: 0.25rem 0.5rem;
      margin-right: 0.5rem;
    }
  }
`;
