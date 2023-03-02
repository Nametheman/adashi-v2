import { Progress } from "antd";
import moment from "moment";
import React from "react";
import styled from "styled-components";

import { ReactComponent as NairaIcon } from "../assets/icons/naira-icon.svg";
import { ReactComponent as OpenPadlockImg } from "../assets/icons/padlock-open.svg";
import { ReactComponent as PadlockImg } from "../assets/icons/padlock.svg";
import memberImg from "../assets/img/grp-savings.png";
import { format4dpNumber, formatNumber } from "../helpers/formatNumbers";

import { Heading4 } from "./bits/Text";

interface SavingsCardProps {
  status: string;
  title: string;
  totalAmt: number;
  totalMembers?: number;
  collectedMembers?: number;
  rate?: number;
  achievedPercent?: number;
  achievedAmt?: number;
  id?: number;
  groupName?: string;
  endDate?: string;
  // members?: object[];
  members?: any;
  isGroup?: boolean;
  func(arg: Function): void;
}

const SavingsCard = (props: SavingsCardProps) => {
  const {
    status,
    title,
    totalAmt,
    endDate,
    // rate,
    achievedAmt,
    members,
    groupName,
    totalMembers,
    collectedMembers,
    isGroup,
    func,
  } = props;

  // const achievedPercent = parseFloat(((achievedAmt / totalAmt) * 100).toFixed(2));
  const achievedPercent = Math.round(
    (Number(achievedAmt) / Number(totalAmt)) * 100
  );
  const collectedPercent = Math.round(
    (Number(collectedMembers) / Number(totalMembers)) * 100
  );
  const currDate = moment().format("YYYY-MM-DD");
  return (
    <Wrapper className="card-body" onClick={func}>
      <div className="card-head">
        <Heading4 style={{ marginBottom: "0.5rem" }}>{title}</Heading4>
        {endDate && endDate <= currDate ? <OpenPadlockImg /> : <PadlockImg />}
      </div>
      <div className="members">
        {members?.map((item: object, index: number) => (
          <img key={index} src={memberImg} alt="member dp" />
        ))}
        <p className="mt-2">
          <b>{groupName}</b>
        </p>
      </div>
      <div className="card-main">
        <div className="target">
          <p>Target</p>
          <h2 className="my-0 savings">
            <NairaIcon className="savingsIcon" />
            <b>{formatNumber(totalAmt)}</b>
          </h2>
        </div>
        <div className="vertical"></div>
        <div className="status">
          <p>Status</p>
          <h2>
            <b style={{ textTransform: "capitalize" }}>{status}</b>
          </h2>
        </div>
      </div>
      {isGroup ? (
        <>
          <Progress
            percent={collectedPercent}
            status="active"
            strokeColor="#059157"
            trailColor="#BED0BB"
            type="line"
            strokeLinecap="round"
            showInfo={false}
          />
          <div className="card-btm">
            <p>
              <b>{collectedMembers}</b> member(s) collected
            </p>
            <p>
              <b>{totalMembers && totalMembers}</b> total member(s)
            </p>
          </div>
        </>
      ) : (
        <>
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
            <p>
              <b>
                {achievedAmt && achievedAmt > 0
                  ? format4dpNumber(achievedAmt)
                  : 0}
              </b>
            </p>
          </div>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: rgba(207, 232, 222, 0.2);
  border: 1px solid rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
  border-radius: 20px;
  padding: 1rem 2rem;
  // padding: 2rem 3rem 2rem 3rem;
  cursor: pointer;
  // font-size: 16px;

  .card-head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    text-transform: capitalize;
  }

  .card-main {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    h2 {
      color: #33277b;
    }
    p {
      margin-bottom: 0.5rem;
    }
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
    .target {
      margin-right: 1rem;
    }
    .status {
      margin-left: 1rem;
      margin-right: 1rem;
    }
  }

  .card-btm {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    p {
      margin-bottom: 0.5rem;
    }
  }

  .members {
  }

  // @media screen and (max-width: 1000px) {
  //   .status {
  //     margin-right: 3rem;
  //   }
  // }
  // @media screen and (min-width: 1300px) {
  //   .status {
  //     margin-right: 3rem;
  //   }
  // }
`;

export default SavingsCard;
