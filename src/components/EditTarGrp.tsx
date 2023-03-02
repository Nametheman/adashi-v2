import { DatePicker, Skeleton, message } from 'antd';
import moment from 'moment';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { ReactComponent as BackIcon } from '../assets/icons/back.svg';
import { userData } from '../helpers/authHelper';
import { formatNumber } from '../helpers/formatNumbers';
import { cardList } from '../helpers/otherHelpers';
import {
  useDeleteTargetGroupMutation,
  useEditTargetGroupMutation,
  useGetTarGroupQuery,
} from '../redux/services/saving-service';
import { useGetCardDataQuery } from '../redux/services/transaction-service';
import { targetGroupSavings } from '../utils/routes';

import ConfirmDelete from './ConfirmDelete';
import FormSubmit from './FormSubmit';
import Button from './bits/Button';
import Input from './bits/InputText';
import LoadingButton from './bits/LoadingButton';
import ModalA from './bits/ModalA';
import NewSelect from './bits/NewSelect';
import NoData from './bits/NoData';
import { Label } from './bits/Text';

export type EditGrpProps = {
  groupName: string;
  endDate: moment.Moment | null;
  endDateString: string;
  amount: number;
  target: number;
  frequencyName: string;
  frequencyValue: string;
  automatedName: string;
  automatedValue: string;
  lockStatus?: string;
  cardId: string;
  cardName: string;
  savingsType?: string;
};

const EditCoopGrp = () => {
  let params = useParams();
  const planId: string = params.planId || '';
  const navigate = useNavigate();
  const {
    data: planData,
    isLoading: planIsLoading,
    refetch: planRefetch,
  }: any = useGetTarGroupQuery(planId);
  const { data: cardData, refetch: cardRefetch }: any = useGetCardDataQuery();
  const [deleteTargetGroup] = useDeleteTargetGroupMutation();
  const [editTargetGroup] = useEditTargetGroupMutation();
  const [delLoading, setDelLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [currentModal, setCurrentModal] = useState<Number>(0);

  // only thing to edit should be the user's card details, i.e. this should only accept payment_auth

  const [formData, setFormData] = useState<EditGrpProps>({
    groupName: '',
    // savingsType: "",
    endDate: null,
    endDateString: '',
    amount: 0,
    target: 0,
    frequencyName: '',
    frequencyValue: '',
    automatedName: '',
    automatedValue: '',
    cardId: '',
    cardName: '',
  });

  const populateState = (updatedData: any) => {
    setFormData(currData => {
      return {
        ...currData,
        groupName: updatedData.name,
        // savingsType: "",
        endDate: moment(updatedData.end_date),
        endDateString: updatedData.end_date,
        amount: 0,
        target: parseFloat(updatedData.target_amount),
        frequencyName: 'null',
        frequencyValue: 'null',
        automatedName: updatedData.status,
        automatedValue: updatedData?.status,
        // cardId: updatedData.payment_gateway_id,
      };
    });
    updatedData?.target_group_saving_participants.forEach((element: any) => {
      element.participant_email === userData().email &&
        setFormData(currData => {
          return {
            ...currData,
            cardId: element.payment_gateway_id,
            cardName: `****${element.payment_gateway?.last4}`,
            amount: parseFloat(element.amount),
            frequencyName: element.plan,
            frequencyValue: element.plan,
          };
        });
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
      const res: any = await editTargetGroup({
        planId: planId,
        payment_auth: formData.cardId,
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
    try {
      setDelLoading(true);
      const res: any = await deleteTargetGroup(planId);
      if (res?.data?.status === 'success') {
        setDelLoading(false);
        message.success(res.data.message);
        setCurrentModal(3);
      } else if (res.error) {
        setDelLoading(false);
        message.error(res.error?.data?.message);
      } else {
        setDelLoading(false);
        message.error(res.data.message);
      }
    } catch (error: any) {
      setDelLoading(false);
      message.error(error?.data?.message);
    }
  };

  return (
    <>
      <Wrapper>
        <div className='container'>
          <h2 style={{ fontWeight: '600', color: '#33277b' }}>
            Edit Target Group
          </h2>
          <hr className='line' />
          <Link
            to={`../${targetGroupSavings}`}
            style={{ textDecoration: 'none' }}
            className='back'
          >
            <BackIcon />
            <p>Back</p>
          </Link>

          {planIsLoading ? (
            <Skeleton active />
          ) : planData ? (
            <form className='form-container mx-auto' onSubmit={submitHandler}>
              <div className='form-body col-md-10'>
                <div className='invite'>
                  <Label color='#33277B'>Plan Name</Label>
                  <Input
                    type='text'
                    placeholder='Enter plan name'
                    name='planName'
                    onChange={handleFormChange}
                    value={formData.groupName}
                    required
                    disabled
                    className='caps'
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
                      formData.target > 0 ? formatNumber(formData.target) : ''
                    }
                    required
                    disabled
                  />
                </div>

                <div className='invite'>
                  <Label color='#33277B'>Savings Frequency</Label>
                  <NewSelect
                    placeholder='Frequency'
                    // name="frequencyValue"
                    className='caps'
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
                    disabled
                  />
                </div>
                <div className='invite'>
                  <Label color='#33277B'>Automation Status</Label>
                  <NewSelect
                    placeholder='Automation'
                    // name="automated"
                    className='caps'
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
                    disabled
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
                    type='text'
                    name='amount'
                    placeholder='Amount to save'
                    onChange={handleFormChange}
                    min={500}
                    value={
                      formData.amount > 0 ? formatNumber(formData.amount) : ''
                    }
                    required
                    disabled
                  />
                </div>

                <div className='mb-2'>
                  <Label color='#33277B'>Debit Card</Label>
                  <NewSelect
                    placeholder='Debit Card'
                    name='cardId'
                    fullWidth
                    options={cardData ? cardList(cardData) : []}
                    onChange={handleFormChange}
                    selected={{
                      name: formData.cardName,
                      value: formData.cardId,
                    }}
                    required
                  />
                </div>
              </div>

              <div className='ft'>
                {planData?.owner_id === userData().id && (
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
                )}

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
          <FormSubmit
            onConfirm={() => navigate(`../${targetGroupSavings}`)}
            edit={true}
          />
        </ModalA>
      )}
      {currentModal === 3 && (
        <ModalA isShown={true} hide={() => {}}>
          <FormSubmit
            onConfirm={() => navigate(`../${targetGroupSavings}`)}
            del={true}
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

    .form-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      // width: 100%;
      margin-top: 3rem;

      .form-body {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        // width: 80%;
        .invite {
          display: flex;
          flex-direction: column;
          width: 47%;
          margin-bottom: 2rem;
        }
        .caps {
          text-transform: capitalize;
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

export default EditCoopGrp;
