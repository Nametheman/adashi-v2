import { message } from "antd";
import React, { useState } from "react";
import styled from "styled-components";

import { ReactComponent as CloseIcon } from "../assets/icons/close-icon.svg";
import { useResetPinMutation } from "../redux/services/auth-services";

import Button from "./bits/Button";
import IconPasswordInput from "./bits/InputPassword";
import LoadingButton from "./bits/LoadingButton";
import { Label } from "./bits/Text";

interface PinDataProps {
  oldPin: number;
  newPin: number;
  newPin2: number;
}

const ChangePin = ({ func, func2 }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [resetPin] = useResetPinMutation();
  const [pinData, setPinData] = useState<PinDataProps>({
    oldPin: 0,
    newPin: 0,
    newPin2: 0,
  });

  const handlePinDataChange = (e: any) => {
    const { name, value } = e.target;
    setPinData((currData) => {
      return {
        ...currData,
        [name]: value,
      };
    });
  };

  const handleRefInput = (e: any) => {
    const keyVal = e.which || e.keyCode;
    if (keyVal < 48 || keyVal > 57) e.preventDefault();
  };

  const submitHandler = async (e: any): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    if (pinData.newPin !== pinData.newPin2) {
      message.error("Pins do not match!");
      setIsLoading(false);
    } else {
      try {
        setIsLoading(true);
        const res: any = await resetPin({
          old_pin: pinData.oldPin,
          pin: pinData.newPin,
          confirm_pin: pinData.newPin2,
        });
        if (res.error) {
          message.error(res.error.data.message);
          setIsLoading(false);
        } else if (res.data.status === "success") {
          message.success(res.data?.message);
          setIsLoading(false);
          func(0);
        } else {
          message.error(res.data?.message);
          setIsLoading(false);
        }
      } catch (error: any) {
        message.error(error?.data?.message);
        setIsLoading(false);
      }
    }
  };

  return (
    <Wrapper>
      <div className="header">
        <h5 style={{ color: "#33277b" }}>
          <b>Change Your Pin</b>
        </h5>
        <CloseIcon onClick={() => func(0)} style={{ cursor: "pointer" }} />
      </div>
      <form onSubmit={submitHandler} className="form">
        <div className="mb-0">
          <Label color="#33277B">Old Pin</Label>
          <IconPasswordInput
            placeholder="********"
            name="oldPin"
            onChange={handlePinDataChange}
            minLength={4}
            maxLength={4}
            className="mb-0"
            required
            onKeyPress={handleRefInput}
          />
        </div>
        <p className="mt-0" style={{ color: "#ff4242" }}>
          Pin must be 4 digits and contain only numbers.
        </p>
        <div className="mb-2">
          <Label color="#33277B">New Pin</Label>
          <IconPasswordInput
            placeholder="********"
            name="newPin"
            onChange={handlePinDataChange}
            minLength={4}
            maxLength={4}
            className="mb-3"
            required
            onKeyPress={handleRefInput}
          />
        </div>
        <div className="mb-2">
          <Label color="#33277B">Confirm New Pin</Label>
          <IconPasswordInput
            placeholder="********"
            name="newPin2"
            onChange={handlePinDataChange}
            minLength={4}
            maxLength={4}
            className="mb-3"
            required
            onKeyPress={handleRefInput}
          />
        </div>

        <div className="sec-btn">
          <Button type="submit" fontSize="16px">
            {isLoading ? <LoadingButton /> : "Change Pin"}
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
    // // font-size: 16px;
  }

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 1rem;
    margin-bottom: 2rem;
  }

  .sec-btn {
    margin-left: auto;
    margin-bottom: 1rem;
  }
`;

export default ChangePin;
