import styled from "styled-components";

// import { ReactComponent as CloseIcon } from "../assets/icons/close-icon.svg";
import Button from "./bits/Button";
// import { useNavigate } from "react-router-dom";

interface ConfirmDeleteProps {
  // closeModal: Function;
  //   pageUp: string;
  card?: boolean;
  func: Function;
  submitDelete?: Function;
  decline?: boolean;
}

const ConfirmDelete = (props: ConfirmDeleteProps) => {
  const { card, func, submitDelete, decline } = props;

  const del = () => {
    submitDelete && submitDelete();
  };

  return (
    <Wrapper>
      <div className="header">
        <h5 style={{ color: "#33277b" }}>
          <b>Warning</b>
        </h5>
      </div>
      <div>
        Are you sure you want to {decline ? "decline" : "delete"} this{" "}
        {card ? "card" : "plan"} ?
      </div>
      <div className="ft">
        <Button
          bg="white"
          color="#059157"
          border="#059157"
          fontSize="16px"
          className="me-4"
          onClick={() => func(0)}
        >
          No
        </Button>
        <Button fontSize="16px" className="me-4" onClick={() => del()}>
          Yes
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
    margin-bottom: 1rem;
  }

  .ft {
    margin-top: 1rem;
    margin-left: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export default ConfirmDelete;
