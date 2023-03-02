import { message } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";

import SignupTemplate from "../../components/SignupTemplate";
import Button from "../../components/bits/Button";
import IconPasswordInput from "../../components/bits/InputPassword";
import Input from "../../components/bits/InputText";
import LoadingButton from "../../components/bits/LoadingButton";
import ModalA from "../../components/bits/ModalA";
import {
  Heading3,
  Label,
  Paragraph,
  MyParagraph,
} from "../../components/bits/Text";
import GeneralNotif from "../../components/modals/GeneralNotif";
import { frontend_url } from "../../helpers/authHelper";
import { useRegisterUserMutation } from "../../redux/services/auth-services";
import { user } from "../../utils/routes";

const Signup = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [registerUser] = useRegisterUserMutation();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
    trigger,
    watch,
  } = useForm();

  const submit = async (data: any): Promise<void> => {
    if (data.password !== data.password2) {
      message.error("Passwords do not match!");
      setIsLoading(false);
    } else {
      try {
        setIsLoading(true);
        const authResponse = await registerUser({
          name: data.name,
          lname: data.lastName,
          email: data.email,
          phone: data.phone,
          password: data.password,
          phone_country: "NG",
          callback_url: `${frontend_url}/verify`,
        }).unwrap();
        if (authResponse.status === "success") {
          setIsLoading(false);
          setOpenModal(true);
          // message.success("A verification link has been sent to your mail.");
          // // reset();
          // navigate("../login", {
          //   replace: true,
          // });
        }
      } catch (error: any) {
        message.error(error?.data?.message);
        setIsLoading(false);
        // reset();
      }
    }
  };

  const SignupShow = () => {
    return (
      <>
        <SignupTemplate>
          <form onSubmit={handleSubmit(submit)} className="form">
            <Heading3 className="field-top">Create Your Account</Heading3>
            <MyParagraph fontSize="12px" color="#C4C4C4">
              Hey there, let's help you set up your profile
            </MyParagraph>
            <div className="row">
              <div className="col-md-6">
                <Label>First Name</Label>
                <Input
                  type="text"
                  placeholder="Boluwatife"
                  properties={{
                    ...register("name", {
                      required: "The first name field is required.",
                    }),
                  }}
                  // onKeyUp={() => {
                  //   trigger("name", { shouldFocus: true });
                  // }}
                />
              </div>

              <div className="col-md-6 field-a">
                <Label>Last Name</Label>
                <Input
                  type="text"
                  placeholder="Joy"
                  properties={{
                    ...register("lastName", {
                      required: "The last name field is required.",
                    }),
                  }}
                  // onKeyUp={() => {
                  //   trigger("lastName", { shouldFocus: true });
                  // }}
                />
              </div>
              {errors?.name ? (
                <p role="alert" className="text-left text-danger mt-2 mb-0">
                  {errors.name?.message}
                </p>
              ) : (
                <p role="alert" className="text-left text-danger mt-2 mb-0">
                  {errors?.lastName?.message}
                </p>
              )}
            </div>

            <div className="field">
              <Label>Phone Number</Label>
              <Input
                type="tel"
                placeholder="+234xxx-xxx-xxxx"
                properties={{
                  ...register("phone", {
                    required: "Phone is required.",
                    minLength: 11,
                  }),
                }}
                // onKeyUp={() => {
                //   trigger("phone");
                // }}
                required
              />
              {errors?.phone?.type === "minLength" ? (
                <p className="text-left text-danger mt-2 mb-0">
                  Phone number must not be less than 11 digits.
                </p>
              ) : (
                <p className="text-left text-danger mt-2 mb-0">
                  {errors?.phone?.message}
                </p>
              )}
            </div>

            <div className="field">
              <Label>Email Address</Label>
              <Input
                type="email"
                autoComplete={"email"}
                placeholder="Boluwatifejoy@gmail.com"
                properties={{
                  ...register("email", {
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  }),
                }}
                // onKeyUp={() => {
                //   trigger("email", { shouldFocus: true });
                // }}
              />
              {errors?.email?.type === "pattern" ? (
                <p role="alert" className="text-left text-danger mt-2 mb-0">
                  Invalid email address
                </p>
              ) : (
                <p role="alert" className="text-left text-danger mt-2 mb-0">
                  {errors?.email?.message}
                </p>
              )}
            </div>

            <div className="field">
              <Label>Password</Label>
              <IconPasswordInput
                placeholder="********"
                autoComplete={"new-password"}
                // pattern="(?=.*\d)(?=.*[a-zA-Z]).{8,}"
                properties={{
                  ...register("password", {
                    required: true,
                    pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{8,}/,
                  }),
                }}
                // onPaste={(e: any) => {
                //   e.preventDefault();
                //   return false;
                // }}
                onKeyUp={() => {
                  trigger("password", { shouldFocus: true });
                }}
              />
              {errors?.password?.type === "pattern" ||
              errors?.password?.type === "pattern" ? (
                <p role="alert" className="text-left text-danger mt-2 mb-0">
                  Password must be alphanumeric and greater than 8 characters.
                </p>
              ) : errors?.password ? (
                <p role="alert" className="text-left text-danger mt-2 mb-0">
                  {errors?.password?.message}
                </p>
              ) : (
                <p role="alert" className="text-left text-danger mt-2 mb-0">
                  {errors?.password2?.message}
                </p>
              )}
            </div>
            <div className="field">
              <Label>Confirm Password</Label>
              <IconPasswordInput
                placeholder="********"
                autoComplete={"new-password"}
                properties={{
                  ...register("password2", {
                    required: true,
                    pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{8,}/,
                    // pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{8,}/,
                    validate: (value) =>
                      value === watch("password", "") ||
                      "The passwords do not match",
                  }),
                }}
                // onPaste={(e: any) => {
                //   e.preventDefault();
                //   return false;
                // }}
                onKeyUp={() => {
                  trigger("password2", { shouldFocus: true });
                }}
              />
            </div>

            <Button block className="mt-2">
              {isLoading ? <LoadingButton /> : "Create Account"}
            </Button>
            <Link className="forgot-link" to="/login">
              <span>Have an account? </span>Login Here
            </Link>
          </form>
        </SignupTemplate>
        {openModal === true && (
          <ModalA isShown={true} hide={() => {}}>
            <GeneralNotif
              notifTitle="Verify your Account"
              notifText={
                <p>
                  A verification link has been sent to your email address.
                  Please check your inbox
                </p>
              }
              onConfirm={() => {
                navigate("../login");
              }}
              confirmText={"Ok"}
            />
          </ModalA>
        )}
      </>
    );
  };

  return !localStorage.getItem("token") ? (
    <SignupShow />
  ) : (
    <Navigate to={user} replace={true} />
  );
};

export default Signup;
