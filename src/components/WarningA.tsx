import React from 'react';
import styled from 'styled-components';

import { ReactComponent as CloseIcon } from '../assets/icons/close-icon.svg';
import { ReactComponent as WarningIcon } from '../assets/icons/warning-icon.svg';
import { logoutUser, userData } from '../helpers/authHelper';

import Button from './bits/Button';
import { Heading5 } from './bits/Text';

interface WarningProps {
  closeModal: Function;
  confirm: Function;
  // warningText: React.ReactNode;
  warningTitle: string;
  confirmText: string;
}

const WarningA = (props: WarningProps) => {
  const [counter, setCounter] = React.useState<any>('00:00');

  let intervalRef = React.useRef<any>(null);

  function getRemainingTime(endTime: any) {
    const total = Date.parse(endTime) - Date.parse(`${new Date()}`);
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return { total, seconds, minutes };
  }

  function startCountdown(deadline: any) {
    let { total, seconds, minutes } = getRemainingTime(deadline);
    if (total >= 0) {
      setCounter(
        (minutes > 9 ? minutes : `0${minutes}`) +
          ':' +
          (seconds > 9 ? seconds : `0${seconds}`)
      );
    } else {
      clearInterval(intervalRef.current);
      logoutUser();
    }
  }

  function clearSeconds(endTime: any) {
    setCounter('00:60');
    if (intervalRef.current) clearInterval(intervalRef.current);
    const id = setInterval(() => {
      startCountdown(endTime);
    }, 1000);
    intervalRef.current = id;
  }

  function getDeadLine() {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 60);
    return deadline;
  }

  const resetSeconds = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCounter(getDeadLine());
  };

  React.useEffect(() => {
    resetSeconds();
    clearSeconds(getDeadLine());

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    //eslint-disable-next-line
  }, []);

  const { closeModal, confirm, warningTitle, confirmText } = props;
  const modalConfirm = () => {
    confirm();
    // closeModal();
  };

  return (
    <Wrapper>
      <div className='header'>
        <Heading5 mb={'0'} style={{ marginInlineEnd: '1rem' }}>
          <WarningIcon className='me-2' />
          {warningTitle}
        </Heading5>
        {/* <h5 style={{ color: "#33277b", marginInlineEnd: "1rem" }}>
          <b>{warningTitle}</b>
        </h5> */}
        <CloseIcon onClick={() => closeModal()} style={{ cursor: 'pointer' }} />
      </div>
      <div>
        <p>
          Dear {`${userData().last_name} ${userData().name}`},{' '}
          <b>YOU ARE INACTIVE</b>
        </p>
        <p>
          You will be logged out in <b>{counter}</b> seconds!
        </p>
      </div>
      <div className='ft'>
        <Button
          bg='white'
          color='#059157'
          border='#059157'
          fontSize='16px'
          className='me-4'
          onClick={() => modalConfirm()}
        >
          {confirmText}
        </Button>
        <Button fontSize='16px' className='me-4' onClick={() => closeModal()}>
          Cancel
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

export default WarningA;
