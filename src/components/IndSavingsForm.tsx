import { DatePicker, Popover, Steps, message } from 'antd';
import moment from 'moment';
import React, { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ReactComponent as BackIcon } from '../assets/icons/back.svg';
import { ReactComponent as MasterCard } from '../assets/icons/mastercard2.svg';
import { ReactComponent as AddIcon } from '../assets/icons/plus-circle.svg';
import { ReactComponent as RightIcon } from '../assets/icons/right.svg';
import { formatNumber } from '../helpers/formatNumbers';
import {
  DAYS_OF_MONTH,
  DAYS_OF_WEEK_OPTIONS,
  HOUR_OF_DAY_OPTIONS,
} from '../helpers/otherHelpers';
import { useAddIndSavingMutation } from '../redux/services/saving-service';
import { useGetCardDataQuery } from '../redux/services/transaction-service';
import { individualSavings, individualSavingsForm } from '../utils/routes';

import ConfirmFormSubmit from './ConfirmFormSubmit';
import FormSubmit from './FormSubmit';
import MyCards from './MyCards';
import SwitchCard from './SwitchCard';
import Button from './bits/Button';
import Input from './bits/InputText';
import LoadingButton from './bits/LoadingButton';
import ModalA from './bits/ModalA';
import Select from './bits/Select';
import { Heading4, Label } from './bits/Text';

// import { useShowNav } from "../pages/authPages/AuthIndex";

type IndividualSavingsFormProps = {
  planName: string;
  target: number;
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
  frequencyName?: string;
  frequencyValue: string;
  automated?: string;
  // savingsDayName?: string;
  // savingsDayValue?: string;
  rate?: number;
  lockStatus?: string;
  // acct?: string;
  cardId: string;
};

const { Step } = Steps;

const customDot = (dot: any, { status, index }: any) => (
  <Popover
  // content={
  //   <span>
  //     <p>Step {index}</p>
  //     <p>Status {status}</p>
  //   </span>
  // }
  >
    {dot}
  </Popover>
);

const IndSavingsForm = () => {
  const navigate = useNavigate();
  const { data }: any = useGetCardDataQuery();
  const [isLoading, setIsLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const [currentModal, setCurrentModal] = useState(0);
  const [formData, setFormData] = useState<IndividualSavingsFormProps>({
    planName: '',
    target: 0,
    automated: '',
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
    // savingsDayName: "",
    // savingsDayValue: "",
    // rate: 5.5,
    lockStatus: 'Locked',
    cardId: '',
    // acct: "",
  });

  // const { setShowNav } = useShowNav();
  // useEffect(() => {
  //   setShowNav(true);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const { data }: any = useGetCardDataQuery();
  // you can use this to show a selected card, match the selected card's id
  // to one of the ones you get from the endpoint, then display the last 4 digits of whatever card was matched
  const [addIndSaving] = useAddIndSavingMutation();

  // accepts the current date and returns a boolean
  const blockTodaysDate = (currDate: moment.Moment) => {
    return currDate && currDate < moment().endOf('day');
  };

  const blockTillStartDate = (currDate: moment.Moment) => {
    return (formData.startDate &&
      currDate.diff(formData.startDate) < 1) as boolean;
  };

  useEffect(() => {
    const calcAmountPaid = () => {
      // let difference = moment
      //   .duration(formData.endDate?.diff(formData.startDate, 'days'))
      //   .asDays();
      let difference = formData.endDate?.diff(
        formData.startDate,
        'days',
        true
      ) as number;
      // .asDays();

      if (formData.frequencyValue === 'weekly') {
        // difference = moment
        //   .duration(formData.endDate?.diff(formData.startDate))
        //   .asWeeks();
        difference = formData.endDate?.diff(
          formData.startDate,
          'weeks',
          true
        ) as number;
        // .asWeeks();
      } else if (formData.frequencyValue === 'monthly') {
        difference = formData.endDate?.diff(
          formData.startDate,
          'months',
          true
        ) as number;
      }

      let finalValue: number = 0;

      if (formData.target) {
        finalValue = formData.target / Math.ceil(difference);
      }

      return Math.ceil(finalValue);
    };

    if (
      formData.automated === 'yes' &&
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
    formData.automated,
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

  const handleAutomatedChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value === 'no') {
      setFormData({
        ...formData,
        [name]: value,
        frequencyName: 'Flexible',
        frequencyValue: 'flexible',
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
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

  const handleStartDateChange = (date: any, dateString: any) => {
    setFormData({
      ...formData,
      startDate: date,
      startDateString: dateString,
    });
  };

  const handleEndDateChange = (date: any, dateString: any) => {
    setFormData({
      ...formData,
      endDate: date,
      endDateString: dateString,
    });
  };

  const handleAcctChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // console.log(e.target);
    setFormData({
      ...formData,
      [name]: value,
    });
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

  const createPlan = async (): Promise<void> => {
    if (formData.cardId === '') {
      message.error('Please add your card.');
    } else {
      try {
        setIsLoading(true);
        const res: any = await addIndSaving({
          name: formData.planName,
          amount: formData.amount,
          target_amount: formData.target,
          plan: formData.frequencyValue,
          day_of_month: formData.dayOfMonth,
          day_of_week: formData.dayOfWeek,
          hour_of_day: formData.hourOfDay,
          payment_auth: formData.cardId,
          start_date: moment(formData.startDate).format('YYYY-MM-DD'),
          end_date: moment(formData.endDate).format('YYYY-MM-DD'),
        });
        if (res.error) {
          message.error(res.error.data.message);
          console.log(res.error);
          setIsLoading(false);
        } else if (res.data.status === 'success') {
          message.success(res.data?.message);
          setIsLoading(false);
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

  const steps = [
    {
      id: 1,
      title: 'Initialize',
      description: 'Create your plan',
      content: (
        <form className='col-md-8 col-lg-6 my-4' onSubmit={submitHandler}>
          <div className='step-div'>
            <Label color='#33277B'>Give your plan a name</Label>
            <Input
              type='text'
              placeholder='Enter plan name'
              name='planName'
              onChange={handleFormDataChange}
              value={formData.planName}
              required
            />
            <p className='mt-2'>Example: Car, house rent, vacation</p>
          </div>
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
              // {formData.target !== 0 && value={formData.target} }
              required
            />
            <p className='mt-2'>
              This is the amount you intend to achieve at maturity. <br /> It
              should be a minimum of &#8358;1000.
            </p>
          </div>
          <Button fontSize='16px'>Next</Button>
        </form>
      ),
    },
    {
      id: 2,
      title: 'Frequency',
      description: 'Set plan frequency',
      content: (
        <form className='col-md-8 col-lg-6 my-4' onSubmit={submitHandler}>
          <div className='step-div'>
            <Label color='#33277B' className='mb-2'>
              Do you want to automate your plan?
            </Label>
            <div className='mb-4'>
              <input
                type='radio'
                value='yes'
                id='yes'
                onChange={handleAutomatedChange}
                name='automated'
                checked={formData.automated === 'yes'}
                // {formData.automated === "yes" && checked}
                color='#05915F'
                required
              />
              <label htmlFor='yes' className='ms-4'>
                Yes, I want to be debited automatically
              </label>
            </div>

            <div>
              <input
                type='radio'
                value='no'
                id='no'
                onChange={handleAutomatedChange}
                name='automated'
                checked={formData.automated === 'no'}
                color='#05915F'
                required
              />
              <label htmlFor='no' className='ms-4'>
                No, I want to save when I want
              </label>
            </div>
          </div>
          {formData.automated === 'yes' && (
            <div className='step-div'>
              <Label color='#33277B'>How often would you like to save?</Label>
              <div className='col-md-10 col-lg-8'>
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
              </div>

              {formData.frequencyValue === 'monthly' && (
                <div className='col-md-10 col-lg-8'>
                  <Select
                    placeholder='Choose day of the month'
                    fullWidth
                    options={DAYS_OF_MONTH}
                    onChange={handleMonthDayChange}
                    required
                  />
                </div>
              )}

              {formData.frequencyValue === 'weekly' && (
                <div className='col-md-10 col-lg-8'>
                  <Select
                    placeholder='Choose day of the week'
                    fullWidth
                    options={DAYS_OF_WEEK_OPTIONS}
                    onChange={handleWeekdayChange}
                    required
                  />
                </div>
              )}

              {formData.frequencyValue !== 'flexible' && (
                <div className='col-md-10 col-lg-8'>
                  <Select
                    placeholder='Choose hour of the day'
                    fullWidth
                    options={HOUR_OF_DAY_OPTIONS}
                    onChange={handleHourChange}
                    required={true}
                  />
                </div>
              )}
            </div>
          )}

          {formData.automated === 'no' && (
            <div className='step-div'>
              <Label color='#33277B'>
                How much would you like to start with?
              </Label>
              <Input
                type='number'
                name='amount'
                placeholder='Amount to save'
                onChange={handleFormDataChange}
                min={500}
                value={
                  formData.amount && formData.amount > 0 ? formData.amount : ''
                }
                required
                // disabled
              />
              <p className='mt-2'>It should be a minimum of &#8358;500.</p>
            </div>
          )}

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

          {formData.automated === 'yes' && (
            <div className='step-div'>
              <Label color='#33277B'>
                Amount to be paid {formData.frequencyValue}
              </Label>
              <Input
                type='number'
                name='amount'
                onChange={handleFormDataChange}
                value={formData.amount}
                required
                disabled
              />
            </div>
          )}
          <div className='steps-action'>
            <Button
              style={{ margin: '0 8px' }}
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
          <div className='form-review'>
            <div className='form-header'>
              <div className='title'>
                <div className='plan-name'>
                  <h2 className='me-2'>
                    <b>{formData.planName}</b>
                  </h2>
                </div>
                <div className='vertical'></div>
                <div className='target'>
                  <p>Target</p>
                  <h2>
                    <b>&#8358;&nbsp;{formatNumber(formData.target)}</b>
                  </h2>
                </div>
              </div>

              <hr className='line' />
            </div>
            <div className='card-main'>
              <div className='card-row'>
                <div className='amt'>
                  <p>Amount</p>
                  <p>
                    <b>&#8358;&nbsp; {formatNumber(formData.amount)}</b>
                  </p>
                </div>
                <div>
                  <p>Frequency</p>
                  <p style={{ textTransform: 'capitalize' }}>
                    {formData.frequencyValue ? (
                      <b>{formData.frequencyValue}</b>
                    ) : (
                      'flexible'
                    )}
                  </p>
                </div>
              </div>
              <div className='card-row'>
                <div className='start'>
                  <p>Start Date</p>
                  <p>
                    <b>{formData.startDateString}</b>
                  </p>
                </div>
                <div className='end'>
                  <p>Maturity Date</p>
                  <p>
                    <b>{formData.endDateString}</b>
                  </p>
                </div>
              </div>
              <div className='card-row mb-2'>
                <div className='status'>
                  <p>Lock Status</p>
                  <p>
                    <b>{formData.lockStatus}</b>
                  </p>
                </div>
                {/* <div className="rate">
                  <p>Interest Rate p.a.</p>
                  <p>
                    <b>{formData.rate}%</b>
                  </p>
                </div> */}
              </div>

              <hr className='line' />

              <div className='card-row mb-2 '>
                <div className='me-2'>
                  <p>Payment</p>
                </div>
                <div>
                  {formData.cardId || data?.data.length > 0 ? (
                    <p className='d-flex flex-row'>
                      {/* <b>{formData.cardId}</b> */}
                      {/* <p className='me-4'>Card Saved!</p> */}
                      {/* <span className='d-flex flex-row gap-1 flex-wrap'> */}
                      <span className='bankCard'>
                        <b>
                          <MasterCard />
                        </b>
                        <span className='bankCard_details'>
                          <b>{data.data[0].bank} </b>
                          <b> - {data.data[0].last4}</b>
                        </span>
                      </span>
                      <b
                        style={{
                          color: '#059157',
                          marginInlineStart: '1rem',
                          cursor: 'pointer',
                        }}
                        onClick={() => setCurrentModal(3)}
                      >
                        Switch <RightIcon className='ms-2' />
                      </b>
                    </p>
                  ) : (
                    <p className='d-flex flex-row'>
                      <p className='me-4'>No card selected</p>
                      <b
                        style={{ color: '#059157', cursor: 'pointer' }}
                        onClick={() => setCurrentModal(3)}
                      >
                        <AddIcon className='me-2' /> Add Card
                      </b>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className='steps-action mt-4'>
            <Button
              style={{
                marginRight: '1rem',
                minWidth: '150px',
                fontSize: '16px',
              }}
              onClick={() => prev()}
            >
              Previous
            </Button>
            <Button
              style={{ minWidth: '150px', fontSize: '16px' }}
              onClick={() => createPlan()}
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
      <IndSavingsForm.Wrapper>
        <div className='container'>
          <h2>Individual Savings</h2>
          <hr className='line' />
          <Link
            to={`../${individualSavings}`}
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
              // direction="horizontal"
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
              {/* {steps.map((item) => (
                <Step key={item.id} />
              ))} */}
            </Steps>
            <div className='steps-content'>{steps[current].content}</div>
          </>
        </div>
      </IndSavingsForm.Wrapper>
      {currentModal === 1 && (
        <ModalA isShown={true} hide={() => {}}>
          <ConfirmFormSubmit
            endDateString={formData?.endDateString || ''}
            closeModal={() => setCurrentModal(0)}
            review={() => prev()}
            confirm={() =>
              setFormData(curr => ({
                ...curr,
                cardId: data?.data[0]?.id,
              }))
            }
          />
        </ModalA>
      )}
      {currentModal === 2 && (
        <ModalA isShown={true} hide={() => {}}>
          <FormSubmit onConfirm={() => navigate(`../${individualSavings}`)} />
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
            redirectUrl={`${individualSavingsForm}?current=3`}
          />
        </ModalA>
      )}
    </>
  );
};

IndSavingsForm.Wrapper = styled.div`
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
      margin: 0.5rem 0;
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
      margin-bottom: 4rem;
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
        h2 {
          color: #33277b;
        }

        .title {
          // margin: 0 2rem;
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
            margin-left: 1rem;
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

    // .ant-steps-item-tail::before {
    //   display: none;
    // }
    // .ant-steps-vertical,
    // .ant-steps-item-tail::after {
    //   display: flex !important;
    //   flex-direction: row !important;
    // }

    @media screen and (max-width: 500px) {
      padding: 1rem;
    }
  }
`;

export default IndSavingsForm;
