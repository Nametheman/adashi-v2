import React from "react";
import styled from "styled-components";

import Button from "../bits/Button";
import { Heading5 } from "../bits/Text";

interface GeneralNotifProps {
  onConfirm: Function;
  notifText: React.ReactNode;
  notifTitle: string;
  confirmText: string;
}

const GeneralNotif = (props: GeneralNotifProps) => {
  const { onConfirm, notifTitle, notifText, confirmText } = props;

  return (
    <Wrapper>
      <div className="header">
        <Heading5 mb={"0"}>{notifTitle}</Heading5>
      </div>

      {notifText}

      <div className="ft">
        <Button
          // fontSize="16px"
          className="me-4"
          onClick={() => onConfirm()}
        >
          {confirmText}
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

export default GeneralNotif;
