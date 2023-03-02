import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

import { ReactComponent as CloseIcon } from '../assets/icons/close-icon.svg';
import {
  DAYS_OF_MONTH,
  DAYS_OF_WEEK_OPTIONS,
  HOUR_OF_DAY_OPTIONS,
} from '../helpers/otherHelpers';

import Button from './bits/Button';
import Input from './bits/InputText';
import LoadingButton from './bits/LoadingButton';
import Select from './bits/Select';
import { Label } from './bits/Text';

interface SetPersonalFreqProps {
  closeModal: Function;
  updFreq: Function;
  updHour: Function;
  updWeekday: Function;
  updMonthday: Function;
  updAmt: Function;
  freqValue: string;
  amt: number;
  joinGroup: Function;
  isLoading: boolean;
}

const SetPersonalFreq = (props: SetPersonalFreqProps) => {
  const {
    closeModal,
    updFreq,
    updAmt,
    freqValue,
    amt,
    updHour,
    updWeekday,
    updMonthday,
    joinGroup,
    isLoading,
  } = props;
  //   const modalConfirm = () => {
  //     confirm();
  //     closeModal();
  //   };

  const submitHandler = (e: any) => {
    e.preventDefault();
    joinGroup();
  };

  return (
    <Wrapper>
      <div className='header'>
        <h5 style={{ color: '#33277b', marginInlineEnd: '1rem' }}>
          <b>Set Your Personal Frequency</b>
        </h5>
        <CloseIcon onClick={() => closeModal()} style={{ cursor: 'pointer' }} />
      </div>

      <form onSubmit={submitHandler} className='form'>
        <div className='step-div'>
          <Label color='#33277B'>How often would you like to save?</Label>
          <Select
            placeholder='Frequency'
            // name="frequency"
            fullWidth
            options={[
              { name: 'Daily', value: 'daily' },
              { name: 'Weekly', value: 'weekly' },
              { name: 'Monthly', value: 'monthly' },
              { name: 'Flexible', value: 'flexible' },
            ]}
            onChange={(e: HTMLInputElement) => updFreq(e)}
            required
          />

          {freqValue === 'monthly' && (
            <Select
              placeholder='Choose day of the month'
              fullWidth
              options={DAYS_OF_MONTH}
              onChange={(e: HTMLInputElement) => updMonthday(e)}
              required
            />
          )}

          {freqValue === 'weekly' && (
            <Select
              placeholder='Choose day of the week'
              fullWidth
              options={DAYS_OF_WEEK_OPTIONS}
              onChange={(e: HTMLInputElement) => updWeekday(e)}
              required
            />
          )}
          {freqValue !== 'flexible' && (
            <Select
              placeholder='Choose hour of the day'
              fullWidth
              options={HOUR_OF_DAY_OPTIONS}
              onChange={(e: HTMLInputElement) => updHour(e)}
              required
            />
          )}
        </div>

        <div className='step-div'>
          <Label color='#33277B'>
            {freqValue === 'flexible'
              ? 'How much would you like to start with?'
              : `Amount to be paid ${freqValue ? freqValue : 'regularly'}`}
            {/* Amount to be paid {freqValue ? freqValue : "regularly"} */}
          </Label>
          <Input
            type='number'
            name='amount'
            value={amt > 0 ? amt : ''}
            disabled={freqValue !== 'flexible'}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updAmt(e)}
            min={freqValue === 'flexible' ? 500 : 0}
          />
          {freqValue === 'flexible' && (
            <p className='mt-2'>It should be a minimum of &#8358;500.</p>
          )}
        </div>

        <div className='ft'>
          <Button
            style={{ marginRight: '1rem', minWidth: '150px', fontSize: '16px' }}
            type='submit'
          >
            {isLoading ? <LoadingButton /> : 'Join Group'}
          </Button>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  //   justify-content: center;
  //   width: 80%;
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

  .card-main {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  //   .step-div {
  //     display: flex;
  //     flex-direction: column;
  //     justify-content: space-between;
  //     margin-bottom: 4rem;
  //   }

  .ft {
    margin-top: 2rem;
    margin-left: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export default SetPersonalFreq;
