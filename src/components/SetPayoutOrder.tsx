import React, { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import { ReactComponent as CloseIcon } from "../assets/icons/close-icon.svg";
import { payoutOrderList } from "../helpers/otherHelpers";

import Button from "./bits/Button";
import LoadingButton from "./bits/LoadingButton";
import Select from "./bits/Select";
import { Label } from "./bits/Text";

interface SetPayoutOrderProps {
  closeModal: Function;
  joinGroup: Function;
  isLoading: boolean;
  updForm: Function;
  // members: string[];
  payoutOrderAvailable: number[];
}

const SetPayoutOrder = (props: SetPayoutOrderProps) => {
  const { closeModal, joinGroup, isLoading, updForm, payoutOrderAvailable } =
    props;

  //   const modalConfirm = () => {
  //     confirm();
  //     closeModal();
  //   };

  // const PAYOUT_ORDER_OPTIONS = new Array(members.length + 1)
  //   .fill(null)
  //   .map((_, index) => ({
  //     name: `${index + 1}`,
  //     value: index + 1,
  //   }));

  const {
    register,
    formState: { errors },
    handleSubmit,
    // reset,
  } = useForm<any>();

  const submit = (data: any, e: any) => {
    e.preventDefault();
    joinGroup();
  };

  return (
    <Wrapper>
      <div className="header">
        <h5 style={{ color: "#33277b", marginInlineEnd: "1rem" }}>
          <b>Set Payout Order</b>
        </h5>
        <CloseIcon onClick={() => closeModal()} style={{ cursor: "pointer" }} />
      </div>

      <form onSubmit={handleSubmit(submit)} className="form">
        <div className="step-div">
          <Label color="#33277B">Set your payout order</Label>
          <Select
            placeholder="Payout Order"
            // name="frequency"
            fullWidth
            properties={{
              ...register("payoutOrder", {
                required: "This field is required.",
                onChange: (e: ChangeEvent<HTMLInputElement>) => updForm(e),
              }),
            }}
            options={
              payoutOrderAvailable.length > 0
                ? payoutOrderList(payoutOrderAvailable)
                : []
            }
            // onChange={(e: HTMLInputElement) => updForm(e)}
            required
          />
          {errors.payoutOrder && (
            <p className="text-danger">{errors.payoutOrder.message}</p>
          )}
        </div>

        <div className="ft">
          <Button
            style={{ marginRight: "1rem", minWidth: "150px", fontSize: "16px" }}
            type="submit"
          >
            {isLoading ? <LoadingButton /> : "Join Group"}
          </Button>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  //   justify-content: center;
  //   width: 80%;
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

  .card-main {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  //   .step-div {
  //     display: flex;
  //     flex-direction: column;
  //     justify-content: space-between;
  //     margin-bottom: 4rem;
  //   }

  .ft {
    margin-top: 2rem;
    margin-left: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export default SetPayoutOrder;
