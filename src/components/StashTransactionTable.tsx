import { Skeleton } from "antd";
import Moment from "react-moment";
import styled from "styled-components";

import { ReactComponent as NairaIcon } from "../assets/icons/naira-icon.svg";
import { formatNumber } from "../helpers/formatNumbers";
import { useTransactionHistoryQuery } from "../redux/services/transaction-service";

import inImg from "./../assets/img/in.png";
import outImg from "./../assets/img/out.png";
import NoData from "./bits/NoData";

const StashTransactionTable = () => {
  const { data, isLoading }: any = useTransactionHistoryQuery({
    pageNo: 1,
    pageSize: 3,
    status: "",
    duration: "",
  });

  // if (data) console.log(data);

  // const data = {
  //   data: [],
  // };

  return (
    <Wrapper className="col-12">
      <div className="trans-table">
        {isLoading ? (
          <Skeleton active />
        ) : data?.data?.length > 0 ? (
          <table className="table align-middle">
            <thead className="header">
              <tr>
                <th style={{ width: "5%" }}></th>
                <th>Activity</th>
                <th>Date</th>
                <th className="amt">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data?.data
                .filter(
                  (item: any) =>
                    item.reference.split("-")[0] === "WT" ||
                    item.reference.split("-")[0] === "WTU"
                )
                .map((item: any, index: number) => {
                  const isWalletTrans: boolean =
                    item.reference.split("-")[0] === "WT";
                  const isWalletTopUp: boolean =
                    item.reference.split("-")[0] === "WTU";

                  return (
                    <tr key={index}  style={{background: `${index % 2 === 0 ? '#FFF' : '#EEEFEF'}`}}>
                      <td>
                        {/* <td style={{ width: "10%" }}> */}
                        <div className="icon align-middle">
                          {item.type === "debit" ? (
                            <img src={outImg} alt="outgoing" style={{height:'30px', width:'30px'}} />
                          ) : (
                            <img src={inImg} alt="incoming" style={{height:'30px', width:'30px'}}/>
                          )}
                        </div>
                      </td>
                      <td>
                        {isWalletTrans
                          ? "Wallet Transaction"
                          : isWalletTopUp
                          ? "Wallet Top Up"
                          : `${item.transactionable.name}`}
                      </td>
                      <td>
                        <Moment format="MMM DD, YYYY">{item.created_at}</Moment>
                      </td>

                      <td>
                        <div className="amt">
                          <NairaIcon
                            style={{
                              width: "13px",
                              height: "14px",
                              marginInlineEnd: "0.25rem",
                            }}
                          />
                          {formatNumber(parseFloat(item.amount))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : (
          <div className="mt-4 pt-4">
            <NoData
              text="You have not yet performed a transaction. You can perform one "
              link="/user/savings"
            />
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .trans-table {
    // font-size: 16px;
    // border: 1px solid rgba(0, 0, 0, 0.4);
    box-sizing: border-box;
    border-radius: 20px;
    table {
      margin-top: 30px;
    
      th {

        padding: 0.5rem;
        color: #9F9FB1;
        background: #F5FAF8;
      }
      td {
        color: #33277b;
        padding: 0.5rem;
      }

      thead{
        tr{
          th{
            font-size: 13px;
            border-bottom-width: 0 !important;
          }
        }
      }
      tbody{
        font-size: 12px;
        font-weight: 600;
        border-top: 0 !important;
        td{
          border-bottom-width: 0 !important;
        }
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
    .amt {
      display: flex;
      flex-direction row;
      align-items: center;


    }



    @media screen and (min-width: 500px) {
      .gd {
        margin: 0rem 2rem 0rem 0rem;
        padding: 0px;
      }
      .good {
        margin-right: 2rem;
      }
      .bad {
        margin-right: 2rem;
      }
    }

    @media screen and (max-width: 500px) {
      .trans-table {
        overflow-x: auto;
        // width: fit-content;
        table {
        },
          th,
          td {
            font-size: 12px !important;
          }
        }
      }
    }

  }
`;

export default StashTransactionTable;
