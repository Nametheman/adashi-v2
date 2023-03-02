import { message } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import { ReactComponent as CloseIcon } from "../assets/icons/close-icon.svg";
import { useGetUserProfileQuery } from "../redux/services/auth-services";
import {
  useAddBankMutation,
  useGetBankListQuery,
  useResolveBankQuery,
} from "../redux/services/transaction-service";

import Button from "./bits/Button";
import Input from "./bits/InputText";
import LoadingButton from "./bits/LoadingButton";
import Select from "./bits/Select";
import { Label } from "./bits/Text";

type AddBankTypes = {
  func: Function;
  num?: number;
};

type BankDataTypes = {
  acctNo: string;
  bankCode: string;
  bvn?: string;
  status?: string;
};

const AddBank = ({ func, num }: AddBankTypes) => {
  const [isLoading, setIsLoading] = useState(false);
  const [bankData, setBankData] = useState<BankDataTypes>({
    acctNo: "",
    bankCode: "",
    status: "",
  });
  const { data } = useGetBankListQuery();
  const { data: userData1 }: any = useGetUserProfileQuery();
  const [addBank] = useAddBankMutation();

  const { data: resolveBankData, refetch: resolveBankDataRefetch }: any =
    useResolveBankQuery({
      account_number: bankData.acctNo.length >= 10 ? bankData.acctNo : "",
      bank_code: bankData.bankCode.length >= 3 ? bankData.bankCode : "",
    });

  const [bvnVer, setBvnVer] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleBankDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBankData({
      ...bankData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (bankData.acctNo.length === 10 && bankData.bankCode.length === 3) {
      resolveBankDataRefetch();
    }
  }, [bankData, resolveBankDataRefetch]);

  // let bvnVer: any = 0;
  // bvnVer = userData?.user_profile?.bvn_verified;
  useEffect(() => {
    setBvnVer(userData1?.user_profile?.bvn_verified);
  }, [userData1]);

  const bankList = (data: any) => {
    let arr: any = [];
    data?.forEach((bank: any) => {
      arr.push({
        name: `${bank.name}`,
        value: `${bank.code}`,
      });
    });
    return arr;
  };

  const submit = async (data: any): Promise<void> => {
    try {
      setIsLoading(true);
      const res: any = await addBank({
        account_number: data.acctNo,
        bank_code: data.bankCode,
        bvn: data.bvn,
      });
      // console.log(res);
      if (res?.data?.status === "success") {
        message.success("Your bank account has been added.");
        setIsLoading(false);
        reset();
        func(num ?? 0);
      } else {
        message.error(res?.error?.data?.message);
        setIsLoading(false);
      }
    } catch (error: any) {
      message.error(error?.data?.message);
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <div className="header">
        <h5 style={{ color: "#33277b" }}>
          <b>Add Bank</b>
        </h5>
        <CloseIcon
          onClick={() => func(0)}
          style={{ cursor: "pointer", marginInlineStart: "1rem" }}
        />
      </div>

      <form onSubmit={handleSubmit(submit)} className="form">
        <div className="field">
          <Label color="#33277B">Account Number</Label>
          <Input
            type="number"
            placeholder="Enter your account number"
            properties={{
              ...register("acctNo", {
                required: true,
                minLength: 10,
                maxLength: 10,
                onChange: (e: ChangeEvent<HTMLInputElement>) =>
                  handleBankDataChange(e),
              }),
            }}
            required
          />
          <p className="text-left text-danger">
            {errors?.acctNo?.type === "minLength" ||
            errors?.acctNo?.type === "maxLength"
              ? "Account number must be 10 digits."
              : errors?.acctNo?.message}
          </p>
        </div>

        {bvnVer !== 1 && (
          <div className="field">
            <Label color="#33277B">Bank Verification Number</Label>
            <Input
              type="number"
              placeholder="Enter your bvn"
              properties={{
                ...register("bvn", {
                  required: true,
                  minLength: 11,
                  maxLength: 11,
                  onChange: (e: ChangeEvent<HTMLInputElement>) =>
                    handleBankDataChange(e),
                }),
              }}
              required
            />
            <p className="text-left text-danger">
              {errors?.bvn?.type === "minLength" ||
              errors?.bvn?.type === "maxLength"
                ? "BVN must be 11 digits."
                : errors?.bvn?.message}
            </p>
          </div>
        )}

        <div className="mb-0">
          <Label color="#33277B">Select Bank</Label>
          <Select
            placeholder="Select Your Bank"
            fullWidth
            options={data ? bankList(data) : []}
            properties={{
              ...register("bankCode", {
                required: true,
                onChange: (e: ChangeEvent<HTMLInputElement>) =>
                  handleBankDataChange(e),
              }),
            }}
            className="mb-0"
          />
        </div>

        {resolveBankData?.data?.account_name && (
          <div className="ft">
            <span className="acct-name">
              {resolveBankData?.data?.account_name}
            </span>
          </div>
        )}

        <Button
          disabled={
            resolveBankData?.status !== "success" ||
            bankData.bankCode.length !== 3
          }
          // disabled={true}
          block
        >
          {isLoading ? <LoadingButton /> : "Add new bank"}
        </Button>
      </form>
    </Wrapper>
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

  .sav-plan {
    padding: 1rem;
    background: rgba(207, 232, 222, 0.2);
    border: 1px solid rgba(0, 0, 0, 0.4);
    box-sizing: border-box;
    border-radius: 10px;
    cursor: pointer;
  }

  .ft {
    margin: 0 auto 1rem 0;
    display: flex;
    flex-direction: row;
    justify-content: start;
  }

  .acct-name {
    text-transform: uppercase;
    // width: auto;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #059157;
    padding: 0.5rem 1rem;
    font-size: 14px;
    list-style: none;
    border-radius: 7px;
    // margin: 0 5px 5px 0;
    background: #e6f4ee;
  }
`;

export default AddBank;
