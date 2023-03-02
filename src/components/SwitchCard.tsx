import React, { useEffect } from "react";
import styled from "styled-components";

import { ReactComponent as CloseIcon } from "../assets/icons/close-icon.svg";
import { cardList } from "../helpers/otherHelpers";
import { useGetCardDataQuery } from "../redux/services/transaction-service";

import Button from "./bits/Button";
import Select from "./bits/Select";
import { Label } from "./bits/Text";

interface SwitchCardsProps {
  closeModal: Function;
  addCardModal: Function;
  updCard: Function;
  // func: Function;
}

const SwitchCard = (props: SwitchCardsProps) => {
  const { data, refetch }: any = useGetCardDataQuery();
  const { closeModal, addCardModal, updCard } = props;

  // const cardList = (data: any) => {
  //   let arr: any = [];
  //   data?.data.forEach((card: any) => {
  //     arr.push({
  //       name: `****${card.last4}`,
  //       value: `${card.id}`,
  //     });
  //   });
  //   return arr;
  // };

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <div className="header">
        <h5 style={{ color: "#33277b" }}>
          <b>Select Card For Plan</b>
        </h5>
        <CloseIcon onClick={() => closeModal()} style={{ cursor: "pointer" }} />
      </div>

      <div className="mb-2">
        <Label color="#33277B">Select Payment Destination</Label>
        <Select
          placeholder="Debit Card"
          fullWidth
          options={[]}
          required
          disabled
        />
      </div>
      <div className="mb-2">
        <Label color="#33277B">Select Card</Label>
        <Select
          placeholder="Select Your Card"
          fullWidth
          name="cardId"
          options={data ? cardList(data) : []}
          onChange={(e: HTMLInputElement) => updCard(e)}
          required
        />
      </div>

      <div className="sec-btn">
        <Button
          fontSize="16px"
          onClick={() => addCardModal()}
          style={{ margin: "0 2rem 0 0" }}
        >
          Add New Card
        </Button>
        <Button fontSize="16px" onClick={() => closeModal()}>
          Proceed
        </Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 3rem;
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
    margin-top: 1rem;
    margin-bottom: 2rem;
  }

  .line {
    border: 1px solid rgba(0, 0, 0, 0.4);
  }

  .sec-btn {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    // margin-left: auto;
    margin-bottom: 1rem;
  }
`;

export default SwitchCard;
