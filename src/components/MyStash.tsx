import { message } from 'antd';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// import { useShowNav } from "../pages/authPages/AuthIndex";
import { ReactComponent as BackIcon } from '../assets/icons/back.svg';
import { ReactComponent as NairaIcon } from '../assets/icons/naira-white.svg';
import { ReactComponent as PlusImg } from '../assets/icons/plus.svg';
import { ReactComponent as WithdrawIcon } from '../assets/icons/withdraw.svg';
import { formatNumber } from '../helpers/formatNumbers';
import { useGetUserProfileQuery } from '../redux/services/auth-services';
import { useBankToWalletMutation } from '../redux/services/transaction-service';
import { updateWithdrawalPlan } from '../redux/slices/withdrawal-slice';
import { useAppDispatch } from '../redux/store';
import { savings, transactions, user, withdrawal } from '../utils/routes';

import CreatePin from './CreatePin';
import FormSubmit from './FormSubmit';
import { TopUpDetails } from './IndSavingsPlan';
import StashTransactionTable from './StashTransactionTable';
import TopUp from './TopUp';
import ModalA from './bits/ModalA';

const MyStash = () => {
  const { data: userData1, refetch: userRefetch }: any =
    useGetUserProfileQuery();
  const navigate = useNavigate();
  const [currentModal, setCurrentModal] = useState<Number>(0);
  const [topUpLoading, setTopUpLoading] = useState<boolean>(false);
  const [bankToWallet] = useBankToWalletMutation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    userRefetch();
  }, [userRefetch]);

  const [topUpDetails, setTopUpDetails] = useState<TopUpDetails>({
    topUpOpt: '',
    amount: 0,
    pin: null,
  });

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

  const [errorMsg, setErrorMsg] = useState('')

  const topUpPlan = async (): Promise<void> => {
    let topUpPin = parseInt(
      `${firstRef?.current?.value}${secondRef?.current?.value}${thirdRef?.current?.value}${fourthRef?.current?.value}`
    );
    try {
      setTopUpLoading(true);
      const res: any = await bankToWallet({
        payment_gateway_id: topUpDetails.topUpOpt,
        amount: topUpDetails.amount,
        pin: topUpPin,
      });

      if (res?.data?.status === 'success') {
        setTopUpLoading(false);
        message.success('Transaction successful');
        setCurrentModal(2);
      } else if (res.error) {
        setTopUpLoading(false);
        setErrorMsg(res.error?.data?.message)
      } else {
        setTopUpLoading(false);
        setErrorMsg(res?.data?.message)
      }
    } catch (error: any) {
      setTopUpLoading(false);
      setErrorMsg(error?.data?.message)
    }
  };

  // for stash balance
  const stashBal = parseFloat(userData1?.wallet.balance);
  const stashBalNaira = stashBal
    ? formatNumber(parseInt(stashBal.toFixed(2).split('.')[0]))
    : 0;
  const stashBalKobo = stashBal ? stashBal.toFixed(2).split('.')[1] : '00';

  // const { setShowNav } = useShowNav();
  // useEffect(() => {
  //   setShowNav(true);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const isMature = true;
  // true because you can always withdraw from stash

  const withdrawalSelect = () => {
    dispatch(
      updateWithdrawalPlan({
        planId: 'stash',
        planName: 'My Purse',
        planType: 'stash',
        planCompleted: isMature,
        balance: `${stashBalNaira}.${stashBalKobo}`,
      })
    );
    navigate(`../${withdrawal}`);
  };

  return (
    <>
      <MyStash.Wrapper>
        <div className='container'>
          <h2 style={{ fontWeight: '600', color: '#33277b' }}>My Purse</h2>
          <hr className='line' />
          
          <Link
            to={`../${savings}`}
            style={{ textDecoration: 'none' }}
            className='back'
          >
            <BackIcon />
            <p>Back</p>
          </Link>
          <div className='ind-carou'>
            <div className='col-6'>
              <div className='mb-2'>
                <p>My Purse</p>
                <h2 className='my-0 savings'>
                  <NairaIcon style={{ marginInlineEnd: '0.25rem' }} />
                  <b>
                    {stashBalNaira}.{stashBalKobo}
                  </b>
                </h2>
              </div>
            </div>
            <div className='col-md-6 col-lg-4 create'>
              <button className='ind-btn' onClick={() => setCurrentModal(1)}>
                <PlusImg className='me-2' />
                Top Up
              </button>
              <button
                className='ind-btn ms-3'
                // onClick={() => navigate(`../withdrawal?tab=0`)}
                onClick={() => withdrawalSelect()}
              >
                <WithdrawIcon
                  fill='#059157'
                  className='me-2'
                  height={23.74}
                  width={22}
                  aria-label='Withdraw icon'
                />
                Withdraw
              </button>
            </div>
          </div>

          <div className='trans-text'>
            <p className='mb-0'>Recent Transactions</p>
            <Link
              to={`../${transactions}`}
              style={{ textDecoration: 'none', color: '#059157' }}
            >
              See All
            </Link>
          </div>
          <StashTransactionTable />
        </div>
      </MyStash.Wrapper>
      {currentModal === 1 && (
        <ModalA isShown={true} hide={() => {}}>
          <TopUp
            closeModal={() => setCurrentModal(0)}
            addCardModal={() => setCurrentModal(4)}
            fromStash={false}
            updDets={topUpDetailsHandler}
            isLoading={topUpLoading}
            topUpPlan={topUpPlan}
            setCurrentModal={setCurrentModal}
            pinData={pinData}
            handleRef={handleRef}
          />
         {
          errorMsg !== '' &&  <div style={{background: 'white', padding: '20px', position: 'fixed', top: '14%', left: '50%', transform: 'translateX(-50%)', zIndex: '300', display: 'flex', alignItems: 'center'}}>
          <span style={{color: 'red'}}>
          {errorMsg}
          </span>
          <div onClick={() => {
            setErrorMsg('')
          }} style={{cursor: 'pointer', border: '1px solid gray', padding: '4px 10px', marginLeft: '14px' }}>
            close
          </div>
        </div>
         }
        </ModalA>
      )}
      {currentModal === 2 && (
        <ModalA isShown={true} hide={() => {}}>
          <FormSubmit
            onConfirm={() => navigate(`../${user}`)}
            top={true}
            stash={true}
          />
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

MyStash.Wrapper = styled.div`
  .container {
    padding: 2rem;
    color: #33277b !important;
    p {
      // font-size: 16px;
    }

    .line {
      border: 1px solid rgba(0, 0, 0, 0.4);
    }

    // .row {
    //   justify-content: space-between;
    // }

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

    .ind-carou {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      background: #33277b;
      border-radius: 20px;
      padding: 1rem 2rem 1rem 1rem;
      color: #fff;
      margin-bottom: 2rem;
      h2 {
        color: #fff !important;
      }
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

      .create {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
      }

      .ind-btn {
        padding: 0.5rem 1rem;
        display: flex;
        flex-direction: row;
        // justify-content space-between;
        align-items: center;
        color: #059157;
        // font-size: 16px;
        border-radius: 10px;
        min-width: 140px;
        border: 1px solid transparent;
        cursor: pointer;
      }
    }

    .trans-text {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    @media screen and (max-width: 500px) {
      padding: 1rem;
      .ind-carou {
        display: flex;
        flex-direction: column;
        /* justify-content space-between; */
        align-items: start;
      }
    }
  }
`;

export default MyStash;
