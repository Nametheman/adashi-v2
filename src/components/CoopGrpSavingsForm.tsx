import { DatePicker, Popover, Steps, message } from 'antd';
import moment from 'moment';
import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ReactComponent as BackIcon } from '../assets/icons/back.svg';
import { frontend_url, userData } from '../helpers/authHelper';
import {
  DAYS_OF_MONTH,
  DAYS_OF_WEEK_OPTIONS,
  HOUR_OF_DAY_OPTIONS,
} from '../helpers/otherHelpers';
import {
  useAddCoopGroupMutation,
  useJoinCoopGroupMutation,
} from '../redux/services/saving-service';
import { useGetCardDataQuery } from '../redux/services/transaction-service';
import { RootState, useAppSelector } from '../redux/store';
import {
  cooperativeGroupSavings,
  cooperativeGroupSavingsForm,
} from '../utils/routes';

// import { ReactComponent as RightIcon } from "../assets/icons/right.svg";
// import { ReactComponent as AddIcon } from "../assets/icons/plus-circle.svg";
import FinalCoopGrpFormPage from './FinalCoopGrpFormPage';
import FormSubmit from './FormSubmit';
import MyCards from './MyCards';
import SetPayoutOrder from './SetPayoutOrder';
import SwitchCard from './SwitchCard';
import Button from './bits/Button';
import Input from './bits/InputText';
import LoadingButton from './bits/LoadingButton';
import ModalA from './bits/ModalA';
import Select from './bits/Select';
import { Heading4, Label } from './bits/Text';

// import { formatNumber } from "../helpers/formatNumbers";
// import grpLeader from "../assets/img/grp-leader.png";
// import { useShowNav } from "../pages/authPages/AuthIndex";

export type CoopGrpSavingsFormProps = {
  groupName: string;
  groupLeader?: string;
  groupLeaderEmail?: string;
  groupDescription?: string;
  groupId: string;
  target?: number;
  memberNo: number;
  vMemberNo: number;
  rMemberNo: number;
  memberEmail: string;
  startDate?: moment.Moment | null;
  startDateString?: string;
  endDate?: moment.Moment | null;
  endDateString?: string;
  // members?: number;
  // payment?: string;
  amount: number;
  hourOfDay: number;
  dayOfWeek: number;
  dayOfMonth: number;
  frequencyName?: string;
  frequencyValue: string;
  automated?: string;
  lockStatus?: string;
  // acct?: string;
  cardId: string;
  payoutOrder: number;
  payoutOrderAvailable: number[];
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

const CoopGrpSavingsForm = () => {
  const navigate = useNavigate();
  const vMState = useAppSelector(
    (state: RootState) => state.virtualMembers.value
  );
  const { data }: any = useGetCardDataQuery();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [current, setCurrent] = useState<number>(0);
  const [currentModal, setCurrentModal] = useState<number>(0);
  // const [showDetails, setShowDetails] = useState(false);
  const [formData, setFormData] = useState<CoopGrpSavingsFormProps>({
    groupName: '',
    groupLeader: userData().name,
    // groupLeader: userData().name + " " + userData().last_name,
    groupLeaderEmail: userData().email,
    groupId: '',
    target: 0,
    vMemberNo: 0,
    rMemberNo: 0,
    memberNo: 0,
    memberEmail: '',
    // automated: "",
    startDate: null,
    startDateString: '',
    endDate: null,
    endDateString: '',
    amount: 0,
    frequencyName: '',
    frequencyValue: '',
    hourOfDay: 0,
    dayOfWeek: 0,
    dayOfMonth: 0,
    lockStatus: 'Locked',
    cardId: '',
    payoutOrder: 0,
    payoutOrderAvailable: [],
  });

  // const { setShowNav } = useShowNav();
  // useEffect(() => {
  //   setShowNav(true);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  // useLayoutEffect(() => {
  //   setFormData((currData) => {
  //     return {
  //       ...currData,
  //       groupLeader: userData?.name + " " + userData?.last_name,
  //       groupLeaderEmail: userData?.email,
  //     };
  //   });
  // }, [userData]);

  useEffect(() => {
    setFormData(currData => {
      return {
        ...currData,
        memberNo: Number(currData.rMemberNo) + Number(currData.vMemberNo),
      };
    });
  }, [formData.rMemberNo, formData.vMemberNo]);

  const [tags, setTags] = useState<string[]>(['']);
  const [addCoopGroup] = useAddCoopGroupMutation();
  const [joinCoopGroup] = useJoinCoopGroupMutation();

  // accepts the current date and returns a boolean
  const blockTodaysDate = (currDate: moment.Moment) => {
    return currDate && currDate < moment().endOf('day');
  };

  const handleFormDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // setFormData({
    //   ...formData,
    //   [name]: value,
    // });
    setFormData(currData => {
      return {
        ...currData,
        [name]: value,
      };
    });
  };

  const handleFrequencyChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(currData => {
      return {
        ...currData,
        frequencyName: name,
        frequencyValue: value,
      };
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

  const handleStartDateChange = (date: any, dateString: any) => {
    setFormData({
      ...formData,
      startDate: date,
      startDateString: dateString,
      // endDate:
    });
  };

  const addDate = (
    amount?: moment.DurationInputArg1,
    unit?: moment.unitOfTime.DurationConstructor | undefined
  ) => {
    let m = moment(formData.startDate).add(amount, unit);
    setFormData({
      ...formData,
      endDate: m,
      endDateString: m.format('MMM DD, YYYY'),
    });
  };

  // will convert this to handleFormDataChange later, same function
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
      value !== formData.groupLeaderEmail &&
      !tags.includes(value) &&
      formData.rMemberNo !== 0 &&
      memberEmails.length < formData.rMemberNo - 1
    ) {
      setTags([...tags, value]);
      value = '';
    } else if (
      value !== '' &&
      value !== formData.groupLeaderEmail &&
      !tags.includes(value) &&
      formData.rMemberNo === 0 &&
      memberEmails.length < formData.memberNo - 1
    ) {
      setTags([...tags, value]);
      value = '';
    }
  };

  useEffect(() => {
    if (formData.startDate !== null) {
      if (formData.frequencyValue === 'daily') {
        addDate(1 * formData.memberNo, 'days');
      } else if (formData.frequencyValue === 'weekly') {
        addDate(7 * formData.memberNo, 'days');
      } else if (formData.frequencyValue === 'monthly') {
        addDate(1 * formData.memberNo, 'months');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.frequencyValue, formData.startDate]);

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

  const createCoopGroup = async (): Promise<void> => {
    if (!vMState && memberEmails.length < formData.memberNo - 1) {
      message.error('Ensure to add all members before submitting.');
    } else if (formData.cardId === '') {
      message.error('Please add your card.');
    } else {
      try {
        setIsLoading(true);
        const res: any = await addCoopGroup({
          name: formData.groupName,
          amount: formData.amount,
          plan: formData.frequencyValue,
          day_of_month: formData.dayOfMonth,
          day_of_week: formData.dayOfWeek,
          hour_of_day: formData.hourOfDay,
          no_of_participants: formData.memberNo,
          description: formData.groupDescription,
          // description: formData.groupDescription ? formData.groupDescription : "null",
          start_date: moment(formData.startDate).format('YYYY-MM-DD'),
          end_date: moment(formData.endDate).format('YYYY-MM-DD'),
          bot: vMState,
          no_of_bot: formData.vMemberNo,
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
            payoutOrderAvailable: res.data.data.available_payout_order,
          });
          setCurrentModal(2);
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

  // this should contain the function to set the admin's frequency, payout order
  const joinGroup = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const res: any = await joinCoopGroup({
        status: true,
        group_saving_id: formData.groupId,
        payment_auth: formData.cardId,
        payout_order: formData.payoutOrder,
      });
      if (res.error) {
        message.error(res.error.data.message);
        setIsLoading(false);
      } else if (res.data.status === 'success') {
        message.success(res.data?.message);
        setIsLoading(false);
        setCurrentModal(1);
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
            <p className='mt-2 subtitle'>
              Make sure to keep it simple and descriptive
            </p>
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
            {/* <p>Minimum of 50 characters</p> */}
          </div>
          <Button fontSize='16px'>Next</Button>
        </form>
      ),
    },
    {
      id: 2,
      title: 'Frequency',
      description: 'Set group frequency',
      content: (
        <form className='col-md-8 col-lg-6 my-4' onSubmit={submitHandler}>
          <div className='step-div'>
            <Label color='#33277B'>
              How often do you want your members to save?
            </Label>
            <div className='col-md-10 col-lg-8 mb-0'>
              <Select
                placeholder='Frequency'
                // name="frequency"
                fullWidth
                options={[
                  { name: 'Daily', value: 'daily' },
                  { name: 'Weekly', value: 'weekly' },
                  { name: 'Monthly', value: 'monthly' },
                ]}
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
              {formData.frequencyValue !== '' && (
                <Select
                  placeholder='Choose hour of the day'
                  fullWidth
                  options={HOUR_OF_DAY_OPTIONS}
                  onChange={handleHourChange}
                  required
                />
              )}
            </div>
            <p style={{ color: '#DC3545' }} className='mt-0 subtitle'>
              * You cannot modify the frequency after creating this plan.
            </p>
          </div>

          <div className='step-div'>
            <Label color='#33277B'>
              {formData.frequencyValue.charAt(0).toUpperCase() +
                formData.frequencyValue.slice(1)}{' '}
              Savings Amount
            </Label>
            <Input
              type='number'
              placeholder='Amount to save'
              name='amount'
              onChange={handleFormDataChange}
              min={1000}
              value={
                formData.amount && formData.amount > 0 ? formData.amount : ''
              }
              required
            />
            <p className='mt-2 subtitle'>
              This is the amount you intend to save periodically.{' '}
              <b>Minimum of &#8358;1000 is required.</b>
            </p>
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
        <form className='col-md-8 col-lg-6 my-4' onSubmit={submitHandler}>
          {vMState && (
            <>
              <div className='step-div'>
                <Label color='#33277B'>Number of real members?</Label>
                <Input
                  type='number'
                  placeholder='No of real members in the group'
                  name='rMemberNo'
                  onChange={handleFormDataChange}
                  value={
                    formData.rMemberNo && formData.rMemberNo > 0
                      ? formData.rMemberNo
                      : ''
                  }
                  required
                />
                <p style={{ color: '#DC3545' }} className='mt-2 subtitle'>
                  Kindly note that all <b>real members</b> will be last on the
                  payout order.
                </p>
              </div>
              <div className='step-div'>
                <Label color='#33277B'>Number of virtual members</Label>
                <Input
                  type='number'
                  placeholder='No of virtual members in the group'
                  name='vMemberNo'
                  onChange={handleFormDataChange}
                  value={
                    formData.vMemberNo && formData.vMemberNo > 0
                      ? formData.vMemberNo
                      : ''
                  }
                  required
                />
              </div>
            </>
          )}
          <div className='step-div'>
            <Label color='#33277B'>
              {vMState ? `Total Members` : `Number of members`}
            </Label>
            <Input
              type='number'
              placeholder='No of members in the group'
              name='memberNo'
              onChange={handleFormDataChange}
              value={
                formData.memberNo && formData.memberNo > 0
                  ? formData.memberNo
                  : ''
              }
              min={2}
              required
              disabled={vMState}
            />
          </div>
          <div className='step-div'>
            <Label color='#33277B'>Set your start date</Label>
            <DatePicker
              onChange={handleStartDateChange}
              className='col-md-10 col-lg-8 date-picker'
              placeholder='Start Date'
              format={'MMM DD, YYYY'}
              value={formData.startDate}
              disabledDate={blockTodaysDate}
            />
            {/* need form validation for this date picker, i.e. required */}
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
              onClick={() =>
                setFormData(curr => ({
                  ...curr,
                  cardId: data?.data[0]?.id,
                }))
              }
            >
              Next
            </Button>
          </div>
        </form>
      ),
    },

    {
      id: 4,
      title: 'Review',
      description: 'Confirm your plan',
      content: (
        <div className='col-md-8 col-lg-6 my-4'>
          <Heading4>Okay, let's review</Heading4>
          <FinalCoopGrpFormPage
            formData={formData}
            setCurrentModal={setCurrentModal}
          />

          {((vMState && formData.rMemberNo > 1) ||
            (!vMState && formData.memberNo)) && (
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
                      event.key === 'Enter'
                        ? addTags(event, memberEmails)
                        : null
                    }
                    placeholder='Input emails here'
                    required
                  />
                )}
              </div>
            </div>
          )}

          <div className='steps-action  mt-4'>
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
              onClick={() => createCoopGroup()}
            >
              {isLoading ? <LoadingButton /> : 'Create Plan'}
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
      <CoopGrpSavingsForm.Wrapper>
        <div className='container'>
          <h2 style={{ fontWeight: '600', color: '#33277b' }}>
            Cooperative Group Savings
          </h2>
          <hr className='line' />
          <Link
            to={`../${cooperativeGroupSavings}`}
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
      </CoopGrpSavingsForm.Wrapper>

      {/* this will be called at the end o the form, i.e. an onSubmit handler after "Create Plan" */}
      {currentModal === 1 && (
        <ModalA isShown={true} hide={() => {}}>
          <FormSubmit
            onConfirm={() => navigate(`../${cooperativeGroupSavings}`)}
          />
        </ModalA>
      )}
      {currentModal === 2 && (
        <ModalA isShown={true} hide={() => {}}>
          <SetPayoutOrder
            closeModal={() => setCurrentModal(0)}
            joinGroup={() => joinGroup()}
            isLoading={isLoading}
            updForm={handleFormDataChange}
            // members={memberEmails}
            payoutOrderAvailable={formData.payoutOrderAvailable}
          />
        </ModalA>
      )}
      {currentModal === 3 && (
        <ModalA isShown={true} hide={() => {}}>
          <SwitchCard
            closeModal={() => setCurrentModal(0)}
            addCardModal={() => setCurrentModal(4)}
            updCard={handleAcctChange}
          />
        </ModalA>
      )}
      {currentModal === 4 && (
        <ModalA isShown={true} hide={() => {}}>
          <MyCards
            func={setCurrentModal}
            redirectUrl={`${cooperativeGroupSavingsForm}?current=3`}
          />
        </ModalA>
      )}
    </>
  );
};

CoopGrpSavingsForm.Wrapper = styled.div`
  .container {
    padding: 2rem;
    color: #33277b !important;
    // font-size: 16px;

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

    .subtitle {
      font-size: 14px;
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
      padding: 1rem 2rem;
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
            justify-content: center;
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

        .bankCard {
          display: flex;
          gap: 0.2rem;
          /* align-items: center; */
          justify-content: center;
        }
        .bankCard_details {
          /* display: flex; */
          /* align-items: center; */
          /* justify-content: center; */
          @media screen and (max-width: 768px) {
            flex-direction: column;
            margin-left: 10rem;
            gap: 0.2rem;
            b {
              font-size: 0.5rem;
            }
          }
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

export default CoopGrpSavingsForm;
