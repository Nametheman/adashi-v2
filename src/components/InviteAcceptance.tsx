import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// import { ReactComponent as CloseIcon } from "../assets/icons/close-icon.svg";
import { ReactComponent as CongratulationsIcon } from "../assets/icons/congratulations-icon.svg";

import Button from "./bits/Button";

interface InviteAcceptanceProps {
  // closeModal: Function;
  pageUp: string;
  grpName: string;
}

const InviteAcceptance = (props: InviteAcceptanceProps) => {
  const { pageUp, grpName } = props;
  const navigate = useNavigate();

  return (
    <Wrapper>
      <div className="header">
        <h5 style={{ color: "#33277b" }}>
          <b>
            Congratulations <CongratulationsIcon />
          </b>
        </h5>
      </div>

      <div>
        <p>
          You have accepted the group invite and are now a member of {grpName}{" "}
          group.
        </p>
      </div>

      <div className="ft">
        {/* <Button fontSize="16px" className="me-4" onClick={() => closeModal()}> */}
        <Button
          fontSize="16px"
          className="me-4"
          onClick={() => navigate(`../${pageUp}`)}
        >
          Ok
        </Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  // width: 100%
  // height: 100%;
  color: #33277b !important;
  // font-size: 16px;

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 2rem;
  }

  .ft {
    margin-top: 2rem;
    margin-left: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export default InviteAcceptance;
