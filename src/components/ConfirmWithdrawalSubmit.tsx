import React from 'react';
import styled from 'styled-components';

import { ReactComponent as CloseIcon } from '../assets/icons/close-icon.svg';
import { ReactComponent as NairaIcon } from '../assets/icons/naira-icon.svg';
import { ReactComponent as SummaryIcon } from '../assets/icons/summary.svg';
import { format4dpNumber } from '../helpers/formatNumbers';
import { formatString } from '../helpers/otherHelpers';
import { WithdrawalCommissionTypes } from '../pages/authPages/Withdrawal';

import Button from './bits/Button';
import LoadingButton from './bits/LoadingButton';
import { Heading5 } from './bits/Text';

interface WarningProps {
  closeModal(): void;
  confirm: Function;
  wtComm: WithdrawalCommissionTypes;
  withdrawLoading: boolean;
}

const ConfirmWithdrawalSubmit = (props: WarningProps) => {
  const { closeModal, confirm, wtComm, withdrawLoading } = props;

  const { amount, commissionFor, charges, percentage, penalty } = wtComm;

  const modalConfirm = () => {
    confirm();
    // closeModal();
  };

  return (
    <Wrapper>
      <div className='header'>
        <Heading5 mb={'0'} style={{ marginInlineEnd: '1rem' }}>
          <SummaryIcon className='me-2' /> Summary
        </Heading5>
        <CloseIcon onClick={() => closeModal()} style={{ cursor: 'pointer' }} />
      </div>
      <p>You're about to make a withdrawal</p>
      <div className='summary'>
        <div className='summary__content'>
          <p>Amount</p>
          <b>
            <NairaIcon className='summary__content--icon' />
            <span>{format4dpNumber(amount)}</span>
          </b>
        </div>

        <div className='summary__content'>
          <p>{formatString(commissionFor)}</p>
          <b>
            <NairaIcon className='summary__content--icon' />
            <span>{format4dpNumber(charges)}</span>
            {Boolean(percentage) && (
              <span className='summary__content--percentage'>
                ({Number(percentage)}% of amount to be withdrawn)
              </span>
            )}
          </b>
        </div>

        {Boolean(penalty) && (
          <div className='summary__content'>
            <p>Penalty Fee</p>
            <b>
              <NairaIcon className='summary__content--icon' />
              <span>{format4dpNumber(penalty)}</span>
            </b>
          </div>
        )}

        <div className='summary__content'>
          <p>Total Amount</p>
          <b>
            <NairaIcon className='summary__content--icon' />
            <span>{Number(amount) + charges}</span>
          </b>
        </div>
      </div>

      <div className='ft'>
        <Button
          bg='white'
          color='#059157'
          border='#059157'
          fontSize='16px'
          className='me-4'
          onClick={() => closeModal()}
        >
          Cancel
        </Button>
        <Button fontSize='16px' className='me-4' onClick={() => modalConfirm()}>
          {withdrawLoading ? <LoadingButton /> : 'Proceed'}
        </Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  /* width: 100%; */
  // height: 100%;
  color: #33277b !important;
  // font-size: 16px;

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 2rem;
  }
  .summary {
    border: 1px solid #cccccc;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;

    &__content {
      padding: 1rem 0;
      width: 90%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      p {
        padding: 0 !important;
        margin: 0 !important;
      }

      &:not(:last-child) {
        border-bottom: 1px solid #cccccc;
      }

      &--icon {
        height: 1rem;
      }

      b {
        text-align: right;
      }
      &--percentage {
        display: block;
        font-size: 0.65rem;
        color: #909090;
      }
    }
  }

  .ft {
    margin-top: 2rem;
    margin-left: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export default ConfirmWithdrawalSubmit;
