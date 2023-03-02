import { useEffect, useState } from "react";
import styled from "styled-components";

// import React from "react";
import { ReactComponent as CloseIcon } from "../assets/icons/close-icon.svg";
import { useGetBankDataQuery } from "../redux/services/transaction-service";

import Bank from "./Bank";
import DeleteBank from "./DeleteBank";
import Button from "./bits/Button";
import CardCarousel from "./bits/CardCarousel";
import ModalA from "./bits/ModalA";
import NoData from "./bits/NoData";

const MyBanks = ({ func }: any) => {
  const { data, refetch }: any = useGetBankDataQuery();
  const [completed, setCompleted] = useState<boolean>(false);
  const [delBank, setDelBank] = useState<boolean>(false);
  const [tempBankId, setTempBankId] = useState<string>("");

  useEffect(() => {
    refetch();
    setCompleted(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (completed) {
      refetch();
      setCompleted(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completed]);

  return (
    <>
      <Wrapper>
        <div className="header">
          <h5 style={{ color: "#33277b" }}>
            <b>My Banks</b>
          </h5>
          <CloseIcon
            onClick={() => func(0)}
            style={{ cursor: "pointer", marginInlineStart: "1rem" }}
          />
        </div>
        {data?.data.length > 0 && (
          <p>
            <b>Tap bank to delete</b>
          </p>
        )}
        <div className="card-body">
          {data?.data.length > 0 ? (
            <CardCarousel sliderColour="#059157">
              {data?.data?.map((item: any, itemId: number) => (
                <Bank
                  key={itemId}
                  bankName={item.bank_name}
                  bankId={item.id}
                  acctNo={item.account_number}
                  setTempBankId={setTempBankId}
                  setDelBank={setDelBank}
                />
              ))}
            </CardCarousel>
          ) : (
            <NoData text="You have no saved banks. Add one by clicking the button below." />
          )}
        </div>
        <div className="btn">
          <Button onClick={() => func(6)}>Add new bank</Button>
        </div>
      </Wrapper>
      <ModalA isShown={delBank} hide={() => {}}>
        <DeleteBank
          closeModal={() => setDelBank(false)}
          delBankId={tempBankId}
          setCompleted={setCompleted}
        />
      </ModalA>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 4rem;
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
    margin-bottom: 2rem;
  }

  .card-body {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .btnA {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
`;

export default MyBanks;
