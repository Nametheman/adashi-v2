import styled from 'styled-components';

import { ReactComponent as CloseIcon } from '../assets/icons/close-icon.svg';
import { ReactComponent as PadlockImg } from '../assets/icons/padlock.svg';
import { formatNumber } from '../helpers/formatNumbers';

const GrpWithdrawal = ({ func }: any) => {
  const GrpPlans = [
    {
      title: 'Group A',
      balance: 100000,
      withdrawStatus:
        'Withdraw for free anytime. Earn 5.5% p.a. on your balance.',
    },
    {
      title: 'Group B',
      balance: 100000,
      withdrawStatus:
        'Withdraw for free anytime. Earn 5.5% p.a. on your balance.',
    },
    {
      title: 'Group C',
      balance: 100000,
      withdrawStatus:
        'Withdraw for free anytime. Earn 5.5% p.a. on your balance.',
    },
  ];
  return (
    <Wrapper>
      <div className='header'>
        <h5 style={{ color: '#33277b' }}>
          <b>Select a plan to withdraw from</b>
        </h5>
        <CloseIcon onClick={() => func(1)} style={{ cursor: 'pointer' }} />
      </div>

      {GrpPlans.map((item, id) => (
        <div className='plan-body' onClick={() => func(0)} key={id}>
          <div className='title'>
            <p>{item.title}</p>
            <PadlockImg />
          </div>
          <h5 style={{ color: '#33277b' }}>
            <b>Available Balance : &#8358;&nbsp;{formatNumber(item.balance)}</b>
          </h5>
          <p>{item.withdrawStatus}</p>
        </div>
      ))}
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

export default GrpWithdrawal;
