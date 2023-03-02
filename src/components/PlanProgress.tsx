import { Progress } from "antd";
import React from "react";
import styled from "styled-components";

import { ReactComponent as NairaIcon } from "../assets/icons/naira-icon.svg";
import { ReactComponent as RollOverIcon } from "../assets/icons/rollover.svg";
import { format4dpNumber, formatNumber } from "../helpers/formatNumbers";

interface PlanProgressProps {
  totalAmt: number;
  cycleAmt: string;
  achievedPercent?: number;
  achievedAmt: number;
  cycle: string;
  id?: number;
  maturityDate: string;
  setCurrentModal?: Function;
  progressRef?: any;
  cardHeight?: number;
  isMature: boolean;
}

const PlanProgress = (props: PlanProgressProps) => {
  const {
    totalAmt,
    achievedAmt,
    cycle,
    cycleAmt,
    // maturityDate,
    setCurrentModal,
    progressRef,
    cardHeight,
    isMature,
  } = props;
  // const achievedPercent = parseFloat(((achievedAmt / totalAmt) * 100).toFixed(2));
  // console.log(cycleAmt);
  // console.log(typeof cycleAmt);
  const achievedPercent = Math.round(
    (Number(achievedAmt) / Number(totalAmt)) * 100
  );
  // const currDate = moment().format("YYYY-MM-DD");
  // const currDate = new Date();
  // let realMaturity = null;

  // if (maturityDate) {
  //   realMaturity = new Date(maturityDate);
  // }

  return (
    <Wrapper ref={progressRef} cardHeight={cardHeight} className="card-body">
      <div className="title">
        <h2>
          <b>Plan Progress</b>
        </h2>
        <hr className="line" />
      </div>
      <div className="body">
        <div className="card-main">
          <div className="card-amt">
            <div className="curr">
              <p>Current Balance</p>
              <h2 className="my-0 savings">
                <NairaIcon className="savingsIcon" />
                <b>{format4dpNumber(achievedAmt)}</b>
              </h2>
            </div>
            <div className="vertical"></div>
            <div className="status">
              <p>{cycle}</p>
              <h2 className="my-0 savings">
                <NairaIcon className="savingsIcon" />
                <b>{format4dpNumber(cycleAmt)}</b>
              </h2>
              {/* <h2>
                <b>&#8358;&nbsp;{cycleAmt}</b>
              </h2> */}
            </div>
          </div>
          <Progress
            percent={achievedPercent}
            status="active"
            strokeColor="#059157"
            trailColor="#BED0BB"
            type="line"
            strokeLinecap="round"
            showInfo={false}
          />
          <div className="card-btm">
            <p>{achievedPercent}% achieved</p>
            <p className="target">
              {/* <b>{achievedAmt > 0 ? format4dpNumber(achievedAmt) : 0}</b> */}
              Target:{" "}
              <NairaIcon
                style={{
                  width: "13px",
                  height: "14px",
                  marginInlineStart: "0.5rem",
                }}
                className="savingsIcon"
              />
              <b>{formatNumber(totalAmt)}</b>
            </p>
          </div>

          {/* {realMaturity && realMaturity <= currDate && ( */}
          {isMature && (
            <div
              className="roll"
              onClick={() => setCurrentModal && setCurrentModal(3)}
            >
              <RollOverIcon className="me-2" />
              Rollover
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: ${(props: PlanProgressProps) =>
    props.cardHeight ? `${props.cardHeight}px` : "347px"};
  background: #ffffff;
  // background: rgba(207, 232, 222, 0.2);
  border: 1px solid rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
  border-radius: 20px;
  padding: 1rem 2rem;
  // font-size: 16px;
  text-transform: capitalize;

  .line {
    border: 1px solid rgba(0, 0, 0, 0.4);
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
    justify-content: space-between;
    margin-top: 5rem;
    h2 {
      color: #33277b;
    }
    p {
      margin-bottom: 0.5rem;
    }

    .card-amt {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .savings {
        display: flex;
        flex-direction: row;
        align-items: bottom;

        h2 {
          color: #fff !important;
        }
        .savingsIcon {
          margin-inline-end: 0.25rem;
        }
      }

      .vertical {
        border-right: 2px solid #33277b;
      }

      .curr {
        margin: 0 1rem 0.5rem 0;
      }

      .status {
        margin: 0 1rem 0.5rem 1rem;
      }
    }
  }

  // .card-amt {
  //   display: flex;
  //   align-items: center;
  //   h2,
  //   h5 {
  //     color: #33277b;
  //   }
  // }

  .card-btm {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;

    .target {
      display: flex;
      align-items: center;
    }
  }

  .roll {
    cursor: pointer;
    color: #059157;
    margin-left: auto;
    margin-top: 0.5rem;
  }

  @media screen and (min-width: 992px) and (max-width: 1400px) {
    .savings {
      font-size: 20px;
  }

  @media screen and (max-width: 500px) {
    padding: 0.5rem 1rem;
    .savings {
      font-size: 18px;
      .savingsIcon {
        width: 19px;
        height: 20px;
      }
    }
  }
`;

export default PlanProgress;
