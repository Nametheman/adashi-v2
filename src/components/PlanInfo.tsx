import React from "react";
import Moment from "react-moment";
import styled from "styled-components";

import masterCardIcon from "../assets/icons/mastercard.svg";
import visaIcon from "../assets/icons/visa.svg";

interface PlanInfoProps {
  startDate: string;
  maturityDate: string;
  planType: string;
  nextSavingsDate: string;
  debitCardNo?: number;
  debitCardType?: string;
  status: string;
  isMature: boolean;
  memberEmails?: string[];
  infoRef?: any;
}

const PlanInfo = (props: PlanInfoProps) => {
  const {
    startDate,
    maturityDate,
    planType,
    nextSavingsDate,
    debitCardNo,
    debitCardType,
    status,
    isMature,
    memberEmails,
    infoRef,
  } = props;

  let cardImg = "";
  debitCardType?.trim() === "visa"
    ? (cardImg = visaIcon)
    : (cardImg = masterCardIcon);

  return (
    <Wrapper ref={infoRef} className="card-body">
      <div className="title">
        <h2>
          <b>Plan Info</b>
        </h2>
        <hr className="line" />
      </div>
      <div className="card-main">
        <div className="card-row">
          <div className="start">
            <p style={{fontSize:'12px'}}>Start Date</p>
            <p  style={{fontSize:'15px'}}>
              <Moment format="MMM DD, YYYY" style={{ fontWeight: "bold" }}>
                {startDate}
              </Moment>
            </p>
          </div>
          <div className="end">
            <p style={{fontSize:'12px'}}>Maturity Date</p>
            <p className="d-flex flex-col" style={{fontSize:'15px'}}>
              {isMature ? (
                <b style={{ color: "#059157" }}>Plan is mature</b>
              ) : (
                <Moment format="MMM DD, YYYY" style={{ fontWeight: "bold" }}>
                  {maturityDate}
                </Moment>
              )}
            </p>
          </div>
        </div>
        <div className="card-row">
          <div className="type">
            <p style={{fontSize:'12px'}}>Plan Type</p>
            <p>
              <b>{planType}</b>
            </p>
          </div>
          <div className="next">
            <p style={{fontSize:'12px'}}>Next Savings Date</p>
            <p>
              {nextSavingsDate ? (
                <Moment format="MMM DD, YYYY" style={{ fontWeight: "bold" }}>
                  {nextSavingsDate}
                </Moment>
              ) : (
                <b>nil</b>
              )}
            </p>
          </div>
        </div>
        <div className="card-row">
          <div className="debit">
            <p style={{fontSize:'12px'}}>Debit Card</p>
            {debitCardNo && debitCardType ? (
              <p>
                <img src={cardImg} alt="card logo" style={{ width: "50px" }} />
                <b className="ms-2">{debitCardNo}</b>
              </p>
            ) : (
              <b>nil</b>
            )}
          </div>
          <div className="status">
            <p style={{fontSize:'12px'}}>Status</p>
            <p>
              <b>{status}</b>
            </p>
          </div>
        </div>
        {memberEmails && memberEmails.length > 0 && (
          <div className="email-row">
            <p>Email Address</p>
            {memberEmails.map((email) => (
              <span className="email-tag">{email}</span>
            ))}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 320px;
  background: #ffffff;
  // background: rgba(207, 232, 222, 0.2);
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  border-radius: 20px;
  padding: 1rem 2rem;
  // font-size: 16px;
  text-transform: capitalize;

  p {
    margin-bottom: 0.5rem;
  }

  .line {
    // border: 0.1px solid rgba(0, 0, 0, 0.01);
  }

  .title {
    h2 {
      font-size: 17px;
      color: #33277b;
    }
    margin-bottom: 1rem;
  }

  .card-main {
    display: flex;
    flex-direction: column;
    h2,
    h5 {
      color: #33277b;
    }
  }

  .card-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 0.5rem;

    div:nth-of-type(2) {
      display: flex;
      flex-direction: column;
      align-items: end;
    }

    .start{

    }
  }

  .email-row {
    .email-tag {
      color: #333333;
      background: #ffffff;
      border: 1px solid #c4c4c4;
      padding: 0.25rem;
      border-radius: 10px;
      text-transform: none;
      margin-right: 0.5rem;
    }
  }

  // .card-btm {
  //   display: flex;
  //   justify-content: space-between;
  //   margin-top: 1rem;
  // }
`;

export default PlanInfo;
