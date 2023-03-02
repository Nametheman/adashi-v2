import { DatePicker, Popover, Steps, message } from 'antd';
import moment from 'moment';
import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// import { useForm } from "react-hook-form";
import { ReactComponent as BackIcon } from '../assets/icons/back.svg';
// import { ReactComponent as RightIcon } from "../assets/icons/right.svg";
// import { ReactComponent as AddIcon } from "../assets/icons/plus-circle.svg";
import { frontend_url, userData } from '../helpers/authHelper';
import {
  useAddTargetGroupMutation,
  useSetTargetGroupFreqMutation,
} from '../redux/services/saving-service';
import { useGetCardDataQuery } from '../redux/services/transaction-service';
import { targetGroupSavings, targetGroupSavingsForm } from '../utils/routes';

import ConfirmFormSubmit from './ConfirmFormSubmit';
import FinalTarGrpFormPage from './FinalTarGrpFormPage';
import FormSubmit from './FormSubmit';
import MyCards from './MyCards';
import SetPersonalFreq from './SetPersonalFreq';
import SwitchCard from './SwitchCard';
import Button from './bits/Button';
import Input from './bits/InputText';
import ModalA from './bits/ModalA';
import { Heading4, Label } from './bits/Text';
// import { formatNumber } from "../helpers/formatNumbers";
// import grpLeader from "../assets/img/grp-leader.png";

// import LoadingButton from "./bits/LoadingButton";
// import { useShowNav } from "../pages/authPages/AuthIndex";
// import { ReactComponent as CloseIcon } from "../assets/icons/close-icon.svg";

type TarGrpSavingsFormProps = {
  groupName: string;
  groupLeader?: string;
  groupDescription: string;
  groupId: string;
  target: number;
  memberNo: number;
  memberEmail: string;
  startDate: moment.Moment | null;
  startDateString?: string;
  endDate: moment.Moment | null;
  endDateString?: string;
  // members?: number;
  // payment?: string;
  amount: number;
  hourOfDay: number;
  dayOfWeek: number;
  dayOfMonth: number;
  frequencyName: string;
  frequencyValue: string;
  automated?: string;
  lockStatus?: string;
  // acct?: string;
  cardId: string;
};

const { Step } = Steps;

const customDot = (dot: any, { status, index }: any) => (
  <Popover
  // content={
  //   <span>
  //     step {index} status: {status}
  //   </span>
  // }
  >
    {dot}
  </Popover>
);

const TarGrpSavingsForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const [currentModal, setCurrentModal] = useState(0);
  const { data }: any = useGetCardDataQuery();
  // const [showDetails, setShowDetails] = useState(false);
  const [formData, setFormData] = useState<TarGrpSavingsFormProps>({
    groupName: '',
    groupLeader: userData().name,
    // groupLeader: userData().name + " " + userData().last_name,
    groupDescription: '',
    groupId: '',
    target: 0,
    memberNo: 0,
    memberEmail: '',
    automated: '',
    startDate: null,
    startDateString: '',
    endDate: null,
    endDateString: '',
    amount: 0,
    hourOfDay: 0,
    dayOfWeek: 0,
    dayOfMonth: 0,
    frequencyName: '',
    frequencyValue: 'flexible',
    lockStatus: 'Locked',
    cardId: '',
  });

  const [tags, setTags] = useState<string[]>(['']);
  const [addTargetGroup] = useAddTargetGroupMutation();
  const [setTargetGroupFreq] = useSetTargetGroupFreqMutation();

  // accepts the current date and returns a boolean
  const blockTodaysDate = (currDate: moment.Moment) => {
    return currDate && currDate < moment().endOf('day');
  };

  const blockTillStartDate = (currDate: moment.Moment) => {
    return (formData.startDate &&
      currDate.diff(formData.startDate) < 1) as boolean;
  };

  // const blockTillStartDate = (currDate: moment.Moment) => {
  //   return formData.startDate && currDate.isBefore(formData.startDate);
  // };

  // const blockTodaysDate = (currDate: moment.Moment) => {
  //   return currDate && currDate < moment().startOf('day');
  // };

  useEffect(() => {
    const calcAmountPaid = () => {
      let difference = moment
        .duration(formData.endDate?.diff(formData.startDate))
        .asDays();

      if (formData.frequencyValue === 'weekly') {
        difference = moment
          .duration(formData.endDate?.diff(formData.startDate))
          .asWeeks();
      } else if (formData.frequencyValue === 'monthly') {
        difference = formData.endDate?.diff(
          formData.startDate,
          'months',
          true
        ) as number;
        // difference = moment
        //   .duration(formData.endDate?.diff(formData.startDate))
        //   .asMonths();
      }

      let finalValue: number = 0;

      if (formData.target) {
        finalValue = formData.target / Math.ceil(difference);
      }

      return Math.ceil(finalValue);
    };

    if (
      formData.frequencyValue !== 'flexible' &&
      formData.startDate &&
      formData.endDate
    ) {
      const routineAmt = calcAmountPaid();
      setFormData(currData => {
        return {
          ...currData,
          amount: routineAmt,
        };
      });
    }
  }, [
    formData.frequencyValue,
    formData.target,
    formData.startDate,
    formData.endDate,
  ]);

  const handleFormDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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

  const handleStartDateChange = (
    date: moment.Moment | null,
    dateString: string
  ) => {
    setFormData(formData => ({
      ...formData,
      startDate: date,
      startDateString: dateString,
    }));
  };

  const handleEndDateChange = (
    date: moment.Moment | null,
    dateString: string
  ) => {
    setFormData(formData => ({
      ...formData,
      endDate: date,
      endDateString: dateString,
    }));
  };

  const handleAcctChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const memberEmails = tags.filter(tag => tag !== '');

  const getEmails = () => {
    let emailData: any = [];
    memberEmails.length > 0 &&
      memberEmails.forEach(member => {
        emailData.push({
          email: member,
        });
      });

    return emailData;
  };

  const removeTags = (indexToRemove: any) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };

  const addTags = (
    event: KeyboardEvent<HTMLInputElement>,
    memberEmails: string[]
  ) => {
    let { value } = event.target as HTMLInputElement;
    if (
      value !== '' &&
      value !== userData().email &&
      !tags.includes(value) &&
      memberEmails.length < formData.memberNo - 1
    ) {
      setTags([...tags, value]);
      value = '';
    }
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    next();
  };

  const createTarGrp = async (): Promise<void> => {
    if (memberEmails.length < formData.memberNo - 1) {
      message.error('Ensure to add all members before submitting.');
    } else if (formData.cardId === '') {
      message.error('Please add your card.');
    } else {
      try {
        setIsLoading(true);
        const res: any = await addTargetGroup({
          name: formData.groupName,
          target_amount: formData.target,
          no_of_participants: formData.memberNo,
          description: formData.groupDescription
            ? formData.groupDescription
            : 'null',
          start_date: moment(formData.startDate).format('YYYY-MM-DD'),
          end_date: moment(formData.endDate).format('YYYY-MM-DD'),
          callback_url: `${frontend_url}/user/settings?tab=4`,
          data: getEmails(),
        });
        if (res.error) {
          message.error(res.error.data.message);
          setIsLoading(false);
        } else if (res.data.status === 'success') {
          message.success(res.data?.message);
          setIsLoading(false);
          setFormData({
            ...formData,
            groupId: res.data.data.id,
          });
          setCurrentModal(3);
          window.sessionStorage.removeItem('currentState');
          window.sessionStorage.removeItem('formData');
        } else {
          message.error(res.data?.message);
          setIsLoading(false);
        }
      } catch (error: any) {
        message.error(error?.data?.message);
        setIsLoading(false);
      }
    }
  };

  const joinTargetGroup = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const res: any = await setTargetGroupFreq({
        status: true,
        target_group_saving_id: formData.groupId,
        payment_auth: formData.cardId,
        day_of_month: formData.dayOfMonth,
        day_of_week: formData.dayOfWeek,
        hour_of_day: formData.hourOfDay,
        plan: formData.frequencyValue,
        amount: formData.amount,
      });
      if (res.error) {
        message.error(res.error.data.message);
        setIsLoading(false);
      } else if (res.data.status === 'success') {
        message.success(res.data?.message);
        setIsLoading(false);
        setCurrentModal(2);
      } else {
        message.error(res.data?.message);
        setIsLoading(false);
      }
    } catch (error: any) {
      message.error(error?.data?.message);
      setIsLoading(false);
    }
    window.sessionStorage.removeItem('currentState');
    window.sessionStorage.removeItem('formData');
  };

  const steps = [
    {
      id: 1,
      title: 'Initialize',
      description: 'Create your plan',
      content: (
        <form className='col-md-8 col-lg-6 my-4' onSubmit={submitHandler}>
          <div className='step-div'>
            <Label color='#33277B'>Set a group title</Label>
            <Input
              type='text'
              placeholder='Enter group name'
              name='groupName'
              onChange={handleFormDataChange}
              value={formData.groupName}
              required
            />
            <p className='mt-2'>Make sure to keep it simple and descriptive</p>
          </div>
          <div className='step-div'>
            <Label color='#33277B'>Say more about your group (optional)</Label>
            <Input
              type='textarea'
              placeholder='Say something about your group'
              name='groupDescription'
              onChange={handleFormDataChange}
              value={formData.groupDescription}
              minLength={50}
              height='fit-content'
            />
            <p className='mt-2'>Minimum of 50 characters</p>
          </div>
          <Button fontSize='16px'>Next</Button>
        </form>
      ),
    },
    {
      id: 2,
      title: 'Target',
      description: 'Set group target',
      content: (
        <form className='col-md-8 col-lg-6 my-4' onSubmit={submitHandler}>
          <div className='step-div'>
            <Label color='#33277B'>Set a target amount</Label>
            <Input
              type='number'
              placeholder='Enter your target'
              name='target'
              onChange={handleFormDataChange}
              min={1000}
              value={
                formData.target && formData.target > 0 ? formData.target : ''
              }
              required
            />
            <p className='mt-2'>
              This is the target amount for each member at maturity. <br />
              It should be a minimum of &#8358;1000.
            </p>
          </div>
          <div className='step-div'>
            <Label color='#33277B'>Number of group member?</Label>
            <Input
              type='number'
              placeholder='No of people in the group'
              name='memberNo'
              onChange={handleFormDataChange}
              min={2}
              value={
                formData.memberNo && formData.memberNo > 0
                  ? formData.memberNo
                  : ''
              }
              required
            />
          </div>
          <div className='steps-action'>
            <Button
              style={{ margin: '0 8px' }}
              type='button'
              onClick={() => prev()}
              fontSize='16px'
            >
              Previous
            </Button>
            <Button type='submit' fontSize='16px'>
              Next
            </Button>
          </div>
        </form>
      ),
    },
    {
      id: 3,
      title: 'Duration',
      description: 'Set plan duration',
      content: (
        <div className='col-md-8 col-lg-6 my-4'>
          <div className='step-div'>
            <Label color='#33277B'>Set your duration</Label>

            <DatePicker
              onChange={handleStartDateChange}
              className='col-md-10 col-lg-8 date-picker'
              placeholder='Start Date'
              format={'MMM DD, YYYY'}
              value={formData.startDate}
              disabledDate={blockTodaysDate}
            />
            <DatePicker
              onChange={handleEndDateChange}
              className='col-md-10 col-lg-8 date-picker mt-4'
              placeholder='End Date'
              format={'MMM DD, YYYY'}
              value={formData.endDate}
              disabledDate={blockTillStartDate}
            />
          </div>

          <div className='steps-action'>
            <Button
              style={{ marginRight: '1rem' }}
              type='button'
              onClick={() => prev()}
              fontSize='16px'
            >
              Previous
            </Button>
            <Button
              type='submit'
              fontSize='16px'
              onClick={() => setCurrentModal(1)}
            >
              Next
            </Button>
          </div>
        </div>
      ),
    },

    {
      id: 4,
      title: 'Review',
      description: 'Confirm your plan',
      content: (
        <div className='col-md-8 col-lg-6 my-4'>
          <Heading4>Okay, let's review</Heading4>
          <FinalTarGrpFormPage
            formData={formData}
            setCurrentModal={setCurrentModal}
          />
          <div className='step-div mt-4'>
            <Label color='#33277B'>Enter Email Addresses</Label>
            <p style={{ fontSize: '14px' }}>
              Press 'Enter' to add multiple emails
            </p>
            <div className='tags-input'>
              <ul id='tags'>
                {memberEmails.map((tag, index: number) => (
                  <li key={index} className='tag'>
                    <span className='tag-title'>{tag}</span>
                    <span
                      className='tag-close-icon'
                      onClick={() => removeTags(index)}
                    >
                      x
                    </span>
                  </li>
                ))}
              </ul>
              {tags.length < formData.memberNo && (
                <input
                  type='email'
                  onKeyUp={(event: KeyboardEvent<HTMLInputElement>) =>
                    event.key === 'Enter' ? addTags(event, memberEmails) : null
                  }
                  placeholder='Input emails here'
                  required
                />
              )}
            </div>
          </div>

          <div className='steps-action'>
            <Button
              style={{ marginRight: '1rem', minWidth: '150px' }}
              onClick={() => prev()}
              fontSize='16px'
            >
              Previous
            </Button>
            <Button
              fontSize='16px'
              style={{ minWidth: '150px' }}
              onClick={() => createTarGrp()}
            >
              Create Plan
            </Button>
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const urlParams = new URL(window.location.href);
    const myParam = urlParams.searchParams.get('current');
    myParam && setCurrent(parseInt(myParam));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const data = window.sessionStorage.getItem('currentState');
    const form = window.sessionStorage.getItem('formData');
    if (data !== null) setCurrent(JSON.parse(`${data}`));
    if (form !== null) {
      const formObject = JSON.parse(form);

      formObject.startDate = moment(formObject.startDate);
      formObject.endDate = moment(formObject.endDate);
      setFormData(formObject);
    }
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem('currentState', JSON.stringify(current));
    window.sessionStorage.setItem('formData', JSON.stringify(formData));
  }, [current, formData]);

  return (
    <>
      <TarGrpSavingsForm.Wrapper>
        <div className='container'>
          <h2>Target Group Savings</h2>
          <hr className='line' />
          <Link
            to={`../${targetGroupSavings}`}
            style={{ textDecoration: 'none' }}
            className='back'
            onClick={() => {
              window.sessionStorage.removeItem('formData');
              window.sessionStorage.removeItem('currentState');
            }}
          >
            <BackIcon />
            <p>Back</p>
          </Link>

          <>
            <Steps
              current={current}
              progressDot={customDot}
              responsive={true}
              className='my-steps'
            >
              {steps.map((item, id) => (
                <Step
                  key={id}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </Steps>
            <div className='steps-content'>{steps[current].content}</div>
          </>
        </div>
      </TarGrpSavingsForm.Wrapper>
      <div>
        {currentModal === 1 && (
          <ModalA isShown={true} hide={() => {}}>
            <ConfirmFormSubmit
              endDateString={formData.endDateString || ''}
              closeModal={() => setCurrentModal(0)}
              confirm={() => {
                setFormData(curr => ({
                  ...curr,
                  cardId: data?.data[0]?.id,
                }));
                next();
              }}
            />
          </ModalA>
        )}
        {currentModal === 2 && (
          <ModalA isShown={true} hide={() => {}}>
            <FormSubmit
              onConfirm={() => navigate(`../${targetGroupSavings}`)}
            />
          </ModalA>
        )}
        {currentModal === 3 && (
          <ModalA isShown={true} hide={() => {}}>
            <SetPersonalFreq
              closeModal={() => setCurrentModal(0)}
              updFreq={handleFrequencyChange}
              updAmt={handleFormDataChange}
              updHour={handleHourChange}
              updWeekday={handleWeekdayChange}
              updMonthday={handleMonthDayChange}
              freqValue={formData.frequencyValue || ''}
              amt={formData.amount || 0}
              joinGroup={() => joinTargetGroup()}
              isLoading={isLoading}
            />
            {/* pass the submit function into this modal */}
          </ModalA>
        )}
        {currentModal === 4 && (
          <ModalA isShown={true} hide={() => {}}>
            <SwitchCard
              closeModal={() => setCurrentModal(0)}
              addCardModal={() => setCurrentModal(5)}
              updCard={handleAcctChange}
            />
          </ModalA>
        )}
        {currentModal === 5 && (
          <ModalA isShown={true} hide={() => {}}>
            <MyCards
              func={setCurrentModal}
              redirectUrl={`${targetGroupSavingsForm}?current=3`}
            />
          </ModalA>
        )}
      </div>
    </>
  );
};

TarGrpSavingsForm.Wrapper = styled.div`
  .container {
    padding: 2rem;
    color: #33277b !important;
    // font-size: 16px;
    h2 {
      font-weight: 600;
      color: #33277b;
    }

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

    .row {
      justify-content: space-between;
    }

    .form-review {
      border: 1px solid rgba(0, 0, 0, 0.4);
      box-sizing: border-box;
      border-radius: 20px;
      padding: 1rem 1.5rem;
      cursor: pointer;
      // font-size: 16px;
      text-transform: capitalize;

      p {
        margin-bottom: 0.5rem;
      }

      .form-header {
        h2,
        h4,
        h5 {
          color: #33277b;
        }

        .title {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          .plan-name {
            display: flex;
            flex-direction: column;
            justify-content: end;
          }
          .vertical {
            border-right: 2px solid #33277b;
          }

          .target {
            display: flex;
            flex-direction: column;
            justify-content: end;
            margin-left: 1rem;
            h2,
            p {
              margin-bottom: 0;
            }
            .lower {
              text-transform: lowercase;
              // font-size: 16px;
            }
          }
        }
        margin-bottom: 1rem;
      }

      .card-main {
        display: flex;
        flex-direction: column;
        h2,
        h5 {
          color: #33277b;
        }
      }

      .card-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 1rem;

        div:nth-of-type(2) {
          display: flex;
          flex-direction: column;
          align-items: end;
        }
      }
    }

    .tags-input {
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
      min-height: 4.8rem;
      width: 480px;
      padding: 0 8px;
      border: 1px solid rgb(214, 216, 218);
      border-radius: 6px;
      &:focus-within {
        border: 1px solid #0052cc;
      }
      input {
        flex: 1;
        border: none;
        height: 46px;
        font-size: 14px;
        padding: 4px 0 0 0;
        width: 100%;
        &:focus {
          outline: transparent;
        }
      }

      #tags {
        display: flex;
        flex-wrap: wrap;
        padding: 0;
        margin: 8px 0 0 0;

        .tag {
          width: auto;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #47486b;
          padding: 0 3px;
          font-size: 12px;
          list-style: none;
          border-radius: 6px;
          margin: 0 5px 5px 0;
          background: #e6ffea;
          .tag-title {
            margin-top: 3px;
          }
          .tag-close-icon {
            display: block;
            width: 16px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            font-size: 14px;
            margin-left: 8px;
            color: green;
            border-radius: 50%;
            cursor: pointer;
          }
        }
      }
    }

    .my-steps {
      margin-left: 0;
      margin: 2rem 0;
    }

    .ant-steps-icon-dot {
      background-color: #059157 !important;
    }

    .ant-steps-item-finish
      > .ant-steps-item-container
      > .ant-steps-item-tail::after {
      background-color: #059157 !important;
    }

    @media screen and (max-width: 500px) {
      padding: 1rem;
      .tags-input {
        width: 320px;
      }
    }
  }
`;

export default TarGrpSavingsForm;
