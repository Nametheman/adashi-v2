import { message } from 'antd';
import React, {
  ChangeEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { ReactComponent as BackIcon } from '../assets/icons/back.svg';
import { ReactComponent as EditIcon } from '../assets/icons/edit-plan.svg';
import { ReactComponent as TopUpIcon } from '../assets/icons/topup-plan.svg';
import { ReactComponent as WithdrawPlanIcon } from '../assets/icons/withdraw-plan.svg';
import { userData } from '../helpers/authHelper';
import { format4dpNumber } from '../helpers/formatNumbers';
import { cardChecker } from '../helpers/otherHelpers';
import { useGetTarGroupQuery } from '../redux/services/saving-service';
import {
  useBankToTargetMutation,
  useGetCardDataQuery,
  useWalletToTargetMutation,
} from '../redux/services/transaction-service';
import { updateWithdrawalPlan } from '../redux/slices/withdrawal-slice';
import { useAppDispatch } from '../redux/store';
import {
  editTarGrp,
  savings,
  targetGroupSavings,
  transactions,
  withdrawal,
} from '../utils/routes';

import CreatePin from './CreatePin';
import FormSubmit from './FormSubmit';
import { TopUpDetails } from './IndSavingsPlan';
import PlanInfo from './PlanInfo';
import PlanProgress from './PlanProgress';
import PlanTransactionTable from './PlanTransactionTable';
import TopUp from './TopUp';
import LoadingRoller from './bits/LoadingRoller';
import ModalA from './bits/ModalA';
import NoData from './bits/NoData';

const TarGrpSavingsPlan = () => {
  let params = useParams();
  const planId: string = params.planId || '';
  const { data, isLoading, refetch }: any = useGetTarGroupQuery(planId);
  const { data: cardData }: any = useGetCardDataQuery();
  const [topUpLoading, setTopUpLoading] = useState<boolean>(false);
  const [walletToTarget] = useWalletToTargetMutation();
  const [bankToTarget] = useBankToTargetMutation();

  const dispatch = useAppDispatch();

  const [currentModal, setCurrentModal] = useState<number>(0);
  const [cardHeight, setCardHeight] = useState<number>(0);

  const cardRef1 = useRef<null | HTMLElement>(null);
  const cardRef2 = useRef<null | HTMLElement>(null);

  const navigate = useNavigate();
  const [topUpDetails, setTopUpDetails] = useState<TopUpDetails>({
    topUpOpt: '',
    amount: 0,
    pin: null,
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    // cardRef2?.current?.clientHeight &&
    data &&
      cardRef2?.current?.clientHeight &&
      setCardHeight(cardRef2.current.clientHeight);
  }, [data]);

  const topUpDetailsHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTopUpDetails(currDet => {
      return {
        ...currDet,
        [name]: value,
      };
    });
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

  const topUpPlan = async (): Promise<void> => {
    let topUpPin = parseInt(
      `${firstRef?.current?.value}${secondRef?.current?.value}${thirdRef?.current?.value}${fourthRef?.current?.value}`
    );
    if (topUpDetails.topUpOpt === 'stash') {
      try {
        setTopUpLoading(true);
        const res: any = await walletToTarget({
          saving_cycle_id: planId,
          amount: topUpDetails.amount,
          pin: topUpPin,
        });
        if (res?.data?.status === 'success') {
          setTopUpLoading(false);
          message.success('Transaction successful');
          setCurrentModal(2);
        } else if (res.error) {
          setTopUpLoading(false);
          message.error(res.error?.data?.message);
        } else {
          setTopUpLoading(false);
          message.error(res.data.message);
        }
      } catch (error: any) {
        setTopUpLoading(false);
        message.error(error?.data?.message);
      }
    } else {
      try {
        setTopUpLoading(true);
        const res: any = await bankToTarget({
          saving_cycle_id: planId,
          amount: topUpDetails.amount,
          payment_gateway_id: topUpDetails.topUpOpt,
          pin: topUpPin,
        });
        if (res?.data?.status === 'success') {
          setTopUpLoading(false);
          message.success('Transaction successful');
          setCurrentModal(2);
        } else if (res.error) {
          setTopUpLoading(false);
          message.error(res.error?.data?.message);
        } else {
          setTopUpLoading(false);
          message.error(res.data.message);
        }
      } catch (error: any) {
        setTopUpLoading(false);
        message.error(error?.data?.message);
      }
    }
  };

  // const currDate = new Date();
  // const endDate = new Date(data?.end_date);
  // const isMature = endDate <= currDate;
  const isMature = data && data.status === 'matured';

  let currParticipant: any = {};
  let cardInfo: any = [];
  let participantEmails: string[] = [];

  let currentBal: number;
  data?.target_group_saving_participants.forEach((participant: any) => {
    participantEmails.push(participant?.participant_email);
    if (participant?.user_id === userData().id) {
      currParticipant = participant;
      currentBal = parseFloat(participant?.balance);
    }
    cardData &&
      (cardInfo = cardChecker(cardData, currParticipant.payment_gateway_id));
  });

  const withdrawalSelect = () => {
    dispatch(
      updateWithdrawalPlan({
        planId: planId,
        planName: data.name,
        planType: 'target',
        planCompleted: isMature,
        balance: format4dpNumber(currentBal),
      })
    );
    navigate(`../${withdrawal}`);
  };

  return (
    <>
      <TarGrpSavingsPlan.Wrapper>
        {isLoading ? (
          <LoadingRoller />
        ) : data ? (
          <div className='container'>
            <h2 style={{ fontWeight: '600', color: '#33277b' }}>{data.name}</h2>
            <hr className='line' />
            <Link
              to={`../${targetGroupSavings}`}
              style={{ textDecoration: 'none' }}
              className='back'
            >
              <BackIcon />
              <p>Back</p>
            </Link>
            <div className='ind-carou'>
              <div className='icon-row col-12 col-lg-8'>
                <div
                  className='plan-icon'
                  onClick={() => navigate(`../${editTarGrp}/${planId}`)}
                >
                  <EditIcon />
                  <p>Edit Plan</p>
                </div>
                <div className='plan-icon' onClick={() => withdrawalSelect()}>
                  <WithdrawPlanIcon />
                  <p>Withdraw</p>
                </div>
                <div className='plan-icon' onClick={() => setCurrentModal(1)}>
                  <TopUpIcon />
                  <p>Top Up</p>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-6 p-3'>
                {/* {data.target_group_saving_histories?.forEach((saving: any) => {
                  currentBal += Number(saving.amount);
                })} */}
                <PlanProgress
                  progressRef={cardRef1}
                  totalAmt={parseFloat(data.target_amount)}
                  achievedAmt={parseFloat(currParticipant?.balance) || 0}
                  cycle={currParticipant?.plan || 'cycle'}
                  cycleAmt={currParticipant?.amount || '0'}
                  maturityDate={data.end_date}
                  setCurrentModal={setCurrentModal}
                  cardHeight={cardHeight}
                  isMature={isMature}
                />
              </div>
              <div className='col-lg-6 p-3'>
                <PlanInfo
                  infoRef={cardRef2}
                  startDate={data.start_date}
                  maturityDate={data.end_date}
                  planType='Target Group Savings'
                  nextSavingsDate={currParticipant?.next_savings_date}
                  debitCardNo={cardInfo[0]}
                  debitCardType={cardInfo[1]}
                  status={data.status}
                  isMature={isMature}
                  memberEmails={participantEmails}
                />
              </div>
            </div>
            <div className='trans-text'>
              <p className='mb-0'>Recent Transactions</p>
              {/* this will be sorted to show only transactions made from that savings plan */}
              <Link
                to={`../${transactions}`}
                style={{ textDecoration: 'none', color: '#059157' }}
              >
                See All
              </Link>
            </div>
            <PlanTransactionTable
              // savingHistory={data.target_group_saving_histories}
              savingHistory={data.target_group_saving_histories.filter(
                (trans: any) => trans.user_id === userData().id
              )}
              planType='Target Group Savings'
            />
          </div>
        ) : (
          <div className='mt-4 pt-4'>
            <NoData text='Please check your internet connection or reload the page.' />
          </div>
        )}
      </TarGrpSavingsPlan.Wrapper>
      {currentModal === 1 && (
        <ModalA isShown={true} hide={() => {}}>
          <TopUp
            closeModal={() => setCurrentModal(0)}
            addCardModal={() => setCurrentModal(4)}
            fromStash={true}
            updDets={topUpDetailsHandler}
            isLoading={topUpLoading}
            topUpPlan={topUpPlan}
            setCurrentModal={setCurrentModal}
            pinData={pinData}
            handleRef={handleRef}
          />
        </ModalA>
      )}
      {currentModal === 2 && (
        <ModalA isShown={true} hide={() => {}}>
          <FormSubmit
            onConfirm={() => navigate(`../${targetGroupSavings}`)}
            top={true}
          />
        </ModalA>
      )}
      {currentModal === 3 && (
        <ModalA isShown={true} hide={() => {}}>
          <FormSubmit onConfirm={() => navigate(`../${savings}`)} roll={true} />
        </ModalA>
      )}
      {currentModal === 4 && (
        <ModalA isShown={true} hide={() => {}}>
          <CreatePin closeModal={() => setCurrentModal(0)} />
        </ModalA>
      )}
    </>
  );
};

TarGrpSavingsPlan.Wrapper = styled.div`
  .container {
    padding: 2rem;
    color: #33277b !important;
    // font-size: 16px;
    text-transform: capitalize;

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

    .row {
      justify-content: space-between;
    }

    .ind-carou {
      display: flex;
      flex-direction: column;
      // justify-content space-between;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      background: #33277b;
      border-radius: 20px;
      color: #fff;
      padding: 1rem 6rem;
      margin-bottom: 2rem;

      // .header-row {
      //   display: flex;
      //   flex-direction: row;
      //   justify-content: space-between;
      //   width: 100%;
      // }

      .icon-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        // width: 60%;
        margin-top: 1rem;

        p {
          margin-top: 1rem;
        }

        .plan-icon {
          cursor: pointer;
        }
      }
    }

    .title {
      h2 {
        color: #33277b;
      }
      margin-bottom: 1rem;
      width: 100%;
    }

    .trans-text {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      font-weight: 600;
    }

    @media screen and (max-width: 950px) {
      .ind-carou {
        padding: 1rem 4rem;
      }
    }

    @media screen and (max-width: 500px) {
      padding: 1rem;
      .ind-carou {
        padding: 1rem 2rem !important;
      }
    }
  }
`;

export default TarGrpSavingsPlan;
