import React from "react";
import Moment from "react-moment";
import styled from "styled-components";

import { ReactComponent as RollOverIcon } from "../assets/icons/rollover.svg";
import { userData } from "../helpers/authHelper";

interface GrpPlanInfoProps {
  startDate: string;
  maturityDate: string;
  nextCollectingMember: string;
  nextContributionDate: string;
  planType: string;
  status: string;
  // planInfoRef: any;
  // cardHeight: number;
  ownerId?: string;
  rollOverGroup?: Function;
}

const GrpPlanInfo = (props: GrpPlanInfoProps) => {
  const {
    startDate,
    maturityDate,
    planType,
    nextCollectingMember,
    nextContributionDate,
    status,
    // planInfoRef,
    // cardHeight,
    ownerId,
    rollOverGroup,
  } = props;

  // const currDate = new Date();
  // const realMaturity = new Date(maturityDate);

  return (
    <Wrapper className="card-body">
      {/* <Wrapper ref={planInfoRef} cardHeight={cardHeight} className="card-body"> */}
      <div className="title">
        <h2>
          <b>Plan Info</b>
        </h2>
        <hr className="line" />
      </div>
      <div className="card-main">
        <div className="card-row">
          <div className="start">
            <p>Start Date</p>
            <p>
              <Moment format="MMM DD, YYYY" style={{ fontWeight: "bold" }}>
                {startDate}
              </Moment>
            </p>
          </div>
          <div className="end">
            <p>Maturity Date</p>
            <p>
              <Moment format="MMM DD, YYYY" style={{ fontWeight: "bold" }}>
                {maturityDate}
              </Moment>
            </p>
          </div>
        </div>
        <div className="card-row">
          <div className="collect">
            <p>Next Collecting Member</p>
            <p>
              {nextCollectingMember ? (
                <b>{nextCollectingMember}</b>
              ) : (
                <b>Nil</b>
              )}
              <b>{nextCollectingMember}</b>
            </p>
          </div>
          <div className="contrib">
            <p>Next Contribution</p>
            <p>
              {/* <b>{nextContributionDate}</b> */}
              {nextContributionDate ? (
                <Moment format="MMM DD, YYYY" style={{ fontWeight: "bold" }}>
                  {nextContributionDate}
                </Moment>
              ) : (
                <b>Nil</b>
              )}
            </p>
          </div>
        </div>
        <div className="card-row">
          <div className="type">
            <p>Plan Type</p>
            <p>
              <b>{planType}</b>
            </p>
          </div>
          <div className="status">
            <p>Status</p>
            <p>
              <b>{status}</b>
            </p>
          </div>
        </div>
        {status === "matured" && ownerId === userData().id && (
          <div
            className="roll"
            onClick={() => rollOverGroup && rollOverGroup()}
          >
            <RollOverIcon className="me-2" />
            Rollover
          </div>
        )}
      </div>
    </Wrapper>
  );
};

// min-height: ${(props: GrpPlanInfoProps) =>
//   props.cardHeight ? `${props.cardHeight}px` : "450px"};
const Wrapper = styled.div`
  text-transform: capitalize;
  height: 100%;
  min-height: 450px;
  // background: rgba(207, 232, 222, 0.2);
  border: 1px solid rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
  border-radius: 20px;
  padding: 1rem 2rem;
  // cursor: pointer;
  // font-size: 16px;

  // p {
  //   margin-bottom: 0.5rem;
  // }

  .line {
    // border: 1px solid rgba(0, 0, 0, 0.4);
  }

  .title {
    h2 {
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
    margin-bottom: 1rem;

    div:nth-of-type(2) {
      display: flex;
      flex-direction: column;
      align-items: end;
    }

    .status {
      text-transform: capitalize;
    }
  }

  .card-btm {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
  }

  .roll {
    display: flex;
    flex-direction: row;
    cursor: pointer;
    // justify-content: center;
    color: #059157;
    margin-left: auto;
    margin: 0.5rem 0;
  }

  @media screen and (max-width: 500px) {
    min-height: 0;
  }
`;

export default GrpPlanInfo;
