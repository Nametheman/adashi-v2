import React from "react";
import styled from "styled-components";

// import { formatNumber } from "../utils/helper";
import cardBg from "../assets/img/cardbg.png";

import { Heading5 } from "./bits/Text";

type CardProps = {
  key?: number;
  bankName: string;
  bankId: string;
  acctNo: string;
  setTempBankId: Function;
  setDelBank: Function;
  // gateway: string;
};

const Bank = (props: CardProps) => {
  const { bankName, bankId, acctNo, setTempBankId, setDelBank } = props;

  const onDelete = () => {
    setDelBank(true);
    setTempBankId(bankId);
  };

  return (
    <>
      <CardWrapper onClick={() => onDelete()}>
        <Heading5 className="text">{bankName}</Heading5>
        <p>{acctNo}</p>
      </CardWrapper>
    </>
  );
};

export default Bank;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
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
  .text {
    color: #fff;
  }

  @media screen and (max-width: 500px) {
    // height: 150px;
    width: 100%;
    margin-right: 0;
  }
`;
