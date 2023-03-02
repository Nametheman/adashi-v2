import { message } from 'antd';
import moment from 'moment';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { format4dpNumber } from '../helpers/formatNumbers';
import { GroupMiscTypes } from '../pages/authPages/Settings';
import { useSetTargetGroupFreqMutation } from '../redux/services/saving-service';
import { user } from '../utils/routes';

import ConfirmDelete from './ConfirmDelete';
import FinalTarGrpFormPage from './FinalTarGrpFormPage';
import FormSubmit from './FormSubmit';
import MyCards from './MyCards';
import SetPersonalFreq from './SetPersonalFreq';
import SwitchCard from './SwitchCard';
import Button from './bits/Button';
import Input from './bits/InputText';
import LoadingButton from './bits/LoadingButton';
import ModalA from './bits/ModalA';
import { Heading4, Label } from './bits/Text';

type GrpInviteFormProps = {
  groupItem: any;
  groupMisc: GroupMiscTypes;
};

const TarGrpInviteForm = (props: GrpInviteFormProps) => {
  const { groupItem, groupMisc } = props;
  const [currentModal, setCurrentModal] = useState<Number>(0);
  const [page, setPage] = useState(1);
  const [setTargetGroupFreq] = useSetTargetGroupFreqMutation();
  const [declineLoading, setDeclineLoading] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);
  const navigate = useNavigate();

  const [grpFormData, setGrpFormData] = useState({
    groupName: groupItem?.name,
    groupLeader: 'Owner Name',
    // groupDescription: "",
    groupId: groupItem?.id,
    amount: 0,
    memberNo: groupItem?.no_of_participants,
    // memberEmail: "",
    // automated: "",
    startDate: moment(groupItem?.start_date),
    startDateString: moment(groupItem?.start_date).format('MMM DD, YYYY'),
    endDate: moment(groupItem?.end_date),
    endDateString: moment(groupItem?.end_date).format('MMM DD, YYYY'),
    target: parseFloat(groupItem?.target_amount),
    frequencyName: 'Flexible',
    frequencyValue: 'flexible',
    hourOfDay: 0,
    dayOfWeek: 0,
    dayOfMonth: 0,
    lockStatus: 'Locked',
    cardId: '',
    payoutOrder: 0,
  });

  const submitHandler = async (e: React.ChangeEvent<any>): Promise<void> => {
    e.preventDefault();
    setPage(2);
    // await console.log(e);
  };

  useEffect(() => {
    const calcAmountPaid = () => {
      let difference = moment
        .duration(grpFormData.endDate?.diff(grpFormData.startDate))
        .asDays();

      if (grpFormData.frequencyValue === 'weekly') {
        difference = moment
          .duration(grpFormData.endDate?.diff(grpFormData.startDate))
          .asWeeks();
      } else if (grpFormData.frequencyValue === 'monthly') {
        difference = grpFormData.endDate?.diff(
          grpFormData.startDate,
          'months',
          true
        ) as number;
      }

      let finalValue: number = 0;

      if (grpFormData.target) {
        finalValue = grpFormData.target / Math.ceil(difference);
      }

      return Math.ceil(finalValue);
    };

    if (
      grpFormData.frequencyValue !== 'flexible' &&
      grpFormData.startDate &&
      grpFormData.endDate
    ) {
      const routineAmt = calcAmountPaid();
      setGrpFormData(currData => {
        return {
          ...currData,
          amount: routineAmt,
        };
      });
    }
  }, [
    grpFormData.endDate,
    grpFormData.frequencyValue,
    grpFormData.startDate,
    grpFormData.target,
  ]);
  const handleGrpFormDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGrpFormData({
      ...grpFormData,
      [name]: value,
    });
  };

  const handleFrequencyChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGrpFormData({
      ...grpFormData,
      frequencyName: name,
      frequencyValue: value,
    });
  };

  const handleHourChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGrpFormData({
      ...grpFormData,
      hourOfDay: parseInt(value),
    });
  };

  const handleMonthDayChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGrpFormData({
      ...grpFormData,
      dayOfMonth: parseInt(value),
    });
  };

  const handleWeekdayChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGrpFormData({
      ...grpFormData,
      dayOfWeek: parseInt(value),
    });
  };

  // need the plan and others to be optional for declining
  const declineTargetGroup = async (): Promise<void> => {
    try {
      setDeclineLoading(true);
      const res: any = await setTargetGroupFreq({
        status: false,
        target_group_saving_id: groupItem.id,
      });
      if (res?.data?.status === 'success') {
        message.success(res.data?.message);
        setDeclineLoading(false);
        setCurrentModal(0);
        navigate(`../${user}`);
      } else if (res.error) {
        setDeclineLoading(false);
        message.error(res.error.data.message);
        setCurrentModal(0);
      } else {
        setDeclineLoading(false);
        message.error(res.data?.message);
        setCurrentModal(0);
      }
    } catch (error: any) {
      message.error(error?.data?.message);
      setDeclineLoading(false);
    }
  };

  const joinTargetGroup = async (): Promise<void> => {
    console.log('red');
    try {
      setAcceptLoading(true);
      const res: any = await setTargetGroupFreq({
        status: true,
        target_group_saving_id: groupItem.id,
        payment_auth: grpFormData.cardId,
        day_of_month: grpFormData.dayOfMonth,
        day_of_week: grpFormData.dayOfWeek,
        hour_of_day: grpFormData.hourOfDay,
        plan: grpFormData.frequencyValue,
        amount: grpFormData.amount,
      });
      if (res.error) {
        message.error(res.error.data.message);
        setAcceptLoading(false);
      } else if (res.data.status === 'success') {
        message.success(res.data?.message);
        setAcceptLoading(false);
        setCurrentModal(2);
      } else {
        message.error(res.data?.message);
        setAcceptLoading(false);
      }
    } catch (error: any) {
      message.error(error?.data?.message);
      setAcceptLoading(false);
    }
  };

  return (
    <>
      <Wrapper>
        {page === 1 && (
          <form
            className='form-container col-md-10 mx-auto'
            onSubmit={submitHandler}
          >
            {groupItem && (
              <div className='form-body'>
                <div className='invite'>
                  <Label color='#33277B'>Group Name</Label>
                  <Input
                    type='text'
                    placeholder='Group name'
                    name='groupName'
                    value={groupItem?.name}
                    disabled
                    className='caps'
                  />
                </div>

                <div className='invite'>
                  <Label color='#33277B'>Savings Type</Label>
                  <Input
                    type='text'
                    placeholder='Savings Type'
                    name='savingsType'
                    // onChange={handleFormChange}
                    value={groupMisc.savingsType}
                    // required
                    disabled
                  />
                </div>

                <div className='invite'>
                  <Label color='#33277B'>Description</Label>
                  <Input
                    type='textarea'
                    placeholder='Group description'
                    name='groupName'
                    value={groupItem?.description}
                    disabled
                  />
                </div>

                <div className='invite'>
                  <Label color='#33277B'>Amount</Label>
                  <Input
                    type='text'
                    placeholder='Amount'
                    name='amount'
                    value={`N ${format4dpNumber(
                      groupItem?.target_amount
                    )} per member`}
                    disabled
                  />
                </div>

                <div className='invite'>
                  <Label color='#33277B'>No of Members</Label>
                  <Input
                    type='number'
                    placeholder='Member no'
                    name='memberNo'
                    value={groupItem?.no_of_participants}
                    disabled
                  />
                </div>

                <div className='invite'>
                  <Label color='#33277B'>Invited by</Label>
                  <Input
                    type='text'
                    placeholder='Invited by'
                    name='ownerName'
                    value={groupMisc.ownerName}
                    disabled
                    className='caps'
                  />
                </div>
              </div>
            )}

            <div className='ft'>
              <Button
                bg='white'
                color='#059157'
                border='#059157'
                fontSize='16px'
                className='me-4'
                type='button'
                onClick={() => setCurrentModal(1)}
              >
                {declineLoading ? <LoadingButton /> : 'Decline'}
              </Button>

              <Button
                style={{
                  minWidth: '150px',
                  fontSize: '16px',
                  marginInlineStart: '2rem',
                }}
                type='submit'
              >
                Accept
              </Button>
            </div>
          </form>
        )}
        {page === 2 && (
          <div className='col-md-8 col-lg-6 my-4'>
            <Heading4>Okay, let's review</Heading4>
            <FinalTarGrpFormPage
              formData={grpFormData}
              setCurrentModal={setCurrentModal}
            />
            <div className='ft-a'>
              <Button
                style={{
                  minWidth: '150px',
                  fontSize: '16px',
                }}
                type='button'
                onClick={() => setCurrentModal(3)}
              >
                Join Group
              </Button>
            </div>
          </div>
        )}
      </Wrapper>
      {currentModal === 1 && (
        <ModalA isShown={true} hide={() => {}}>
          <ConfirmDelete
            func={setCurrentModal}
            submitDelete={declineTargetGroup}
            decline={true}
          />
        </ModalA>
      )}
      {currentModal === 2 && (
        <ModalA isShown={true} hide={() => {}}>
          <FormSubmit onConfirm={() => navigate(`../${user}`)} />
        </ModalA>
      )}
      {currentModal === 3 && (
        <ModalA isShown={true} hide={() => {}}>
          <SetPersonalFreq
            closeModal={() => setCurrentModal(0)}
            updFreq={handleFrequencyChange}
            updAmt={handleGrpFormDataChange}
            updHour={handleHourChange}
            updWeekday={handleWeekdayChange}
            updMonthday={handleMonthDayChange}
            freqValue={grpFormData.frequencyValue || ''}
            amt={grpFormData.amount || 0}
            joinGroup={joinTargetGroup}
            isLoading={acceptLoading}
          />
          {/* pass the submit function into this modal */}
        </ModalA>
      )}
      {currentModal === 4 && (
        <ModalA isShown={true} hide={() => {}}>
          <SwitchCard
            closeModal={() => setCurrentModal(0)}
            addCardModal={() => setCurrentModal(4)}
            updCard={handleGrpFormDataChange}
          />
        </ModalA>
      )}
      {currentModal === 5 && (
        <ModalA isShown={true} hide={() => {}}>
          <MyCards func={setCurrentModal} />
        </ModalA>
      )}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;

  .form-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // width: 100%;
    margin-top: 3rem;

    .caps {
      text-transform: capitalize;
    }

    .icon {
      margin: 0rem 0 2rem 0;
    }

    .form-body {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      width: 80%;
      .invite {
        width: 47%;
        margin-bottom: 2rem;
      }
      .label {
        margin: 0.5rem 0;
        font-weight: bold;
        // font-size: 16px;
        color: #33277b;
      }
    }
    .kin {
      margin-top: 2rem;
      // font-size: 16px;
      color: #33277b;
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

  .ft-a {
    margin-top: 2rem;
    margin-left: auto;
    display: flex;
    flex-direction: row;
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
      .form-inner {
        width: 80%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }

    .form-body {
      width: 100% !important;
      display: flex;
      flex-direction: column;
      // justify-content: center;
      // align-items: center;
      // flex-wrap: wrap;
      padding: 0;
      .invite {
        width: 100% !important;
      }
      // .label {
      //   margin: 1rem 0;
      //   /* font-family: Mollen Personal Use; */
      //   font-weight: bold;
      //   font-size: 13px;
      //   line-height: 16px;
      //   color: #7b7b7b;
      // }
    }
  }
`;

export default TarGrpInviteForm;
