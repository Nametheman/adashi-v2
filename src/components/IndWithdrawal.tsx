import { useEffect } from 'react';
import styled from 'styled-components';

import { ReactComponent as CloseIcon } from '../assets/icons/close-icon.svg';
import { ReactComponent as PadlockOpen } from '../assets/icons/padlock-open.svg';
import { ReactComponent as PadlockLock } from '../assets/icons/padlock.svg';
import { formatNumber } from '../helpers/formatNumbers';
import { WithdrawalFormTypes } from '../pages/authPages/Withdrawal';
import { useGetIndSavingsAllQuery } from '../redux/services/saving-service';

import NoData from './bits/NoData';
import SkeletonCards from './bits/SkeletonCards';

export type IndWithdrawalProps = {
  func: Function;
  wtForm: WithdrawalFormTypes;
  setWtForm: Function;
};

const IndWithdrawal = ({ func, wtForm, setWtForm }: IndWithdrawalProps) => {
  const { data, refetch, isLoading }: any = useGetIndSavingsAllQuery();
  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <div className='header'>
        <h5 style={{ color: '#33277b' }}>
          <b>Select a plan to withdraw from</b>
        </h5>
        <CloseIcon onClick={() => func(1)} style={{ cursor: 'pointer' }} />
      </div>

      {isLoading ? (
        <SkeletonCards />
      ) : data?.length > 0 ? (
        <>
          {data?.map((plan: any, index: number) => {
            const { name, id, balance, end_date } = plan;
            const currDate = new Date();
            const endDate = new Date(end_date);
            const isMature = endDate <= currDate;

            const withdrawalSelect = () => {
              setWtForm({
                ...wtForm,
                planId: id,
                planName: name,
                planType: 'individual',
                balance: formatNumber(balance),
                mature: isMature,
              });
              func(0);
            };

            return (
              <div
                className='plan-body'
                onClick={() => withdrawalSelect()}
                key={index}
              >
                <div className='title'>
                  <p>{name}</p>
                  {isMature ? <PadlockOpen /> : <PadlockLock />}
                </div>
                <h5 style={{ color: '#33277b' }}>
                  <b>Current Balance : &#8358;&nbsp;{formatNumber(balance)}</b>
                </h5>
                {/* {isMature ? (
                  <p>
                    Withdraw for free anytime. Earn 5.5% p.a. on your balance.
                  </p>
                ) : (
                  <p>
                    Withdrawing before your maturity day attracts a penalty fee.
                  </p>
                )} */}
              </div>
            );
          })}
        </>
      ) : (
        <div className='mt-4 pt-4'>
          <NoData text='You have no individual savings plans.' />
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 3rem;
  // width: 100%
  /* height: 100%; */
  color: #33277b !important;
  max-height: 80vh;
  // font-size: 16px;

  p {
    // // font-size: 16px;
  }

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 1rem;
    margin-bottom: 2rem;
  }

  .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-transform: capitalize;
  }

  .plan-body {
    padding: 1rem;
    background: rgba(207, 232, 222, 0.2);
    border: 1px solid rgba(0, 0, 0, 0.4);
    box-sizing: border-box;
    border-radius: 20px;
    margin-bottom: 2rem;
    cursor: pointer;
  }
`;

export default IndWithdrawal;
