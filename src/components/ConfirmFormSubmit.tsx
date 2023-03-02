import React from 'react';
import styled from 'styled-components';

import { ReactComponent as CloseIcon } from '../assets/icons/close-icon.svg';

import Button from './bits/Button';

interface ConfirmProps {
  endDateString: string;
  closeModal: Function;
  confirm?: Function;
  review?: Function;
}

const ConfirmFormSubmit = (props: ConfirmProps) => {
  const { endDateString, closeModal, confirm, review } = props;
  const modalConfirm = () => {
    // optional to prevent it from going next, beyond the bounds of the steps
    confirm && confirm();
    closeModal();
  };

  const modalReview = () => {
    // optional for the form element
    review && review();
    closeModal();
  };

  return (
    <Wrapper>
      <div className='header'>
        <h5 style={{ color: '#33277b', marginInlineEnd: '1rem' }}>
          <b>Please Confirm</b>
        </h5>
        <CloseIcon onClick={() => closeModal()} style={{ cursor: 'pointer' }} />
      </div>
      {endDateString.length > 0 ? (
        <div>
          Withdrawals can only be done on your chosen maturity date{'  '}
          <b>{endDateString}</b>
        </div>
      ) : (
        <div>Please set your maturity date</div>
      )}

      <div className='ft'>
        <Button fontSize='16px' className='me-4' onClick={() => modalReview()}>
          Review Date
        </Button>

        {endDateString.length > 0 && (
          <Button fontSize='16px' onClick={() => modalConfirm()}>
            Confirm Date
          </Button>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  // width: 100%
  // height: 100%;
  color: #33277b !important;
  // font-size: 16px;

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 2rem;
  }

  .ft {
    margin-top: 2rem;
    margin-left: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export default ConfirmFormSubmit;
