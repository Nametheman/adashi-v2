import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ReactComponent as CloseIcon } from '../assets/icons/close-icon.svg';
import { ReactComponent as CoinsIcon } from '../assets/icons/coins.svg';
import { formatNumber } from '../helpers/formatNumbers';
import { useGetUserProfileQuery } from '../redux/services/auth-services';
import { user } from '../utils/routes';

const WithdrawalPlanSelect = ({ func, wtForm, setWtForm }: any) => {
  const navigate = useNavigate();
  const { data }: any = useGetUserProfileQuery();

  // for stash balance
  const stashBal = parseFloat(data?.wallet.balance);
  const stashBalNaira = stashBal
    ? formatNumber(parseInt(stashBal.toFixed(2).split('.')[0]))
    : 0;
  const stashBalKobo = stashBal ? stashBal.toFixed(2).split('.')[1] : '00';

  const stashWithdrawalSelect = () => {
    setWtForm({
      ...wtForm,
      planId: 'stash',
      planType: 'stash',
      planName: 'My Purse',
      balance: `${stashBalNaira}.${stashBalKobo}`,
      mature: true,
    });
    func(0);
  };

  return (
    <Wrapper>
      <div className='header'>
        <h5 style={{ color: '#33277b' }}>
          <b>Withdrawal</b>
        </h5>
        <CloseIcon
          onClick={() => navigate(`${user}`)}
          style={{ cursor: 'pointer' }}
        />
      </div>
      <p>
        <b>Select a plan to proceed</b>
      </p>
      <div className='sav-plan mb-4' onClick={() => stashWithdrawalSelect()}>
        <CoinsIcon className='me-2' />
        My Purse
      </div>
      <div className='sav-plan mb-4' onClick={() => func(2)}>
        <CoinsIcon className='me-2' />
        Individual Plans
      </div>
      <div className='sav-plan' onClick={() => func(3)}>
        <CoinsIcon className='me-2' />
        Target Group Plans
      </div>
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
`;

export default WithdrawalPlanSelect;
