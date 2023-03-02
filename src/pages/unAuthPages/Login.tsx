import { message } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";

import LoginTemplate from "../../components/LoginTemplate";
import Button from "../../components/bits/Button";
import IconPasswordInput from "../../components/bits/InputPassword";
import Input from "../../components/bits/InputText";
import LoadingButton from "../../components/bits/LoadingButton";
import { Heading3, Label, Paragraph } from "../../components/bits/Text";
import { decodeToken } from "../../helpers/authHelper";
// import { getParamsNoRedirect } from "../../helpers/otherHelpers";
import {
  LoginRequest,
  useLoginUserMutation,
} from "../../redux/services/auth-services";
import { user } from "../../utils/routes";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginUser] = useLoginUserMutation();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<LoginRequest>();

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     navigate(user);
  //   }
  // }, [navigate]);
  // const LANDING_URL = process.env.REACT_APP_FRONTEND_URL;

  const submit = async (data: LoginRequest): Promise<void> => {
    setIsLoading(true);
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect");
    // console.log(redirect, "redirect val");
    // const goTo = getParamsNoRedirect(window.location);
    // console.log(goTo, "no-redirect val");
    try {
      const authResponse = await loginUser(data).unwrap();
      if (authResponse.status === "success") {
        decodeToken(authResponse);
        setIsLoading(false);
        reset();
        // this will redirect the url to the old page
        // and also include whatever search queries that were passes
        // window.location.pathname = redirect ? encodeURI(redirect) : user;
        // window.location = LANDING_URL + getParamsNoRedirect(window.location);
        navigate(redirect ? redirect : user);
      }
    } catch (error: any) {
      message.error(error?.data?.message);
      setIsLoading(false);
    }
  };

  const LoginShow = () => {
    return (
      <LoginTemplate>
        <Heading3 className="text-center">Welcome back</Heading3>
        <Paragraph color="#C4C4C4" className="text-center">
          Sign in into your account
        </Paragraph>
        <form className="form" onSubmit={handleSubmit(submit)}>
          <div>
            <Label>Email Address</Label>
            <Input
              type="email"
              properties={{
                ...register("email", {
                  required: true,
                }),
              }}
              placeholder="Enter Email Address"
            />
          </div>
          <div>{errors?.email?.message}</div>
          <div className="mt-4">
            <Label>Password</Label>
            <IconPasswordInput
              placeholder="********"
              properties={{
                ...register("password", {
                  required: true,
                }),
              }}
            />
          </div>
          <Link className="forgot-link" to="/forgot-password">
            Forgot password?
          </Link>
          <Button block>{isLoading ? <LoadingButton /> : "Login"}</Button>
          <Link className="forgot-link" to="/signup">
            <span>Don’t have an account yet? </span>Sign Up
          </Link>
        </form>
      </LoginTemplate>
    );
  };

  return !localStorage.getItem("token") ? (
    <LoginShow />
  ) : (
    <Navigate to={user} replace={true} />
  );
}

export default Login;
