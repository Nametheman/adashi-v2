import { message } from "antd";
import React, { useState } from "react";
// import { useForm } from "react-hook-form";
import styled from "styled-components";

import { ReactComponent as CloseIcon } from "../assets/icons/close-icon.svg";
import { useCreatePinMutation } from "../redux/services/auth-services";

import Button from "./bits/Button";
import IconPasswordInput from "./bits/InputPassword";
import LoadingButton from "./bits/LoadingButton";
import { Label } from "./bits/Text";

interface CreatePinProps {
  closeModal: Function;
}

interface PinDataProps {
  pin: number;
  pin2: number;
}

const CreatePin = ({ closeModal }: CreatePinProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [createPin] = useCreatePinMutation();
  const [pinData, setPinData] = useState<PinDataProps>({
    pin: 0,
    pin2: 0,
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
    if (pinData.pin !== pinData.pin2) {
      message.error("Pins do not match!");
      setIsLoading(false);
    } else {
      try {
        setIsLoading(true);
        const res: any = await createPin({
          pin: pinData.pin,
          confirm_pin: pinData.pin2,
        });
        if (res.error) {
          message.error(res.error.data.message);
          setIsLoading(false);
        } else if (res.data.status === "success") {
          message.success(res.data?.message);
          setIsLoading(false);
          closeModal();
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
          <b>Create Pin</b>
        </h5>
        <CloseIcon onClick={() => closeModal()} style={{ cursor: "pointer" }} />
      </div>

      <form onSubmit={submitHandler} className="form">
        <div className="mb-2">
          <Label color="#33277B">Kindly create your 4-digit pin</Label>
          <IconPasswordInput
            name="pin"
            onChange={handlePinDataChange}
            minLength={4}
            maxLength={4}
            placeholder="Enter your pin"
            required
            onKeyPress={handleRefInput}
            onPaste={(e: any) => {
              e.preventDefault();
              return false;
            }}
          />
          <p className="mt-2" style={{ color: "#ff4242" }}>
            Pin must be 4 digits and contain only numbers.
          </p>
        </div>

        <div className="mb-2">
          <Label color="#33277B">Confirm pin</Label>
          <IconPasswordInput
            name="pin2"
            onChange={handlePinDataChange}
            minLength={4}
            maxLength={4}
            placeholder="Enter your pin"
            className="mb-3"
            required
            onKeyPress={handleRefInput}
            onPaste={(e: any) => {
              e.preventDefault();
              return false;
            }}
          />
        </div>

        <div className="sec-btn">
          <Button type="submit" fontSize="16px" style={{ minWidth: "100px" }}>
            {isLoading ? <LoadingButton /> : "Create Pin"}
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

  .sec-btn {
    margin-left: auto;
    margin-bottom: 1rem;
  }
`;

export default CreatePin;
