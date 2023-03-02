import { message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ReactComponent as BackIcon } from '../../assets/icons/back.svg';
import { ReactComponent as NairaIcon } from '../../assets/icons/naira-icon.svg';
import AddBank from '../../components/AddBank';
import ConfirmWithdrawalSubmit from '../../components/ConfirmWithdrawalSubmit';
import CreatePin from '../../components/CreatePin';
import FormSubmit from '../../components/FormSubmit';
import GrpWithdrawal from '../../components/GrpWithdrawal';
import IndWithdrawal from '../../components/IndWithdrawal';
import SuccessWithdrawal from '../../components/SuccessWithdrawal';
import TarGrpWithdrawal from '../../components/TarGrpWithdrawal';
import Warning from '../../components/Warning';
import WithdrawalPlanSelect from '../../components/WithdrawalPlanSelect';
import Button from '../../components/bits/Button';
import Input from '../../components/bits/InputText';
import LoadingButton from '../../components/bits/LoadingButton';
import ModalA from '../../components/bits/ModalA';
import SavingsCarousel from '../../components/bits/SavingsCarousel';
import Select from '../../components/bits/Select';
import { Label } from '../../components/bits/Text';
import {
  useGetBankDataQuery,
  useIndToBankMutation,
  useIndToWalletMutation,
  useIndWithdrawalCommissionMutation,
  useTargetToBankMutation,
  useTargetToWalletMutation,
  useTargetWithdrawalCommissionMutation,
  useWalletToBankMutation,
  useWithdrawCommissionMutation,
} from '../../redux/services/transaction-service';
import { removeWithdrawalPlan } from '../../redux/slices/withdrawal-slice';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import { user } from '../../utils/routes';

export type WithdrawalFormTypes = {
  bankId: string;
  amount: number;
  pin: null | number;
  channel: string;
  planId: string;
  planType: string;
  planName: string;
  mature: boolean;
  balance?: number;
};

export type WithdrawalCommissionTypes = {
  amount: number;
  planId?: string;
  commissionMode: string;
  charges: number;
  totalAmount: number;
  commissionFor: string;
  percentage?: number;
  penalty?: number;
};

const Withdrawal = () => {
  const [currentModal, setCurrentModal] = useState(0);
  const [isFaulty, setIsFaulty] = useState(false);
  const [withdrawLoading, setWithdrawLoading] = useState<boolean>(false);
  const { data }: any = useGetBankDataQuery();
  const [walletToBank] = useWalletToBankMutation();
  const [indToWallet] = useIndToWalletMutation();
  const [indToBank] = useIndToBankMutation();
  const [targetToWallet] = useTargetToWalletMutation();
  const [targetToBank] = useTargetToBankMutation();
  const [withdrawCommission] = useWithdrawCommissionMutation();
  const [targetWithdrawalCommission] = useTargetWithdrawalCommissionMutation();
  const [indWithdrawalCommission] = useIndWithdrawalCommissionMutation();
  const [wtForm, setWtForm] = useState<WithdrawalFormTypes>({
    bankId: '',
    amount: 0,
    channel: 'paystack',
    planId: '',
    planName: '',
    planType: '',
    mature: false,
    pin: null,
    balance: 0,
  });

  const [wtComm, setWtComm] = React.useState<WithdrawalCommissionTypes>({
    amount: 0,
    commissionMode: '',
    charges: 0,
    totalAmount: 0,
    planId: '',
    commissionFor: '',
    percentage: 0,
    penalty: 0,
  });

  // useEffect(() => {
  //   const urlParams = new URL(window.location.href);
  //   const myParam = urlParams.searchParams.get("tab");
  //   myParam ? setCurrentModal(parseInt(myParam)) : setCurrentModal(1);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  const navigate = useNavigate();

  const withdrawalState = useAppSelector(
    (state: RootState) => state.withdrawalSelection
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (withdrawalState.planId.length > 0) {
      setCurrentModal(0);
      setWtForm(currForm => {
        return {
          ...currForm,
          planId: withdrawalState.planId,
          planName: withdrawalState.planName,
          planType: withdrawalState.planType,
          mature: withdrawalState.planCompleted,
          balance: withdrawalState.balance,
        };
      });
    } else {
      setCurrentModal(1);
    }

    return () => {
      dispatch(removeWithdrawalPlan());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFormChange = (e: any) => {
    const { name, value } = e.target;
    setWtForm({
      ...wtForm,
      [name]: value,
    });
  };

  const bankList = (data: any) => {
    let arr: any = [];
    data?.data.forEach((bank: any) => {
      arr.push({
        name: `${bank.bank_name} (${bank.account_number})`,
        value: bank.id,
      });
    });
    return arr;
  };

  const firstRef = useRef<HTMLInputElement>(null);
  const secondRef = useRef<HTMLInputElement>(null);
  const thirdRef = useRef<HTMLInputElement>(null);
  const fourthRef = useRef<HTMLInputElement>(null);

  const pinData = [
    {
      name: 'first',
      ref: firstRef,
      next: secondRef,
    },
    {
      name: 'second',
      ref: secondRef,
      next: thirdRef,
      prev: firstRef,
    },
    {
      name: 'third',
      ref: thirdRef,
      next: fourthRef,
      prev: secondRef,
    },
    {
      name: 'fourth',
      ref: fourthRef,
      prev: thirdRef,
    },
  ];

  const handleRef = (e: any, next: any, prev: any) => {
    const key = e.key;
    if (e.target.value.length && next) {
      next.current.focus();
    }

    if ((key === 'Backspace' || key === 'Delete') && prev) {
      prev.current.focus();
    }
  };

  const handleRefInput = (e: any) => {
    const keyVal = e.which || e.keyCode;
    if (keyVal < 48 || keyVal > 57) e.preventDefault();
  };

  const finalSubmit = () => {
    if (wtForm.planType === 'stash') {
      withdrawFromStash();
    } else if (wtForm.planType === 'individual') {
      withdrawFromPlan();
    } else if (wtForm.planType === 'target') {
      withdrawFromTarget();
    }
  };

  const initSubmitHandler = () => {
    setIsFaulty(false);
    if (!wtForm.mature && !isFaulty) {
      setCurrentModal(6);
      setIsFaulty(true);
    } else if (wtForm.planType === 'stash') {
      commissionFromPlan();
    } else if (wtForm.planType === 'individual') {
      commissionFromInd();
    } else if (wtForm.planType === 'target') {
      commissionFromTarget();
    }
  };

  // const planNotMature = () => {
  //   // if (wtForm.planType === 'stash') {
  //   //   withdrawFromStash();
  //   // } else if (wtForm.planType === 'individual') {
  //   //   withdrawFromPlan();
  //   // } else if (wtForm.planType === 'target') {
  //   //   withdrawFromTarget();
  //   // }

  //   if (wtForm.planType === 'stash') {
  //     commissionFromPlan();
  //   } else if (wtForm.planType === 'individual') {
  //     commissionFromInd();
  //   } else if (wtForm.planType === 'target') {
  //     commissionFromTarget();
  //   }
  // };

  const submitHandler = (e: any) => {
    e.preventDefault();
    initSubmitHandler();
  };

  const commissionFromPlan = async (): Promise<void> => {
    try {
      setWithdrawLoading(true);
      const res: any = await withdrawCommission({
        amount: wtForm.amount,
      });

      if (res?.data?.status === 'success') {
        setWithdrawLoading(false);
        // message.success(res.data.message);
        setCurrentModal(9);
        const {
          amount,
          charges,
          commission_mode,
          commission_for,
          percentage,
          penalty,
        } = res.data.data;
        setWtComm(currData => ({
          ...currData,
          amount,
          charges,
          penalty,
          percentage: percentage?.split('.')[0],
          commissionMode: commission_mode,
          commissionFor: commission_for,
          totalAmount:
            parseFloat(amount) + parseFloat(charges) + parseFloat(penalty),
        }));
        // navigate(`../${user}`);
      } else if (res.error) {
        setWithdrawLoading(false);
        message.error(res.error?.data?.message);
      } else {
        setWithdrawLoading(false);
        message.error(res.data.message);
      }
    } catch (error) {
      setWithdrawLoading(false);
      // message.error(error?.data?.message);
      console.log(error);
    }
  };

  const commissionFromInd = async (): Promise<void> => {
    try {
      setWithdrawLoading(true);
      const res: any = await indWithdrawalCommission({
        amount: wtForm.amount,
        saving_cycle_id: wtForm.planId,
      });

      if (res?.data?.status === 'success') {
        setWithdrawLoading(false);
        // message.success(res.data.message);
        setCurrentModal(9);
        const {
          amount,
          charges,
          commission_mode,
          commission_for,
          percentage,
          penalty,
        } = res.data.data;
        setWtComm(currData => ({
          ...currData,
          amount,
          charges,
          penalty,
          percentage: percentage?.split('.')[0],
          commissionMode: commission_mode,
          commissionFor: commission_for,
          totalAmount:
            parseFloat(amount) + parseFloat(charges) + parseFloat(penalty),
        }));
        // navigate(`../${user}`);
      } else if (res.error) {
        setWithdrawLoading(false);
        message.error(res.error?.data?.message);
      } else {
        setWithdrawLoading(false);
        message.error(res.data.message);
      }
    } catch (error) {
      setWithdrawLoading(false);
      // message.error(error?.data?.message);
      console.log(error);
    }
  };
  const commissionFromTarget = async (): Promise<void> => {
    try {
      setWithdrawLoading(true);
      const res: any = await targetWithdrawalCommission({
        amount: wtForm.amount,
        saving_cycle_id: wtForm.planId,
      });

      if (res?.data?.status === 'success') {
        setWithdrawLoading(false);
        // message.success(res.data.message);
        setCurrentModal(9);
        const {
          amount,
          charges,
          commission_mode,
          commission_for,
          percentage,
          penalty,
        } = res.data.data;
        setWtComm(currData => ({
          ...currData,
          amount,
          penalty,
          percentage: percentage?.split('.')[0],
          charges: parseFloat(charges),
          commissionMode: commission_mode,
          commissionFor: commission_for,
          totalAmount:
            parseFloat(amount) + parseFloat(charges) + parseFloat(penalty),
        }));
        // navigate(`../${user}`);
      } else if (res.error) {
        setWithdrawLoading(false);
        message.error(res.error?.data?.message);
      } else {
        setWithdrawLoading(false);
        message.error(res.data.message);
      }
    } catch (error) {
      setWithdrawLoading(false);
      // message.error(error?.data?.message);
      console.log(error);
    }
  };

  // let wtPin = firstRef.current.value && secondRef.current.value && thirdRef.current.value && fourthRef.current.value && `${firstRef?.current?.value}${secondRef?.current?.value}${thirdRef?.current?.value}${fourthRef?.current?.value}`;

  const withdrawFromStash = async (): Promise<void> => {
    let wtPin = parseInt(
      `${firstRef?.current?.value}${secondRef?.current?.value}${thirdRef?.current?.value}${fourthRef?.current?.value}`
    );

    try {
      setWithdrawLoading(true);
      const res: any = await walletToBank({
        bank_detail_id: wtForm.bankId,
        channel: 'paystack',
        amount: wtForm.amount,
        pin: wtPin,
      });
      if (res?.data?.status === 'success') {
        setWithdrawLoading(false);
        message.success(res.data.message);
        setCurrentModal(10);
        // navigate(`../${user}`);
      } else if (res.error) {
        setWithdrawLoading(false);
        message.error(res.error?.data?.message);
      } else {
        setWithdrawLoading(false);
        message.error(res.data.message);
      }
    } catch (error: any) {
      setWithdrawLoading(false);
      message.error(error?.data?.message);
    }
  };

  const withdrawFromPlan = async (): Promise<void> => {
    let wtPin = parseInt(
      `${firstRef?.current?.value}${secondRef?.current?.value}${thirdRef?.current?.value}${fourthRef?.current?.value}`
    );
    if (wtForm.bankId === 'stash') {
      try {
        setWithdrawLoading(true);
        const res: any = await indToWallet({
          saving_cycle_id: wtForm.planId,
          amount: wtForm.amount,
          pin: wtPin,
        });
        if (res?.data?.status === 'success') {
          setWithdrawLoading(false);
          message.success(res.data.message);
          setCurrentModal(10);
          // navigate(`../${user}`);
        } else if (res.error) {
          setWithdrawLoading(false);
          message.error(res.error?.data?.message);
        } else {
          setWithdrawLoading(false);
          message.error(res.data.message);
        }
      } catch (error: any) {
        setWithdrawLoading(false);
        message.error(error?.data?.message);
      }
    } else {
      try {
        setWithdrawLoading(true);
        const res: any = await indToBank({
          saving_cycle_id: wtForm.planId,
          amount: wtForm.amount,
          bank_detail_id: wtForm.bankId,
          pin: wtPin,
        });
        if (res?.data?.status === 'success') {
          setWithdrawLoading(false);
          message.success(res.data.message);
          setCurrentModal(10);
          // navigate(`../${user}`);
        } else if (res.error) {
          setWithdrawLoading(false);
          message.error(res.error?.data?.message);
        } else {
          setWithdrawLoading(false);
          message.error(res.data.message);
        }
      } catch (error: any) {
        setWithdrawLoading(false);
        message.error(error?.data?.message);
      }
    }
  };

  const withdrawFromTarget = async (): Promise<void> => {
    let wtPin = parseInt(
      `${firstRef?.current?.value}${secondRef?.current?.value}${thirdRef?.current?.value}${fourthRef?.current?.value}`
    );
    if (wtForm.bankId === 'stash') {
      try {
        setWithdrawLoading(true);
        const res: any = await targetToWallet({
          saving_cycle_id: wtForm.planId,
          amount: wtForm.amount,
          pin: wtPin,
        });
        if (res?.data?.status === 'success') {
          setWithdrawLoading(false);
          message.success(res.data.message);
          setCurrentModal(10);
          // navigate(`../${user}`);
        } else if (res.error) {
          setWithdrawLoading(false);
          message.error(res.error?.data?.message);
        } else {
          setWithdrawLoading(false);
          message.error(res.data.message);
        }
      } catch (error: any) {
        setWithdrawLoading(false);
        message.error(error?.data?.message);
      }
    } else {
      try {
        setWithdrawLoading(true);
        const res: any = await targetToBank({
          saving_cycle_id: wtForm.planId,
          amount: wtForm.amount,
          bank_detail_id: wtForm.bankId,
          pin: wtPin,
        });
        if (res?.data?.status === 'success') {
          setWithdrawLoading(false);
          message.success(res.data.message);
          setCurrentModal(10);
          // navigate(`../${user}`);
        } else if (res.error) {
          setWithdrawLoading(false);
          message.error(res.error?.data?.message);
        } else {
          setWithdrawLoading(false);
          message.error(res.data.message);
        }
      } catch (error: any) {
        setWithdrawLoading(false);
        message.error(error?.data?.message);
      }
    }
  };

  let withdrawalOptions: any = [];

  if (data && wtForm.planType === 'stash') {
    withdrawalOptions = [...bankList(data)];
  } else if (data && wtForm.planType !== 'stash') {
    withdrawalOptions = [
      {
        name: 'My Purse',
        value: 'stash',
      },
      ...bankList(data),
    ];
  } else if (!data && wtForm.planType !== 'stash') {
    withdrawalOptions = [
      {
        name: 'My Purse',
        value: 'stash',
      },
    ];
  } else withdrawalOptions = [];

  return (
    <>
      <Withdrawal.Wrapper>
        <div className='container'>
          <h2 style={{ fontWeight: '600', color: '#33277b' }}>Withdrawal</h2>
          <hr className='line' />
          <div
            onClick={() => navigate(-1)}
            // onClick={() => navigate(`../${withdrawal}`)}
            style={{ textDecoration: 'none' }}
            className='back'
          >
            <BackIcon />
            <p>Back</p>
          </div>
          <div className='ind-carou'>
            <SavingsCarousel />
          </div>

          <p>To make a withdrawal, you need to add a bank.</p>

          <form className='col-md-8 col-lg-6' onSubmit={submitHandler}>
            <div className='my-4'>
              <div className='d-flex flex-row justify-content-between '>
                <Label color='#33277B'>Plan Name</Label>
                <p color='#33277B'>
                  Current Bal:
                  <b>
                    <NairaIcon className='stashBalance' />
                    {wtForm.balance}
                  </b>
                </p>
              </div>
              <Input
                type='text'
                placeholder='Enter your plan name'
                name='planName'
                onChange={handleFormChange}
                // required
                value={wtForm.planName}
                disabled
              />
            </div>

            <div className='my-4'>
              <div className='d-flex flex-row justify-content-between'>
                <Label color='#33277B'>Select Destination</Label>
                <p
                  onClick={() => setCurrentModal(5)}
                  style={{ cursor: 'pointer' }}
                >
                  Add Bank
                </p>
              </div>
              <Select
                placeholder='Your Destination'
                name='bankId'
                fullWidth
                options={withdrawalOptions}
                onChange={handleFormChange}
                required
              />
            </div>

            <div className='my-4'>
              <Label color='#33277B'>How much do you want to withdraw?</Label>
              <Input
                type='number'
                placeholder='Enter your preferred amount'
                name='amount'
                onChange={handleFormChange}
                required
                min={1000}
              />
              <p className='mt-2' style={{ color: '#ff4242' }}>
                You cannot withdraw less than <b>&#8358;1000</b>.
              </p>
            </div>

            <div className='my-4'>
              <Label color='#33277B'>Enter your withdrawal pin</Label>
              <div className='with-ref'>
                {pinData.map((item, idx) => (
                  <>
                    <Input
                      type='password'
                      name={item.name}
                      key={idx}
                      maxLength={1}
                      refs={item.ref}
                      onKeyUp={(e: any) => handleRef(e, item.next, item.prev)}
                      onKeyPress={handleRefInput}
                      pattern='[0-9]'
                    />
                  </>
                ))}
              </div>
              <div
                className='my-3'
                style={{ cursor: 'pointer' }}
                onClick={() => setCurrentModal(7)}
              >
                Don't have a pin? <b>Create one here</b>
              </div>
            </div>
            <Button style={{ minWidth: '150px' }}>
              {withdrawLoading ? <LoadingButton /> : 'Withdraw'}
            </Button>
          </form>
        </div>
      </Withdrawal.Wrapper>
      <div>
        {currentModal === 1 && (
          <ModalA isShown={true} hide={() => {}}>
            <WithdrawalPlanSelect
              func={setCurrentModal}
              wtForm={wtForm}
              setWtForm={setWtForm}
            />
          </ModalA>
        )}
        {currentModal === 2 && (
          <ModalA isShown={true} hide={() => {}}>
            <IndWithdrawal
              func={setCurrentModal}
              wtForm={wtForm}
              setWtForm={setWtForm}
            />
          </ModalA>
        )}
        {currentModal === 3 && (
          <ModalA isShown={true} hide={() => {}}>
            <TarGrpWithdrawal
              func={setCurrentModal}
              wtForm={wtForm}
              setWtForm={setWtForm}
            />
          </ModalA>
        )}
        {currentModal === 4 && (
          <ModalA isShown={true} hide={() => {}}>
            <GrpWithdrawal func={setCurrentModal} />
          </ModalA>
        )}
        {currentModal === 5 && (
          <ModalA isShown={true} hide={() => {}}>
            <AddBank func={setCurrentModal} />
          </ModalA>
        )}
        {currentModal === 6 && (
          <ModalA isShown={true} hide={() => {}}>
            <Warning
              warningTitle={'Warning'}
              warningText={
                <p>
                  Withdrawing before your maturity date will attract a penalty.
                  <br />
                  Click <b>Continue</b> to withdraw anyways or <b>Cancel</b> to
                  go back.
                </p>
              }
              closeModal={() => setCurrentModal(0)}
              // confirm={() => planNotMature()}
              confirm={() => initSubmitHandler()}
              confirmText={'Continue'}
            />
          </ModalA>
        )}
        {currentModal === 7 && (
          <ModalA isShown={true} hide={() => {}}>
            <CreatePin closeModal={() => setCurrentModal(0)} />
          </ModalA>
        )}
        {currentModal === 8 && (
          <ModalA isShown={true} hide={() => {}}>
            <FormSubmit
              withdrawal={true}
              onConfirm={() => navigate(`../${user}`)}
            />
          </ModalA>
        )}
        {currentModal === 9 && (
          <ModalA isShown={true} hide={() => {}}>
            <ConfirmWithdrawalSubmit
              closeModal={() => setCurrentModal(0)}
              confirm={() => finalSubmit()}
              wtComm={wtComm}
              withdrawLoading={withdrawLoading}
            />
          </ModalA>
        )}
        {currentModal === 10 && (
          <ModalA isShown={true} hide={() => {}}>
            <SuccessWithdrawal
              warningTitle={'Congratulations'}
              warningText={
                'Your withdrawal request has been submitted. It is being processed.'
              }
              confirmText={'OK'}
              closeModal={() => navigate(`../`)}
            />
          </ModalA>
        )}
      </div>
    </>
  );
};

Withdrawal.Wrapper = styled.div`
  .container {
    padding: 2rem;
    color: #33277b !important;
    // font-size: 16px;

    .line {
      border: 1px solid rgba(0, 0, 0, 0.4);
    }

    .back {
      display: flex;
      color: #33277b;
      // font-size: 16px;
      cursor: pointer;
      align-items: center;
      p {
        margin: 0 0 0 1rem;
      }
      margin: 1rem 0;
    }

    .ind-carou {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      background: #33277b;
      border-radius: 20px;
      padding: 1rem 2rem 1rem 1rem;
      color: #fff;
      margin-bottom: 2rem;
      p {
        // font-size: 16px;
      }

      .savings {
        display: flex;
        flex-direction: row;
        align-items: bottom;
        h2 {
          color: #fff !important;
        }
        .savingsIcon {
          margin-inline-end: 0.25rem;
        }
      }
    }

    .stashBalance {
      height: 16px;
      margin-left: 2px;
    }

    .with-ref {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 80%;
      // margin: 4rem auto;
      // margin: 0 auto;
      & > div {
        width: 20%;
      }
    }

    @media screen and (max-width: 500px) {
      padding: 1rem;
    }
  }
`;

export default Withdrawal;
