import { message } from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { ReactComponent as BackIcon } from "../../assets/icons/back.svg";
import { ReactComponent as RollingLoader } from "../../assets/icons/rolling.svg";
import { getQueryStringParams } from "../../helpers/otherHelpers";
import { useVerifyTransactionMutation } from "../../redux/services/transaction-service";
// import { Notification, Spinner } from "../../../components/common";
// import { primaryColor, topUpCheck, USERACCESSCONTROL } from "../../utils/data";
// import { axiosFunc } from "../../utils/helper";

const VerifyPayment = (props: any) => {
  // const [loading, setLoading] = useState(true);
  // const params = new URLSearchParams(window.location.search);
  // let userId = params.get("user_id");
  // let groupId = params.get("group_id");
  // let ref = params.get("reference");
  // console.log(userId, groupId, ref);
  // const urls = getAllParams(window.location);
  // console.log(urls);
  const userId = getQueryStringParams(window.location.search).user_id;
  const groupId = getQueryStringParams(window.location.search).group_id;
  const ref = getQueryStringParams(window.location.search).reference;

  // console.log(userId, "user_id");
  // console.log(groupId, "group_id");
  // console.log(ref, "reference");

  // const { data, error, isLoading } = useVerifyTransactionQuery(id);
  const [verifyTransaction] = useVerifyTransactionMutation();

  const navigate = useNavigate();

  useEffect(() => {
    const verifyTrans = async (): Promise<void> => {
      if (userId !== null && groupId !== null && ref !== null) {
        try {
          const res: any = await verifyTransaction({
            user_id: userId,
            group_id: groupId,
            reference: ref,
          });
          if (res?.data?.status === "success") {
            message.success(res.data.message);
          } else if (res.error) {
            message.error(res.error?.data?.message);
          } else {
            message.error(res.data.message);
          }
          navigate("/user");
        } catch (error: any) {
          message.error(error?.data?.message);
          navigate("/user");
        }
      } else {
        message.error("The user ID or reference is null.");
      }
    };

    verifyTrans();
  }, [groupId, navigate, ref, userId, verifyTransaction]);

  return (
    <Wrapper>
      <div className="container">
        <h2 style={{ fontWeight: "600", color: "#33277b" }}>Verify Payment</h2>
        <hr className="line" />
        <Link to={`..`} style={{ textDecoration: "none" }} className="back">
          <BackIcon />
          <p>Back</p>
        </Link>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "30vh",
            }}
          >
            <RollingLoader
              style={{
                height: "250px",
                width: "250px",
              }}
            />
          </div>
          <h5>We are verifying your payment, please wait a minute.</h5>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .container {
    padding: 2rem;
    color: #33277b;

    .line {
      border: 1px solid rgba(0, 0, 0, 0.4);
    }

    .back {
      display: flex;
      color: #33277b;
      // font-size: 16px;
      align-items: center;
      p {
        margin: 0 0 0 1rem;
      }
      margin: 1rem 0;
    }

    @media screen and (max-width: 500px) {
      padding: 1rem;
    }
  }
`;

export default VerifyPayment;
