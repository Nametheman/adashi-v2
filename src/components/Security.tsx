import React, { useState } from "react";
import styled from "styled-components";

import { useGetUserProfileQuery } from "../redux/services/auth-services";

import AddBank from "./AddBank";
import BanksAndCards from "./BanksAndCards";
import ChangePassword from "./ChangePassword";
import ChangePin from "./ChangePin";
import MyBanks from "./MyBanks";
import MyCards from "./MyCards";
import Button from "./bits/Button";
import ModalA from "./bits/ModalA";

const Security = () => {
  const [currentModal, setCurrentModal] = useState(0);
  const { data, isLoading }: any = useGetUserProfileQuery();

  return (
    <>
      <Security.Wrapper>
        <div className="form-container col-md-10 mx-auto sec-body">
          <div className="sec-row">
            <p className="p-2">Bank Verification Number (BVN)</p>
            <p className="p-2">{isLoading ? "Loading..." : data?.bvn}</p>
          </div>
          <hr className="line" />
          <div className="sec-row">
            <div className="p-2 col-8 mb-0">
              <p className="mb-0">Two-factor Authentication</p>
              <p style={{ fontSize: 14, marginTop: 0, color: "#b8b8b8" }}>
                Protect your account from unauthorised transactions using a
                software token.
              </p>
            </div>
            <label className="switch col-4">
              <input type="checkbox" style={{ opacity: "0" }} />
              <span className="slider" />
            </label>
          </div>
          <hr className="line" />
          <div className="sec-row">
            <div className="p-2 col-6">
              <p style={{ marginBottom: 0 }}>Update Banks & Cards</p>
              <p style={{ fontSize: 14, marginTop: 0, color: "#b8b8b8" }}>
                Add bank to add BVN
              </p>
            </div>
            <div className="col-6 col-lg-4">
              <Button fontSize="16px" block onClick={() => setCurrentModal(3)}>
                Update Banks & Cards
              </Button>
            </div>
          </div>
          <div className="sec-row">
            <div className="p-2 col-6">
              <p>Change Password</p>
              {/* <p>Change your password to a new one</p> */}
            </div>
            <div className="col-6 col-lg-4">
              <Button fontSize="16px" block onClick={() => setCurrentModal(1)}>
                Change Password
              </Button>
            </div>
          </div>
          <div className="sec-row">
            <div className="p-2 col-6">
              <p>Change Withdrawal Pin</p>
              {/* <p>Change or reset pin</p> */}
            </div>
            <div className="col-6 col-lg-4">
              <Button fontSize="16px" block onClick={() => setCurrentModal(2)}>
                Change Pin
              </Button>
            </div>
          </div>
        </div>
      </Security.Wrapper>
      <div>
        {currentModal === 1 && (
          <ModalA isShown={true} hide={() => {}}>
            <ChangePassword func={setCurrentModal} />
          </ModalA>
        )}
        {currentModal === 2 && (
          <ModalA isShown={true} hide={() => {}}>
            <ChangePin func={setCurrentModal} />
          </ModalA>
        )}
        {currentModal === 3 && (
          <ModalA isShown={true} hide={() => {}}>
            <BanksAndCards func={setCurrentModal} />
          </ModalA>
        )}
        {currentModal === 4 && (
          <ModalA isShown={true} hide={() => {}}>
            <MyCards func={setCurrentModal} />
          </ModalA>
        )}
        {currentModal === 5 && (
          <ModalA isShown={true} hide={() => {}}>
            <MyBanks func={setCurrentModal} />
          </ModalA>
        )}
        {currentModal === 6 && (
          <ModalA isShown={true} hide={() => {}}>
            <AddBank func={setCurrentModal} />
          </ModalA>
        )}
      </div>
    </>
  );
};

Security.Wrapper = styled.div`
  .sec-body {
    border: 1px solid rgba(0, 0, 0, 0.4);
    box-sizing: border-box;
    border-radius: 20px;
    padding: 0.5rem 2rem;

    .line {
      border: 1px solid rgba(0, 0, 0, 0.4);
      margin-right: 2rem;
    }

    .sec-row {
      margin-bottom: 1rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      div:nth-of-type(2) {
        display: flex;
        flex-direction: row;
        justify-content: end;
      }
      // .sec-btn {
      //   // min-width: 210px;
      //   // font-size: 16px;
      // }
      .subtitle {
        font-size: 14;
        margin-top: 0;
        color: "#b8b8b8";
      }
    }

    .p-2 {
      margin: 0rem;
    }

    /* The switch - the box around the slider */
    .switch {
      position: relative;
      display: inline-block;
      width: 60px;
      height: 34px;

      /* Hide default HTML checkbox */
      .switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      /* The slider */
      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: 0.4s;
        transition: 0.4s;
        border-radius: 34px;
      }

      .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: 0.4s;
        transition: 0.4s;
        border-radius: 50%;
      }

      input:checked + .slider {
        background-color: #059157;
      }

      input:focus + .slider {
        box-shadow: 0 0 1px #059157;
      }

      input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
      }
    }
  }
`;
export default Security;
