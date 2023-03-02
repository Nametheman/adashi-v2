import { DatePicker, Skeleton, message } from 'antd';
import moment from 'moment';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { ReactComponent as BackIcon } from '../assets/icons/back.svg';
import {
  DAYS_OF_MONTH,
  DAYS_OF_WEEK_OPTIONS,
  HOUR_OF_DAY_OPTIONS,
  cardList,
} from '../helpers/otherHelpers';
import {
  useDeleteIndPlanMutation,
  useEditIndPlanMutation,
  useGetIndSavingsQuery,
} from '../redux/services/saving-service';
import { useGetCardDataQuery } from '../redux/services/transaction-service';
import { individualSavings } from '../utils/routes';

import ConfirmDelete from './ConfirmDelete';
import FormSubmit from './FormSubmit';
import Button from './bits/Button';
import Input from './bits/InputText';
import LoadingButton from './bits/LoadingButton';
import ModalA from './bits/ModalA';
import NewSelect from './bits/NewSelect';
import NoData from './bits/NoData';
import Select from './bits/Select';
import { Label } from './bits/Text';

export type EditPlanProps = {
  planName: string;
  endDate: moment.Moment | null;
  endDateString: string;
  amount: number;
  target: number;
  hourOfDay: number;
  dayOfWeek: number;
  dayOfMonth: number;
  frequencyName: string;
  frequencyValue: string;
  automatedName: string;
  automatedValue: string;
  rate?: number;
  lockStatus?: string;
  cardId: string;
  savingsType?: string;
};

const EditPlan = () => {
  let params = useParams();
  const planId: string = params.planId || '';
  const navigate = useNavigate();
  const {
    data: planData,
    isLoading: planIsLoading,
    refetch: planRefetch,
  }: any = useGetIndSavingsQuery(planId);
  const { data: cardData, refetch: cardRefetch }: any = useGetCardDataQuery();
  const [deleteIndPlan] = useDeleteIndPlanMutation();
  const [editIndPlan] = useEditIndPlanMutation();
  const [delLoading, setDelLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [currentModal, setCurrentModal] = useState<Number>(0);

  let currentBal = 0;
  planData.saving_cycle_histories.forEach((saving: any) => {
    currentBal += Number(saving.amount);
  });

  const [formData, setFormData] = useState<EditPlanProps>({
    planName: '',
    // savingsType: "",
    endDate: null,
    endDateString: '',
    amount: 0,
    target: 0,
    frequencyName: '',
    frequencyValue: '',
    hourOfDay: 0,
    dayOfWeek: 0,
    dayOfMonth: 0,
    automatedName: '',
    automatedValue: '',
    cardId: '',
  });

  const populateState = (updatedData: any) => {
    setFormData({
      ...formData,
      planName: updatedData.name,
      // savingsType: "",
      endDate: moment(updatedData.end_date),
      endDateString: updatedData.end_date,
      amount: parseFloat(updatedData.amount),
      target: parseFloat(updatedData.target_amount),
      frequencyName:
        updatedData.plan[0].toUpperCase() + updatedData.plan.slice(1),
      frequencyValue: updatedData.plan,
      hourOfDay: updatedData.hour_of_day,
      dayOfWeek: updatedData.day_of_week,
      dayOfMonth: updatedData.day_of_month,
      automatedName:
        updatedData.status[0].toUpperCase() + updatedData.status.slice(1),
      automatedValue: updatedData.status,
      cardId: updatedData.payment_gateway_id,
    });
  };

  useEffect(() => {
    planData && populateState(planData);
    planRefetch();
    cardRefetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planData]);
  // added planData as a dependency because on initial loading it is undefined, when it changes to a value, then you want to populate it

  const blockTodaysDate = (currDate: moment.Moment) => {
    return currDate && currDate < moment().endOf('day');
  };

  const handleFormChange = (e: ChangeEvent<any>): any => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEndDateChange = (date: any, dateString: any) => {
    setFormData({
      ...formData,
      endDate: date,
      endDateString: dateString,
    });
  };

  const handleFrequencyChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      frequencyName: name,
      frequencyValue: value,
    });
  };

  const handleHourChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      hourOfDay: parseInt(value),
    });
  };

  const handleMonthDayChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      dayOfMonth: parseInt(value),
    });
  };

  const handleWeekdayChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      dayOfWeek: parseInt(value),
    });
  };

  const handleAutomationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      automatedName: name,
      automatedValue: value,
    });
  };

  const submitHandler = async (e: any): Promise<void> => {
    e.preventDefault();
    try {
      setEditLoading(true);
      const res: any = await editIndPlan({
        saving_cycle_id: planId,
        status: formData.automatedValue,
        name: formData.planName,
        amount: formData.amount,
        target_amount: formData.target,
        plan: formData.frequencyValue,
        day_of_month: formData.dayOfMonth,
        day_of_week: formData.dayOfWeek,
        hour_of_day: formData.hourOfDay,
        payment_auth: formData.cardId,
        end_date: moment(formData.endDate).format('YYYY-MM-DD'),
      });
      if (res?.data?.status === 'success') {
        setEditLoading(false);
        message.success(res.data.message);
        setCurrentModal(2);
      } else if (res.error) {
        setEditLoading(false);
        message.error(res.error?.data?.message);
      } else {
        setEditLoading(false);
        message.error(res.data.message);
      }
    } catch (error: any) {
      setEditLoading(false);
      message.error(error?.data?.message);
    }
  };

  const submitDelete = async (): Promise<void> => {
    if (currentBal === 0) {
      try {
        setDelLoading(true);
        const res: any = await deleteIndPlan(planId);
        if (res?.data?.status === 'success') {
          setDelLoading(false);
          message.success(res.data.message);
          setCurrentModal(3);
        } else if (res.error) {
          setDelLoading(false);
          message.error(res.error?.data?.message);
          setCurrentModal(0);
        } else {
          setDelLoading(false);
          message.error(res.data.message);
          setCurrentModal(0);
        }
      } catch (error: any) {
        setDelLoading(false);
        message.error(error?.data?.message);
        setCurrentModal(0);
      }
    } else {
      message.error(
        'You can only delete a plan when all funds have been withdrawn.'
      );
      setCurrentModal(0);
    }
  };

  return (
    <>
      <Wrapper>
        <div className='container'>
          <h2 style={{ fontWeight: '600', color: '#33277b' }}>Edit Plan</h2>
          <hr className='line' />
          <Link
            to={`../${individualSavings}`}
            style={{ textDecoration: 'none' }}
            className='back'
          >
            <BackIcon />
            <p>Back</p>
          </Link>

          {planIsLoading ? (
            <Skeleton active />
          ) : planData ? (
            <form
              className='form-container col-md-10 mx-auto'
              onSubmit={submitHandler}
            >
              <div className='form-body'>
                <div className='invite'>
                  <Label color='#33277B'>Plan Name</Label>
                  <Input
                    type='text'
                    placeholder='Enter plan name'
                    name='planName'
                    onChange={handleFormChange}
                    value={formData.planName}
                    required
                    disabled
                  />
                </div>

                <div className='invite'>
                  <Label color='#33277B'>My Target</Label>
                  <Input
                    type='text'
                    placeholder='Enter target amount'
                    name='target'
                    onChange={handleFormChange}
                    value={
                      formData.target && formData.target > 0
                        ? formData.target
                        : ''
                    }
                    required
                    disabled
                  />
                </div>
                <div className='invite'>
                  <Label color='#33277B'>Frequency</Label>
                  <NewSelect
                    placeholder='Frequency'
                    fullWidth
                    options={[
                      { name: 'Daily', value: 'daily' },
                      { name: 'Weekly', value: 'weekly' },
                      { name: 'Monthly', value: 'monthly' },
                      { name: 'Flexible', value: 'flexible' },
                    ]}
                    selected={{
                      name: formData.frequencyName,
                      value: formData.frequencyValue,
                    }}
                    onChange={handleFrequencyChange}
                    required
                  />
                  {formData.frequencyValue === 'monthly' && (
                    <Select
                      placeholder='Choose day of the month'
                      fullWidth
                      options={DAYS_OF_MONTH}
                      onChange={handleMonthDayChange}
                      required
                    />
                  )}

                  {formData.frequencyValue === 'weekly' && (
                    <Select
                      placeholder='Choose day of the week'
                      fullWidth
                      options={DAYS_OF_WEEK_OPTIONS}
                      onChange={handleWeekdayChange}
                      required
                    />
                  )}

                  {formData.frequencyValue !== 'flexible' && (
                    <Select
                      placeholder='Choose hour of the day'
                      fullWidth
                      options={HOUR_OF_DAY_OPTIONS}
                      onChange={handleHourChange}
                      required={true}
                    />
                  )}
                </div>
                <div className='invite'>
                  <Label color='#33277B'>Automation Status</Label>
                  <NewSelect
                    placeholder='Automation'
                    // name="automated"
                    fullWidth
                    options={[
                      { name: 'Active', value: 'active' },
                      { name: 'Paused', value: 'paused' },
                    ]}
                    selected={{
                      name: formData.automatedName,
                      value: formData.automatedValue,
                    }}
                    onChange={handleAutomationChange}
                    required
                  />
                </div>
                <div className='invite'>
                  <Label color='#33277B'>End Date</Label>
                  <DatePicker
                    onChange={handleEndDateChange}
                    className='col-md-10 col-lg-8 date-picker'
                    placeholder='End Date'
                    format={'MMM DD, YYYY'}
                    value={formData.endDate}
                    disabledDate={blockTodaysDate}
                    disabled
                  />
                </div>

                <div className='invite'>
                  <Label color='#33277B'>Periodic Amount</Label>
                  <Input
                    type='number'
                    name='amount'
                    placeholder='Amount to save'
                    onChange={handleFormChange}
                    min={500}
                    value={
                      formData.amount && formData.amount > 0
                        ? formData.amount
                        : ''
                    }
                    required
                    disabled
                  />
                </div>

                <div className='mb-2'>
                  <Label color='#33277B'>Debit Card</Label>
                  <Select
                    placeholder='Debit Card'
                    name='cardId'
                    fullWidth
                    options={cardData ? cardList(cardData) : []}
                    onChange={handleFormChange}
                    required
                  />
                </div>
              </div>

              <div className='ft'>
                <Button
                  bg='white'
                  color='#EA0505'
                  border='#EA0505'
                  fontSize='16px'
                  className='me-4'
                  type='button'
                  onClick={() => setCurrentModal(1)}
                >
                  {delLoading ? <LoadingButton /> : 'Delete Plan'}
                </Button>

                <Button
                  style={{ minWidth: '150px', fontSize: '16px' }}
                  type='submit'
                >
                  {editLoading ? <LoadingButton /> : 'Save Changes'}
                </Button>
              </div>
            </form>
          ) : (
            <div className='mt-4 pt-4'>
              <NoData text='Please check your internet connection or reload the page.' />
            </div>
          )}
        </div>
      </Wrapper>
      {currentModal === 1 && (
        <ModalA isShown={true} hide={() => {}}>
          <ConfirmDelete func={setCurrentModal} submitDelete={submitDelete} />
        </ModalA>
      )}
      {currentModal === 2 && (
        <ModalA isShown={true} hide={() => {}}>
          {/* <FormSubmit pageUp={individualSavings} edit={true} /> */}
          <FormSubmit
            edit={true}
            onConfirm={() => navigate(`../${individualSavings}`)}
          />
        </ModalA>
      )}
      {currentModal === 3 && (
        <ModalA isShown={true} hide={() => {}}>
          {/* <FormSubmit pageUp={individualSavings} del={true} /> */}
          <FormSubmit
            del={true}
            onConfirm={() => navigate(`../${individualSavings}`)}
          />
        </ModalA>
      )}
    </>
  );
};

const Wrapper = styled.div`
  .container {
    padding: 2rem;
    color: #33277b;
    // display: flex;
    // flex-direction: column;
    // // flex-wrap: wrap;
    // // justify-content: flex-start;
    // // font-size: 16px;

    .line {
      border: 1px solid rgba(0, 0, 0, 0.4);
    }

    .back {
      display: flex;
      color: #33277b;
      align-items: center;
      p {
        margin: 0 0 0 1rem;
      }
      margin: 1rem 0;
    }

    .form-container {s
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      // width: 100%;
      margin-top: 3rem;

      .form-body {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        width: 80%;
        .invite {
          display: flex;
          flex-direction: column;
          width: 47%;
          margin-bottom: 2rem;
        }
      }
      .button {
        display: flex;
        justify-content: flex-end;
        margin: 3rem 0;
      }
    }

    .ft {
        margin-top: 2rem;
        // margin-left: auto;
        display: flex;
        flex-direction: row;
        // justify-content: space-between;
      }
  }

  @media screen and (max-width: 500px) {
    display: flex;
    flex-direction: column;
    // flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    .form-container {
      margin-top: 0rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding: 0;

      .form-body {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 0;
        .invite {
          width: 100% !important;
        }
      }
    }
  }
`;

export default EditPlan;
