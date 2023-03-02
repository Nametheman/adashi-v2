import { PDFDownloadLink } from "@react-pdf/renderer";
import { DatePicker, Skeleton } from "antd";
import moment from "moment";
import React, { ChangeEvent, useState } from "react";
import Moment from "react-moment";
import styled from "styled-components";

import { ReactComponent as DownloadReportIcon } from "../assets/icons/download2.svg";
import { userData } from "../helpers/authHelper";
import { format4dpNumber } from "../helpers/formatNumbers";
import { useTransactionHistoryQuery } from "../redux/services/transaction-service";

import { ReactComponent as NairaIcon } from "./../assets/icons/naira-icon.svg";
import { ReactComponent as SearchIcon } from "./../assets/icons/search-icon.svg";
import inImg from "./../assets/img/in.png";
import outImg from "./../assets/img/out.png";
import ShowTransDetails from "./ShowTransDetails";
import TransactionReport from "./TransactionReport";
import Button from "./bits/Button";
import ModalA from "./bits/ModalA";
import NoData from "./bits/NoData";
import Pagination from "./bits/Pagination";
import Select from "./bits/Select";

export type CurrPageInfoTypes = {
  pageNo: number;
  pageSize: number;
  status: string;
  startDate: moment.Moment | null;
  startDateString?: string;
  endDate: moment.Moment | null;
  endDateString?: string;
};

const TransactionTable = () => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<Object>({});

  const [currPageInfo, setCurrPageInfo] = useState<CurrPageInfoTypes>({
    pageNo: 1,
    pageSize: 10,
    status: "",
    startDate: null,
    endDate: null,
    startDateString: "",
    endDateString: "",
  });

  const { data, refetch, isLoading }: any = useTransactionHistoryQuery({
    pageNo: currPageInfo.pageNo,
    pageSize: currPageInfo.pageSize,
    status: currPageInfo.status,
    duration:
      currPageInfo.startDate && currPageInfo.endDate
        ? `${moment(currPageInfo.startDate).format("YYYY-MM-DD")},${moment(
            currPageInfo.endDate
          ).format("YYYY-MM-DD")}`
        : "",
  });

  const handleStartDateChange = (date: any, dateString: any) => {
    setCurrPageInfo((currInfo) => {
      return {
        ...currInfo,
        startDate: date,
        startDateString: dateString,
      };
    });
  };

  const handleEndDateChange = (date: any, dateString: any) => {
    setCurrPageInfo((currInfo) => {
      return {
        ...currInfo,
        endDate: date,
        endDateString: dateString,
      };
    });
  };

  const submitSearchRange = () => {
    refetch();
  };

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCurrPageInfo((currInfo) => {
      return {
        ...currInfo,
        status: val,
        pageNo: 1,
      };
    });
    refetch();
  };

  return (
    <>
      <Wrapper className="col-12">
        {isLoading ? (
          <Skeleton active />
        ) : data?.data ? (
          <>
            <div className="opt row">
              <div className="search col-md-8 col-lg-4 items-center">
                <p>Date Range: </p>
                <DatePicker
                  onChange={handleStartDateChange}
                  className="date-picker"
                  placeholder="Start Date"
                  format={"MMM DD, YYYY"}
                  value={currPageInfo.startDate}
                />
                <p>- </p>
                <DatePicker
                  onChange={handleEndDateChange}
                  className="date-picker"
                  placeholder="End Date"
                  format={"MMM DD, YYYY"}
                  value={currPageInfo.endDate}
                />
              </div>
              <div className="col-12 col-md-4 col-lg-3">
                <Button
                  className="search-btn"
                  onClick={() => submitSearchRange()}
                >
                  <SearchIcon /> Search
                </Button>
              </div>
              <div className="col-7 col-md-6 col-lg-3">
                {data?.data.length > 0 && (
                  <PDFDownloadLink
                    document={
                      <TransactionReport
                        userName={userData().name + " " + userData().last_name}
                        transactions={data?.data}
                      />
                    }
                    fileName={
                      userData().name +
                      "_" +
                      userData().last_name +
                      "_Adashi_report.pdf"
                    }
                    style={{
                      marginRight: "1rem",
                    }}
                  >
                    {({ loading }: any) =>
                      loading ? (
                        <Button
                          bg="white"
                          color="#059157"
                          border="rgba(0, 0, 0, 0.4)"
                          className="rep-btn"
                        >
                          Loading document...
                        </Button>
                      ) : (
                        <Button
                          bg="white"
                          color="#059157"
                          border="rgba(0, 0, 0, 0.4)"
                          className="rep-btn"
                        >
                          Download Report
                          <DownloadReportIcon className="ms-2" />
                        </Button>
                      )
                    }
                  </PDFDownloadLink>
                )}
              </div>
              <div className="col-5 col-md-6 col-lg-2">
                <Select
                  placeholder="Sort by"
                  fullWidth
                  options={[
                    { name: "All Transactions", value: "" },
                    { name: "Successful Transactions", value: "success" },
                    { name: "Failed Transactions", value: "failed" },
                    { name: "Pending Transactions", value: "processing" },
                  ]}
                  onChange={handleStatusChange}
                />
              </div>
            </div>
            <div className="trans-table">
              <table className="table align-middle">
                <thead className="header">
                  <tr>
                    <th></th>
                    <th>Plan Name</th>
                    <th style={{ minWidth: "100px" }}>Date</th>
                    <th>Plan Type</th>
                    <th className="text-center status">
                      <div className="gd">Status</div>
                    </th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data.map((item: any, index: number) => {
                    const isCardVer: boolean =
                      item.reference.split("-")[0] === "CV";
                    const isWalletTrans: boolean =
                      item.reference.split("-")[0] === "WT";
                    const isWalletTopUp: boolean =
                      item.reference.split("-")[0] === "WTU";
                    const isTargetTopUp: boolean =
                      item.reference.split("-")[0] === "TGTU";
                    const isWithdrawal: boolean =
                      item.reference.split("-")[0] === "ptba";
                    return (
                      <tr
                        key={index}
                        onClick={() => {
                          setSelectedData(item);
                          setShowDetails(true);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <td>
                          {/* <td style={{ width: "10%" }}> */}
                          <div className="icon align-middle">
                            {item.type === "debit" ? (
                              <img
                                src={outImg}
                                alt="outgoing"
                                width="40px"
                                height="40px"
                              />
                            ) : (
                              <img
                                src={inImg}
                                alt="incoming"
                                width="40px"
                                height="40px"
                              />
                            )}
                          </div>
                        </td>
                        <td>
                          {isCardVer
                            ? "Card Verification"
                            : isWalletTrans
                            ? "Wallet Transaction"
                            : isWalletTopUp
                            ? "Wallet Top Up"
                            : isWithdrawal
                            ? "Withdrawal"
                            : item.plan_name}
                          {/* : `${item.plan_name}`} */}
                          {/* {item.transactionable.name} */}
                        </td>
                        <td>
                          <Moment format="MMM DD, YYYY">
                            {item.created_at}
                          </Moment>
                          {/* {item.date} */}
                        </td>
                        <td>
                          {isCardVer
                            ? "Card Verification"
                            : isWalletTrans
                            ? "Wallet Transaction"
                            : isWalletTopUp
                            ? "Wallet Top Up"
                            : isWithdrawal
                            ? "Withdrawal"
                            : isTargetTopUp
                            ? "Target Group Top Up"
                            : item.savings_type}
                        </td>
                        <td className="text-center status">
                          <div
                            className={`${
                              item.status === "success"
                                ? "good"
                                : item.status === "processing"
                                ? "processing"
                                : "bad"
                            }`}
                          >
                            {item.status === "success"
                              ? "Success"
                              : item.status === "processing"
                              ? "Processing"
                              : "Failed"}
                          </div>
                        </td>
                        <td>
                          <div className="amt">
                            {/* {item.amount && `₦ ${formatNumber(parseFloat(item.amount))}`} */}
                            <NairaIcon
                              style={{
                                width: "13px",
                                height: "14px",
                                marginInlineEnd: "0.25rem",
                              }}
                            />
                            {format4dpNumber(item.amount)}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Pagination
              transPerPage={data.per_page}
              totalTrans={data.total}
              currentPage={data.current_page}
              lastPage={data.last_page}
              setCurrPageInfo={setCurrPageInfo}
              pageLimit={parseInt(data.per_page)}
              currPageInfo={currPageInfo}
              refetch={refetch}
            />
          </>
        ) : (
          <div className="mt-4 pt-4">
            <NoData
              text="You have not yet performed a transaction. You can perform one "
              link="/user/savings"
            />
          </div>
        )}
      </Wrapper>

      <ModalA isShown={showDetails} hide={() => setShowDetails(false)}>
        <ShowTransDetails
          transaction={selectedData}
          closeModal={() => setShowDetails(false)}
        />
      </ModalA>
    </>
  );
};

const Wrapper = styled.div`
.opt {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  // margin-inline-start: auto;

  .date-picker {
    // font-size: 16px;
    //   line-height: 17px;
    color: #7b7b7b;
    padding: 1rem;
    padding-left: 2rem;
    border-radius: 1rem;
    border: 1px solid #bec6df;
    margin-inline-start: 0.5rem;
    margin-inline-end: 0.5rem;
  }

  .search {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .search-btn {
    padding: 1rem !important;
    min-width: 140px;
  }

  .rep-sort {
    // display: flex;
    // flex-direction: row;
    // justify-content: space-between;
    // margin-bottom: 1rem;

  }
  .rep-btn {
    // margin-inline-start: auto;
    padding: 1rem;
    height: 60px !important;
    width: -webkit-fill-available;
  }

}

.trans-table {
  text-transform: capitalize;
  // display: flex;
  // flex-direction: column;
    // font-size: 16px;
    table {
    },
      th {
        padding: 0.5rem;
      }
      td {
        color: #33277b;
        padding: 0.5rem;
      }
    }
    .header{
      color: #47486B99;
    }
    .status {
      width: 20%;
    }
    .bad {
      color: #ea0505b2;
      background: rgba(234, 5, 5, 0.15);
      border-radius: 5px;
      padding: 0.5rem;
    }
    .good {
      color: #059157;
      background: rgba(207, 232, 222, 0.2);
      border-radius: 5px;
      padding: 0.5rem;
    }
    .processing {
      color: #F3B756;
      background: rgba(207, 232, 222, 0.2);
      border-radius: 5px;
      padding: 0.5rem;
    }
    .amt {
      display: flex;
      flex-direction row;
      align-items: center;
    }
    .pagination {
      width: fit-content;
    }

    @media screen and (min-width: 500px) {
      .gd {
        margin: 0rem 2rem 0rem 0rem;
        padding: 0px;
      }
      .good,
      .bad,
      .processing {
        margin-right: 2rem;
      }

    }

    @media screen and (min-width: 500px and max-width: 980) {
       .rep-btn {
        width: -webkit-fill-available;
       }
    }

    @media screen and (max-width: 500px) {
      padding: 0;
      .trans-table {
        overflow-x: scroll;
        table {
        min-width: 550px;
        },
          th,
          td {
            padding: 0.25rem;
            img {
              height: 25px;
              width: 25px;
            }
          }
        }
      }
    }
    
  }

  @media screen and (max-width: 500px) { 
    .search-btn {
      padding: 0;
      margin-bottom: 1rem;
      width: -webkit-fill-available;
    }
  }
`;

export default TransactionTable;
