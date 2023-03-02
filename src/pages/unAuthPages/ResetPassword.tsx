import { message } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";

import LoginTemplate from "../../components/LoginTemplate";
import Button from "../../components/bits/Button";
import IconPasswordInput from "../../components/bits/InputPassword";
import Input from "../../components/bits/InputText";
import LoadingButton from "../../components/bits/LoadingButton";
import { Heading3, Label, Paragraph } from "../../components/bits/Text";
import { useResetPasswordMutation } from "../../redux/services/auth-services";
import { user } from "../../utils/routes";

function ResetPassword() {
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     navigate(user);
  //   }
  // }, [navigate]);

  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const [resetPassword] = useResetPasswordMutation();

  const params = new URLSearchParams(window.location.search);
  const tokenA: string | null = params.get("token");
  const emailA: string | null = params.get("email");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submit = async (data: any): Promise<void> => {
    setIsLoading(true);
    if (data.password !== data.password2) {
      message.error("Passwords do not match!");
      setIsLoading(false);
    } else {
      try {
        setIsLoading(true);
        const res = await resetPassword({
          email: emailA ? emailA : "",
          token: tokenA ? tokenA : "",
          password: data.password2,
        }).unwrap();
        if (res.status === "success") {
          message.success(res.message);
          setIsLoading(false);
          reset();
          navigate("/login");
        }
      } catch (error: any) {
        message.error(error?.data?.message);
        setIsLoading(false);
        reset();
      }
    }
  };

  if (localStorage.getItem("token")) {
    return <Navigate to={user} replace={true} />;
  }

  return (
    <LoginTemplate>
      <Heading3 className="text-center align-items-between">
        Reset Password
      </Heading3>
      <Paragraph color="#C4C4C4" className="text-center">
        Recover your password
      </Paragraph>
      <form onSubmit={handleSubmit(submit)} className="form">
        <div className="field">
          <Label>Email Address</Label>
          <Input
            type="email"
            placeholder="Boluwatifejoy@gmail.com"
            // required
            value={emailA ? emailA : ""}
            properties={{
              ...register("email", {
                disabled: true,
              }),
            }}
          />
        </div>

        <div className="field">
          <Label>Password</Label>
          <IconPasswordInput
            placeholder="********"
            properties={{
              ...register("password", {
                required: true,
                pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{8,}/,
              }),
            }}
          />
          <p className="text-left text-danger">
            {errors?.password &&
              "Password must contain alphabets, numbers and must be greater than 8 characters."}
          </p>
        </div>

        <div className="field">
          <Label>Confirm Password</Label>
          <IconPasswordInput
            placeholder="********"
            properties={{
              ...register("password2", {
                required: true,
                pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{8,}/,
              }),
            }}
          />
          <p className="text-left text-danger">
            {errors?.password2 &&
              "Password must contain alphabets, numbers and must be greater than 8 characters."}
          </p>
        </div>

        <Button block className="mt-4">
          {isLoading ? <LoadingButton /> : "Recover"}
        </Button>
      </form>
    </LoginTemplate>
  );
}

export default ResetPassword;
