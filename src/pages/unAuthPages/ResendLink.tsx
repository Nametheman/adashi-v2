import { message } from "antd";
import { ChangeEvent, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import LoginTemplate from "../../components/LoginTemplate";
import Button from "../../components/bits/Button";
import Input from "../../components/bits/InputText";
import LoadingButton from "../../components/bits/LoadingButton";
import { Heading3, Label, Paragraph } from "../../components/bits/Text";
import { frontend_url } from "../../helpers/authHelper";
import { useResendLinkMutation } from "../../redux/services/auth-services";
import { user } from "../../utils/routes";

function ResendLink() {
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     navigate(user);
  //   }
  // }, [navigate]);

  const [resendLink] = useResendLinkMutation();

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

  const submitHandler = async (e: any): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await resendLink(formData).unwrap();
      if (res.status === "success") {
        message.success(res.message);
        setIsLoading(false);
      }
    } catch (error: any) {
      message.error(error?.data?.message);
      setIsLoading(false);
    }
  };

  if (localStorage.getItem("token")) {
    return <Navigate to={user} replace={true} />;
  }

  return (
    <LoginTemplate>
      <Heading3 className="text-center">Resend Verification Mail</Heading3>
      <Paragraph color="#C4C4C4" className="text-center">
        Click to resend a verification mail
      </Paragraph>
      <form onSubmit={(e: any) => submitHandler(e)} className="form">
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
        <Button block className="mt-3">
          {isLoading ? <LoadingButton /> : "Resend"}
        </Button>
        <Link className="forgot-link" to="/login">
          <span>Have an account? </span>Login Here
        </Link>
      </form>
    </LoginTemplate>
  );
}

export default ResendLink;
