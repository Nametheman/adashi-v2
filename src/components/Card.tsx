import React from "react";
import styled from "styled-components";

// import { formatNumber } from "../utils/helper";
import masterCardIcon from "../assets/icons/mastercard.svg";
import visaIcon from "../assets/icons/visa.svg";
import cardBg from "../assets/img/cardbg.png";

type CardProps = {
  key?: number;
  //   name: string;
  bank: string;
  brand: string;
  last4: number;
  cardId: string;
  expMonth: string;
  expYear: string;
  setTempCardId: Function;
  setDelCard: Function;
  // gateway: string;
};

const Card = (props: CardProps) => {
  const {
    bank,
    brand,
    last4,
    expMonth,
    expYear,
    cardId,
    setTempCardId,
    setDelCard,
  } = props;
  let cardImg = masterCardIcon;
  if (brand === "visa") cardImg = visaIcon;

  const onDelete = () => {
    setDelCard(true);
    setTempCardId(cardId);
  };

  return (
    <>
      <CardWrapper onClick={() => onDelete()}>
        <div className="currency">
          <span className="span1">
            {/* <img src={pmbCardLogo} alt="pmb logo" /> */}
            {bank}
          </span>
          <span className="span2">
            <img src={cardImg} alt="card logo" style={{ width: "50px" }} />
          </span>
        </div>
        <p className="cardNo">**** **** {last4}</p>
        {/* <p>{bank}</p> */}
        <p>
          {expMonth}/{expYear}
        </p>
        {/* <div className="amount">
        <p></p>
        <p className="text-light">
          formatting the amount will fail a test case.
          {formatNumber(parseFloat(account.balance)) || "0.00"}{" "}
          {`exp`} <span>{}</span>
          {`${account.balance} `} <span>{account.currency}</span>
        </p>
      </div> */}
      </CardWrapper>
    </>
  );
};

export default Card;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  // margin-bottom: 20px;
  margin-right: 20px;
  position: relative;
  max-width: 350px;
  min-width: 300px;
  // width: 100%
  min-height: 184px;
  height: 150px;
  background-image: url("${cardBg}");
  box-shadow: 0px 10px 20px rgba(138, 138, 138, 0.5);
  border-radius: 30px;
  padding: 13px;
  color: #fff;
  p {
    padding: 0;
    font-weight: 500;
    // color: #fff;
    // font-size: 16px;
    font-style: normal;
    margin: 0;
  }
  // .pmbSvg {
  //   fill: #fff;
  // }
  .currency {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: -webkit-fill-available;
    width: -moz-available;
    .span1 {
      font-size: 20px;
      font-weight: 800;
      border-radius: 50%;
      // width: 90px;
      height: 36px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      // margin-right: 15px;
      img {
        width: 90px;
      }
    .span2 {
      font-size: 20px;
      font-weight: 800;
      border-radius: 50%;
      // width: 90px;
      height: 36px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      // margin-right: 15px;
      margin-right: 0;
      // img {
      //   width: 50px;
      // }
    }
    // p {
    //   padding: 0;
    //   font-weight: 500;
    //   font-size: 14px;
    //   margin: 0;
    //   color: #3e4c59;
    //   font-style: normal;
    // }
  }
  // .cardNo {
  //   padding: 0;
  //   font-weight: 500;
  //   font-size: 20px;
  //   margin: 0;
  //   color: #fff;
  //   font-style: normal;
  // }
  // .amount {
  //   margin-top: 20px;
  //   p {
  //     font-weight: 500;
  //     // font-size: 16px;
  //     line-height: 16px;
  //     /* identical to box height, or 100% */

  //     /* white */

  //     color: #ffffff;
  //   }
  // }
  // > img {
  //   position: absolute;
  //   bottom: 10px;
  //   right: 10px;
  //   cursor: pointer;
  // }
  @media screen and (max-width: 500px) {
    // height: 150px;
    width: 100%;
    margin-right: 0;
  }
`;
