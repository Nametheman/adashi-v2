import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import reward from "../assets/icons/gift-box.svg";
import { ReactComponent as NairaIcon } from "../assets/icons/naira-icon.svg";
import savenow from "../assets/icons/savenow.svg";
import { ReactComponent as WithdrawIcon } from "../assets/icons/withdraw.svg";
import backGround from "../assets/img/gift-bg.jpeg";
import backGround2 from "../assets/img/gift-bg2.png";
import { RootState, useAppSelector } from "../redux/store";
import { savings, stash, withdrawal } from "../utils/routes";

import AmountDisplay from "./bits/AmountDisplay";

interface DCardRow1Props {
  stashBalNaira: string | 0 | undefined;
  stashBalKobo: string | 0 | undefined;
}

const DCardRow1 = ({ stashBalNaira, stashBalKobo }: DCardRow1Props) => {
  const navigate = useNavigate();
  const amountDisplayState = useAppSelector(
    (state: RootState) => state.amountDisplay
  );

  return (
    <DCardRow1.Wrapper>
      <div className="row">
        <div className="col-md-6 col-lg-3 p-3">
          <div className="card1" onClick={() => navigate(`../${savings}`)}>
            <img
              src={savenow}
              alt="save now icon"
              className="img1"
              width="30px"
              height="30px"
            />
            <p className="m-2" style={{ fontSize: "14px", fontWeight: "500" }}>
              Choose a plan
            </p>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 p-3">
          <div className="card2" onClick={() => navigate(`../${withdrawal}`)}>
            {/* <img src={withdraw} alt="withdraw icon" className="img1" style={{ fill: "red" }} /> */}
            <WithdrawIcon
              fill="#47486B"
              className="img1"
              aria-label="Withcraw icon"
            />
            <p className="m-2" style={{ fontSize: "14px", fontWeight: "500" }}>
              Withdraw
            </p>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 p-3">
          <div className="card3" onClick={() => navigate(`../${stash}`)}>
            <p
              className="mt-0 mb-2"
              style={{ fontSize: "14px", fontWeight: "500" }}
            >
              My Purse
            </p>
            <h2 className="my-0 savings">
              <NairaIcon className="me-1" />
              <AmountDisplay
                text={`${stashBalNaira}.${stashBalKobo}`}
                isAsterisk={amountDisplayState.asteriskStatus}
              />
            </h2>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 p-3">
          <div className="card4a">
            <div className="card4">
              <img
                src={reward}
                alt="save now icon"
                width="60px"
                height="60px"
              />
              <div className="mt-2">
                <b>Get free N1,000</b>
                <p>
                  Refer and get paid for every friend that signs up and saves
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DCardRow1.Wrapper>
  );
};

DCardRow1.Wrapper = styled.div`
  // // font-size: 16px;
  // .card-row1 {
  //   display: flex;
  //   align-items: center;
  //   margin: 2rem 0 2rem 0;
  // }
  .row {
    width: 94%;
    align-items: center;
  }
  .img1 {
    width: 25px;
    height: 25px;
  }
  .card1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.6rem 2rem;
    color: #059157;
    width: 225px;
    background: #cfe8de33;
    border-radius: 10px;
    // min-height: 250px;
    cursor: pointer;
    // border: 1px solid rgba(0, 0, 0, 0.2);
  }
  .card2 {
    display: flex;
    width: 225px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.6rem 2rem;
    // padding: 2rem 3rem 2rem 3rem;
    color: #47486b;
    background: rgba(207, 232, 222, 0.2);
    border-radius: 10px;
    // min-height: 250px;
    // border: 1px solid rgba(0, 0, 0, 0.2);
    cursor: pointer;
    h2 {
      color: #33277b;
      font-size: 14px;
    }
  }

  .card3 {
    display: flex;
    flex-direction: column;
    width: 225px;
    align-items: center;
    justify-content: center;
    padding: 0.6rem 2rem;
    // padding: 2rem 3rem 2rem 3rem;
    color: #33277b;
    background: rgba(207, 232, 222, 0.2);
    border-radius: 10px;
    // min-height: 250px;
    // border: 1px solid rgba(0, 0, 0, 0.2);
    cursor: pointer;
    h2 {
      color: #33277b;
      margin: 0;
      padding: 0;
      font-size: 25px;
      font-weight: 600;
    }
    .savings {
      display: flex;
      flex-direction: row;
      align-items: bottom;
      // .savingsIcon {
      //   margin-inline-end: 0.25rem;
      // }
    }
  }

  .card1:hover,
  .card1:focus,
  .card1:active,
  .card2:hover,
  .card2:focus,
  .card2:active,
  .card3:hover,
  .card3:focus,
  .card3:active {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  }

  .card4 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0.25rem 1rem 0.25rem 2rem;
    height: 140px;
    width: 285px;
    color: #fff;
    background-image: url("${backGround}");
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 20px;
    // min-height: 250px;
    // box-shadow: 0px 8px 4px 0px #059157;
    cursor: pointer;
    p {
      font-weight: regular;
      margin-bottom: 5px;
      font-size: 13px;
    }
    b {
      font-size: 14.5px;
    }

    img {
      width: 45px;
    }
  }

  .card4a:hover,
  .card4a:focus,
  .card4a:active {
    background-image: url("${backGround2}");
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 20px;
    /* padding: 0 0 023rem; */
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    // background: linear-gradient(101.43deg, #eba10f -2.83%, #059157 73.19%);
  }

  @media screen and (max-width: 500px) {
  }
`;

export default DCardRow1;
