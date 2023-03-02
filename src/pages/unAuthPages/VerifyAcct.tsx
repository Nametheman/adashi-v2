import { message } from "antd";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import LoginTemplate from "../../components/LoginTemplate";
import Button from "../../components/bits/Button";
import Input from "../../components/bits/InputText";
import { Heading3, Label, Paragraph } from "../../components/bits/Text";
import { useVerifyAccountMutation } from "../../redux/services/auth-services";
import { user } from "../../utils/routes";

function VerifyAcct() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const params = new URLSearchParams(window.location.search);
  const token: string | null = params.get("token");
  const email: string | null = params.get("email");

  const [verifyAccount] = useVerifyAccountMutation();

  const submitHandler = async (): Promise<void> => {
    setIsLoading(true);
    if (email !== null && token !== null) {
      let data = {
        token,
        email,
      };
      try {
        const authResponse = await verifyAccount(data).unwrap();
        if (authResponse.status === "success") {
          setIsLoading(false);
          message.success(authResponse.message);
          navigate("/login", { replace: true });
        }
      } catch (error: any) {
        // console.log(error);
        message.error(error?.data?.message);
        setIsLoading(false);
      }
    } else {
      message.error("The email or token is null.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    submitHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (localStorage.getItem("token")) {
    return <Navigate to={user} replace={true} />;
  }

  return (
    <LoginTemplate>
      <Heading3 className="text-center">Verify Mail</Heading3>
      <Paragraph color="#C4C4C4" className="text-center">
        Verify Your Account
      </Paragraph>
      <form onSubmit={submitHandler} className="form">
        <div>
          <Label>Email Address</Label>
          <Input
            type="email"
            placeholder="Boluwatifejoy@gmail.com"
            value={email}
            disabled
          />
        </div>
        <Link className="forgot-link" to="/resend-link">
          Resend link?
        </Link>
        {/* to check if this immediately submits on click, without an onclick handler */}
        <Button type="submit" block>
          {isLoading ? "Verifying.." : "Verify"}
        </Button>
        <Link className="forgot-link" to="/login">
          <span>Have an account? </span>Login Here
        </Link>
      </form>
    </LoginTemplate>
  );
}

export default VerifyAcct;
