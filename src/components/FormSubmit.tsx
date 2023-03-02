import React from "react";
import styled from "styled-components";

// import { ReactComponent as CloseIcon } from "../assets/icons/close-icon.svg";
import { ReactComponent as CongratulationsIcon } from "../assets/icons/congratulations-icon.svg";

import Button from "./bits/Button";

interface FormSubmitProps {
  // closeModal: Function;
  // pageUp: string;
  edit?: boolean;
  del?: boolean;
  top?: boolean;
  roll?: boolean;
  stash?: boolean;
  bvn?: boolean;
  withdrawal?: boolean;
  onConfirm: Function;
}

const FormSubmit = (props: FormSubmitProps) => {
  const { edit, del, top, roll, stash, bvn, onConfirm, withdrawal } = props;

  return (
    <Wrapper>
      <div className="header">
        <h5 style={{ color: "#33277b" }}>
          <b>
            Congratulations <CongratulationsIcon />
          </b>
        </h5>
      </div>

      {withdrawal ? (
        <div>
          Your withdrawal is being processed. It will reflect in your bank in a
          few minutes.
        </div>
      ) : (
        <div>
          Your {bvn ? "bank details have" : stash ? "stash has" : "plan has"}{" "}
          been{" "}
          {edit
            ? "edited"
            : del
            ? "deleted"
            : top
            ? "topped up"
            : roll
            ? "rolled over"
            : bvn
            ? "saved"
            : "created"}{" "}
          successfully. Please click to continue.
        </div>
      )}

      <div className="ft">
        {/* <Button fontSize="16px" className="me-4" onClick={() => closeModal()}> */}
        <Button
          // fontSize="16px"
          className="me-4"
          onClick={() => onConfirm()}
        >
          {bvn ? "Go to dashboard" : "Ok"}
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

export default FormSubmit;
