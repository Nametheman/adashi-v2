import React, { FormEvent } from "react";
import styled from "styled-components";

import { ReactComponent as CloseIcon } from "../assets/icons/close-icon.svg";
import { cardList } from "../helpers/otherHelpers";
import { useGetCardDataQuery } from "../redux/services/transaction-service";

import Button from "./bits/Button";
// import IconPasswordInput from "./bits/InputPassword";
import Input from "./bits/InputText";
import LoadingButton from "./bits/LoadingButton";
import Select from "./bits/Select";
import { Label } from "./bits/Text";

interface TopUpProps {
  closeModal: Function;
  addCardModal?: Function;
  updDets?: Function;
  fromStash?: boolean;
  isLoading?: boolean;
  topUpPlan?: Function;
  setCurrentModal: Function;
  pinData: any;
  handleRef: any;
}

const TopUp = (props: TopUpProps) => {
  const {
    closeModal,
    updDets,
    fromStash,
    isLoading,
    topUpPlan,
    setCurrentModal,
    pinData,
    handleRef,
  } = props;
  const { data }: any = useGetCardDataQuery();

  // const firstRef = useRef<HTMLInputElement>(null);
  // const secondRef = useRef<HTMLInputElement>(null);
  // const thirdRef = useRef<HTMLInputElement>(null);
  // const fourthRef = useRef<HTMLInputElement>(null);

  // const pinData = [
  //   {
  //     name: "first",
  //     ref: firstRef,
  //     next: secondRef,
  //   },
  //   {
  //     name: "second",
  //     ref: secondRef,
  //     next: thirdRef,
  //     prev: firstRef,
  //   },
  //   {
  //     name: "third",
  //     ref: thirdRef,
  //     next: fourthRef,
  //     prev: secondRef,
  //   },
  //   {
  //     name: "fourth",
  //     ref: fourthRef,
  //     prev: thirdRef,
  //   },
  // ];

  // const handleRef = (e: any, next: any, prev: any) => {
  //   const key = e.key;
  //   if (e.target.value.length && next) {
  //     next.current.focus();
  //   }

  //   if ((key === "Backspace" || key === "Delete") && prev) {
  //     prev.current.focus();
  //   }
  // };

  const handleRefInput = (e: any) => {
    const keyVal = e.which || e.keyCode;
    if (keyVal < 48 || keyVal > 57) e.preventDefault();
  };
  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    topUpPlan && topUpPlan();
  };

  let topUpOptions: any = [];

  data
    ? (topUpOptions = fromStash
        ? [
            {
              name: "My Purse",
              value: "stash",
            },
            ...cardList(data),
          ]
        : [...cardList(data)])
    : (topUpOptions = fromStash
        ? [
            {
              name: "My Purse",
              value: "stash",
            },
          ]
        : []);

  return (
    <Wrapper>
      <div className="header">
        <h5 style={{ color: "#33277b" }}>
          <b>Top Up</b>
        </h5>
        <CloseIcon onClick={() => closeModal()} style={{ cursor: "pointer" }} />
      </div>
      <form onSubmit={submitHandler}>
        <div className="mb-2">
          <Label color="#33277B">How much would you like to top up?</Label>
          <Input
            type="number"
            placeholder="Enter your amount"
            name="amount"
            onChange={(e: HTMLInputElement) => updDets && updDets(e)}
            required
            min={1000}
          />
          <p className="mt-2">
            You cannot top up less than <b>&#8358;1000</b>.
          </p>
        </div>
        <div className="mb-2">
          <Label color="#33277B">Payment Option</Label>
          <Select
            placeholder="Payment options"
            name="topUpOpt"
            fullWidth
            options={topUpOptions}
            onChange={(e: HTMLInputElement) => updDets && updDets(e)}
            required
          />
        </div>
        <div className="mb-2">
          <Label color="#33277B">Secure Pin</Label>
          {/* <IconPasswordInput
            placeholder="Enter your pin"
            name="pin"
            onChange={(e: HTMLInputElement) => updDets && updDets(e)}
            required
            onKeyPress={handleRefInput}
            maxLength={4}
            pattern="[0-9]{4}"
          /> */}
          <div className="with-ref">
            {pinData.map((item: any, idx: number) => (
              <Input
                type="password"
                name={item.name}
                key={idx}
                maxLength={1}
                refs={item.ref}
                onKeyUp={(e: any) => handleRef(e, item.next, item.prev)}
                onKeyPress={handleRefInput}
                pattern="[0-9]"
              />
            ))}
          </div>
          <div
            className="my-3"
            style={{ cursor: "pointer" }}
            onClick={() => setCurrentModal(4)}
          >
            Don't have a pin? <b>Create one here</b>
          </div>
        </div>
        <div className="sec-btn">
          <Button type="submit" fontSize="16px" style={{ minWidth: "100px" }}>
            {isLoading ? <LoadingButton /> : "Top Up"}
          </Button>
        </div>
      </form>
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
    font-size: 14px;
    color: #ff4242;
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

  .with-ref {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    // margin: 4rem auto;
    // margin: 0 auto;
    & > div {
      width: 20%;
    }
  }

  .sec-btn {
    margin-left: auto;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;

export default TopUp;
