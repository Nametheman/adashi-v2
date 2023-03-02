import { message } from "antd";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import LoginTemplate from "../../components/LoginTemplate";
import Button from "../../components/bits/Button";
import Input from "../../components/bits/InputText";
import LoadingButton from "../../components/bits/LoadingButton";
import { Heading3, Label, Paragraph } from "../../components/bits/Text";
import { frontend_url } from "../../helpers/authHelper";
import { useForgotPasswordMutation } from "../../redux/services/auth-services";
import { user } from "../../utils/routes";

function ForgotPassword() {
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const [forgotPassword] = useForgotPasswordMutation();

  const [formData, setFormData] = useState({
    email: "",
    callback_url: frontend_url ? `${frontend_url}/reset-password` : "",
    type: "",
  });

  const handleFormDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitHandler = async (e: SyntheticEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await forgotPassword(formData).unwrap();
      if (res.status === "success") {
        message.success(res.message);
        setIsLoading(false);
      }
    } catch (error: any) {
      message.error(error?.data?.message);
      setIsLoading(false);
    }
  };

  return !localStorage.getItem("token") ? (
    <LoginTemplate>
      <Heading3 className="text-center align-items-between">
        Forgot Password
      </Heading3>
      {/* <Heading3 className="text-center">Forgot Password</Heading3> */}
      <Paragraph color="#C4C4C4" className="text-center">
        Recover your password
      </Paragraph>
      <form onSubmit={submitHandler} className="form">
        <div>
          <Label>Email Address</Label>
          <Input
            type="email"
            placeholder="Boluwatifejoy@gmail.com"
            name="email"
            onChange={handleFormDataChange}
            required
          />
        </div>
        <Link className="forgot-link" to="/login">
          Back to Login
        </Link>
        <Button type="submit" block>
          {isLoading ? <LoadingButton /> : "Recover"}
        </Button>
      </form>
    </LoginTemplate>
  ) : (
    <Navigate to={user} replace={true} />
  );
}

export default ForgotPassword;
