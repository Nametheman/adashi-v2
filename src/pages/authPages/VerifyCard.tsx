import { message } from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { ReactComponent as BackIcon } from "../../assets/icons/back.svg";
import { ReactComponent as RollingLoader } from "../../assets/icons/rolling.svg";
// import { getQueryStringParams } from "../../helpers/otherHelpers";
import { useAddCardMutation } from "../../redux/services/transaction-service";

const VerifyPayment = (props: any) => {
  // const ref = getQueryStringParams(window.location.search).ref;
  // const reference = getQueryStringParams(window.location.search).reference;
  // verify-card?ref=CV-20220629165654306571249&trxref=91e9pmm172&reference=91e9pmm172
  const params = new URLSearchParams(window.location.search);
  let ref = params.get("ref");
  let reference = params.get("reference");
  const [addCard] = useAddCardMutation();
  // console.log(ref, "ref");
  // console.log(reference, "reference");

  const navigate = useNavigate();

  useEffect(() => {
    const verifyCardTrans = async (): Promise<void> => {
      if (ref !== null && reference !== null) {
        try {
          const res: any = await addCard({
            reference: reference,
            ref: ref,
            channel: "paystack",
          });
          if (res?.data?.status === "success") {
            message.success(res.data.message);
          } else if (res.error) {
            message.error(res.error?.data?.message);
          } else {
            message.error(res.data.message);
          }
        } catch (error: any) {
          message.error(error?.data?.message);
        }
      } else {
        message.error("The reference is null.");
      }
      setTimeout(() => {
        navigate("/user");
      }, 2000);
    };

    verifyCardTrans();
  }, [addCard, navigate, ref, reference]);

  return (
    <Wrapper>
      <div className="container">
        <h2 style={{ fontWeight: "600", color: "#33277b" }}>Verify Card</h2>
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
          <h5>We are verifying your card details, please wait a minute.</h5>
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
