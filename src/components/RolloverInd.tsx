import { DatePicker, message } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ReactComponent as CloseIcon } from '../assets/icons/close-icon.svg';
import { useRolloverIndPlanMutation } from '../redux/services/saving-service';

import Button from './bits/Button';
import Input from './bits/InputText';
import LoadingButton from './bits/LoadingButton';
import { Label } from './bits/Text';

interface RolloverProps {
  closeModal: Function;
  setCurrentModal: Function;
  startDate: string;
  planId: string;
  pageUp: string;
}

const Rollover = (props: RolloverProps) => {
  const { closeModal, setCurrentModal, startDate, planId, pageUp } = props;
  const [rolloverIndPlan] = useRolloverIndPlanMutation();
  const [editLoading, setEditLoading] = useState(false);
  const [newDate, setNewDate] = useState({
    endDate: null,
    endDateString: '',
  });

  const handleEndDateChange = (date: any, dateString: any) => {
    setNewDate({
      ...newDate,
      endDate: date,
      endDateString: dateString,
    });
  };

  const navigate = useNavigate();

  // accepts the start date and returns a boolean checking if the date is less than the start date
  const blockTillStartDate = (currDate: moment.Moment) => {
    return (startDate && currDate.diff(startDate) < 1) as boolean;
  };

  // accepts the current date and returns a boolean if the date is less than the current date
  const blockTodaysDate = (currDate: moment.Moment) => {
    return currDate && currDate < moment().endOf('day');
  };

  const blockTodayAndStartDate = (currDate: moment.Moment) => {
    return (blockTodaysDate(currDate) ||
      blockTillStartDate(currDate)) as boolean;
  };

  const rollOver = async (): Promise<void> => {
    try {
      setEditLoading(true);
      const res: any = await rolloverIndPlan({
        saving_cycle_id: planId,
        end_date: moment(newDate.endDate).format('YYYY-MM-DD'),
      });
      if (res?.data?.status === 'success') {
        setEditLoading(false);
        message.success('Plan rolled over successfully.');
        setCurrentModal(0);
        navigate(`../${pageUp}`);
      } else if (res.error) {
        message.error(res.error?.data?.message);
        setEditLoading(false);
      } else {
        message.error(res.data.message);
        setEditLoading(false);
      }
    } catch (error: any) {
      setEditLoading(false);
      message.error(error?.data?.message);
    }
  };

  return (
    <Wrapper>
      <div className='header'>
        <h5 style={{ color: '#33277b' }}>
          <b>Set your duration</b>
        </h5>
        <CloseIcon onClick={() => closeModal()} style={{ cursor: 'pointer' }} />
      </div>
      <div className='mb-4'>
        <Label color='#33277B'>Start Date</Label>
        <Input
          type='text'
          placeholder='Start Date'
          name='targetAmt'
          value={startDate}
          disabled
        />
      </div>
      <div className='step-div'>
        <Label color='#33277B'>Maturity Date</Label>
        <DatePicker
          onChange={handleEndDateChange}
          className='col-12 date-picker'
          placeholder='End Date'
          format={'MMM DD, YYYY'}
          value={newDate.endDate}
          disabledDate={blockTodayAndStartDate}
        />
      </div>
      <div className='sec-btn'>
        <Button
          style={{ minWidth: '150px', fontSize: '16px' }}
          onClick={() => rollOver()}
        >
          {editLoading ? <LoadingButton /> : 'Proceed'}
        </Button>
      </div>
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

  .line {
    border: 1px solid rgba(0, 0, 0, 0.4);
  }

  .step-div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 2rem;
  }

  .date-picker {
    // font-size: 16px;
    //   line-height: 17px;
    color: #7b7b7b;
    padding: 1rem;
    padding-left: 2rem;
    border-radius: 1rem;
    border: 1px solid #bec6df;
  }

  .sec-btn {
    // display: flex;
    // flex-direction: row;
    // justify-content: space-between;
    margin-left: auto;
    margin-bottom: 1rem;
  }
`;

export default Rollover;
