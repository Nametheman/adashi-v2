import React from 'react';
import styled from 'styled-components';

// import { ReactComponent as CloseIcon } from '../assets/icons/close-icon.svg';
// import { ReactComponent as WarningIcon } from '../assets/icons/warning-icon.svg';

import { ReactComponent as CongratulationsIcon } from '../assets/icons/congratulations-icon.svg';

import Button from './bits/Button';
import { Heading5 } from './bits/Text';

interface WarningProps {
  closeModal: Function;
  // confirm: Function;
  warningText: React.ReactNode;
  warningTitle: string;
  confirmText: string;
}

const SuccessWithdrawal = (props: WarningProps) => {
  const { closeModal, warningTitle, warningText, confirmText } = props;
  // const modalConfirm = () => {
  //   confirm();
  //   // closeModal();
  // };

  return (
    <Wrapper>
      <div className='header'>
        <Heading5 style={{ marginInlineEnd: '1rem', marginBottom: '0px' }}>
          <CongratulationsIcon className='me-2' />
          {warningTitle}
        </Heading5>
        {/* <h5 style={{ color: "#33277b", marginInlineEnd: "1rem" }}>
          <b>{warningTitle}</b>
        </h5> */}
        {/* <CloseIcon onClick={() => closeModal()} style={{ cursor: 'pointer' }} /> */}
      </div>
      {warningText}
      <div className='ft'>
        {/* <Button
          bg='white'
          color='#33277b'
          border='#33277b'
          fontSize='16px'
          className='me-4'
          onClick={() => modalConfirm()}
        >
          {confirmText}
        </Button> */}
        <Button
          bg='#33277b'
          fontSize='16px'
          className='me-4'
          onClick={() => closeModal()}
        >
          {confirmText}
        </Button>
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

export default SuccessWithdrawal;
