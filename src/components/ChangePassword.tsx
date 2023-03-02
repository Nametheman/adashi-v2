import { message } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import { ReactComponent as CloseIcon } from "../assets/icons/close-icon.svg";
import { useChangePasswordMutation } from "../redux/services/auth-services";

import Button from "./bits/Button";
import IconPasswordInput from "./bits/InputPassword";
import LoadingButton from "./bits/LoadingButton";
import { Label } from "./bits/Text";

const ChangePassword = ({ func }: any) => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [changePassword] = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submit = async (data: any): Promise<void> => {
    setIsLoading(true);
    if (data.newPassword !== data.confirmNewPassword) {
      message.error("Passwords do not match!");
      setIsLoading(false);
    } else {
      try {
        setIsLoading(true);
        const res: any = await changePassword({
          old_password: data.oldPassword,
          new_password: data.newPassword,
          new_password_confirmation: data.confirmNewPassword,
        });
        if (res.data.status === "success") {
          message.success(res.data.message);
          setIsLoading(false);
          reset();
          func(0);
        } else {
          message.error(res.data.message);
          setIsLoading(false);
          reset();
        }
      } catch (error: any) {
        // console.log(error, "erRes");
        // console.log(error.data);
        message.error(error?.data?.message);
        setIsLoading(false);
        // reset();
        // This is not working
      }
    }
  };
  return (
    <Wrapper>
      <div className="header">
        <h5 style={{ color: "#33277b" }}>
          <b>Change Password</b>
        </h5>
        <CloseIcon
          onClick={() => func(0)}
          style={{ cursor: "pointer", marginInlineStart: "1rem" }}
        />
      </div>

      <form onSubmit={handleSubmit(submit)} className="form">
        <div className="mb-2">
          <Label color="#33277B">Old Password</Label>
          <IconPasswordInput
            placeholder="********"
            properties={{
              ...register("oldPassword", {
                required: true,
              }),
            }}
            // onChange={(e: HTMLInputElement) => func2(e)}
          />
        </div>
        <div className="mb-2">
          <Label color="#33277B">New Password</Label>
          <IconPasswordInput
            placeholder="********"
            properties={{
              ...register("newPassword", {
                required: true,
                pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{8,}/,
              }),
            }}
          />
          <p className="text-left text-danger">
            {errors?.newPassword?.type === "pattern" &&
              "Password must contain alphabets, numbers and must be greater than 8 characters."}
          </p>
        </div>
        <div className="mb-2">
          <Label color="#33277B">Confirm New Password</Label>
          <IconPasswordInput
            placeholder="********"
            properties={{
              ...register("confirmNewPassword", {
                required: true,
                pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{8,}/,
              }),
            }}
          />
        </div>
        <p className="text-left text-danger">
          {errors?.newPassword?.type === "pattern" &&
            "Password must contain alphabets, numbers and must be greater than 8 characters."}
        </p>

        <div className="col-md-8 mx-auto">
          <Button type="submit" block fontSize="16px">
            {isLoading ? <LoadingButton /> : "Change Password"}
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

  // .sec-btn {
  //   margin-left: auto;
  //   margin-right: auto;
  //   margin-bottom: 1rem;
  // }
`;

export default ChangePassword;
