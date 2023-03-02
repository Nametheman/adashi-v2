import styled from "styled-components";

// import React from "react";
import { ReactComponent as BanksIcon } from "../assets/icons/bank-icon.svg";
import { ReactComponent as CardsIcon } from "../assets/icons/card-group.svg";
import { ReactComponent as CloseIcon } from "../assets/icons/close-icon.svg";

const BanksAndCards = ({ func }: any) => {
  return (
    <Wrapper>
      <div className="header">
        <h5 style={{ color: "#33277b" }}>
          <b>Manage Banks and Cards</b>
        </h5>
        <CloseIcon
          onClick={() => func(0)}
          style={{ cursor: "pointer", marginInlineStart: "1rem" }}
        />
      </div>
      <p>
        <b>Add and Delete Cards</b>
      </p>
      <div className="sav-plan mb-4" onClick={() => func(4)}>
        <CardsIcon className="me-2" />
        My Cards
      </div>
      <div className="sav-plan" onClick={() => func(5)}>
        <BanksIcon className="me-2" />
        My Banks
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 4rem;
  // width: 100%
  // height: 100%;
  color: #33277b !important;
  // font-size: 16px;

  p {
    // // font-size: 16px;
  }

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 2rem;
  }

  .sav-plan {
    padding: 1rem;
    background: rgba(207, 232, 222, 0.2);
    border: 1px solid rgba(0, 0, 0, 0.4);
    box-sizing: border-box;
    border-radius: 10px;
    cursor: pointer;
  }
`;

export default BanksAndCards;
