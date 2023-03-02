import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { individualSavings, targetGroupSavings } from "../utils/routes";

import Doughnut1 from "./charts/Doughnut1";
import Doughnut2 from "./charts/Doughnut2";

const DCardRow2 = () => {
  const navigate = useNavigate();

  return (
    <DCardRow2.Wrapper>
      <div className="row">
        <div className="col-md-6 p-4">
          <div
            className="card1"
            onClick={() => navigate(`${individualSavings}`)}
          >
            <Doughnut1 />
          </div>
        </div>
        <div className="col-md-6 p-4">
          <div
            className="card1"
            onClick={() => navigate(`${targetGroupSavings}`)}
          >
            <Doughnut2 />
          </div>
        </div>
      </div>
    </DCardRow2.Wrapper>
  );
};

DCardRow2.Wrapper = styled.div`
  // // font-size: 16px;
  // margin: 2rem 0 2rem 0;
  // .card-row2 {
  //   display: flex;
  //   align-items: center;
  // }
  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .card1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // padding: 1rem;
    background: rgba(207, 232, 222, 0.2);
    // border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    cursor: pointer;
  }

  .card1:hover,
  .card1:focus,
  .card1:active {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  }
`;

export default DCardRow2;
