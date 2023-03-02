import { Skeleton } from 'antd';
import { useEffect } from 'react';
import styled from 'styled-components';

import { ReactComponent as CloseIcon } from '../assets/icons/close-icon.svg';
import { ReactComponent as PadlockOpen } from '../assets/icons/padlock-open.svg';
import { ReactComponent as PadlockClose } from '../assets/icons/padlock.svg';
import { userData } from '../helpers/authHelper';
import { format4dpNumber } from '../helpers/formatNumbers';
import { useGetTarGroupJoinedQuery } from '../redux/services/saving-service';

import { IndWithdrawalProps } from './IndWithdrawal';
import NoData from './bits/NoData';

const TarGrpWithdrawal = ({ func, wtForm, setWtForm }: IndWithdrawalProps) => {
  const { data, refetch, isLoading }: any = useGetTarGroupJoinedQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <Wrapper>
      <div className='header'>
        <h5 style={{ color: '#33277b' }}>
          <b>Select a plan to withdraw from</b>
        </h5>
        <CloseIcon onClick={() => func(1)} style={{ cursor: 'pointer' }} />
      </div>

      {isLoading ? (
        <Skeleton active />
      ) : data?.length > 0 ? (
        <>
          {data?.map((group: any, index: number) => {
            const { name, id, end_date } = group.target_group_saving;
            let currentBal = 0;
            for (let participant of group.target_group_saving
              .target_group_saving_participants) {
              if (participant?.participant_email === userData().email) {
                currentBal = parseFloat(participant?.balance);
              }
            }

            const currDate = new Date();
            const endDate = new Date(end_date);
            const isMature = endDate <= currDate;

            const withdrawalSelect = () => {
              setWtForm({
                ...wtForm,
                planId: id,
                planName: name,
                planType: 'target',
                mature: isMature,
                balance: format4dpNumber(currentBal),
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
                  {isMature ? <PadlockOpen /> : <PadlockClose />}
                </div>
                <h5 style={{ color: '#33277b' }}>
                  <b>
                    Current Balance : &#8358;&nbsp;{format4dpNumber(currentBal)}
                  </b>
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
          <NoData text='You have not joined a target group savings plans.' />
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
    margin-top: 1rem;
    margin-bottom: 2rem;
  }

  .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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

export default TarGrpWithdrawal;
