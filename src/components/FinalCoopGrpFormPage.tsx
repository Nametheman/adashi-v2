import React from 'react';
import styled from 'styled-components';

import { ReactComponent as MasterCard } from '../assets/icons/mastercard2.svg';
import { ReactComponent as AddIcon } from '../assets/icons/plus-circle.svg';
import { ReactComponent as RightIcon } from '../assets/icons/right.svg';
import grpLeader from '../assets/img/image 1.png';
import { userData } from '../helpers/authHelper';
import { formatNumber } from '../helpers/formatNumbers';
import { useGetCardDataQuery } from '../redux/services/transaction-service';

interface FinalCoopGrpFormPageProps {
  formData: any;
  setCurrentModal: Function;
}

const FinalCoopGrpFormPage = (props: FinalCoopGrpFormPageProps) => {
  const { formData, setCurrentModal } = props;
  const { data, refetch }: any = useGetCardDataQuery();

  React.useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <Wrapper>
      <div className='form-review'>
        <div className='form-header'>
          <div className='title'>
            <div className='plan-name'>
              <h4 className='me-2'>
                <b>{formData.groupName}</b>
              </h4>
              <span>
                {userData().avatar ? (
                  <img
                    src={userData().avatar}
                    alt='group leader'
                    width={40}
                    height={40}
                    style={{
                      borderRadius: '100%',
                    }}
                  />
                ) : (
                  <img
                    src={grpLeader}
                    alt='group leader'
                    width={40}
                    height={40}
                    style={{
                      borderRadius: '100%',
                    }}
                  />
                )}
                <b className='ms-2'>by {formData.groupLeader}</b>
              </span>
            </div>
            <div className='vertical'></div>
            <div className='target'>
              <p style={{ fontSize: '20px', margin: '0 8px 12px 0' }}>Amount</p>
              <h2>
                {formData.amount && (
                  <p>
                    <b>&#8358;&nbsp;{formatNumber(formData.amount)}</b>
                    <span className='lower'> / member</span>
                  </p>
                )}
              </h2>
            </div>
          </div>
          <hr className='line' />
        </div>
        <div className='card-main'>
          <div className='card-row'>
            <div className='amt'>
              <p>Members</p>
              <p>
                <b>{formData.memberNo}</b>
              </p>
            </div>
            <div>
              <p>Frequency</p>
              <p style={{ textTransform: 'capitalize' }}>
                <b>{formData.frequencyValue}</b>
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
              <p>Next Maturity Date</p>
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
          </div>

          <hr className='line' />

          <div className='card-row mb-2'>
            <div>
              <p>Payment</p>
            </div>
            <div>
              {formData.cardId || data?.data.length > 0 ? (
                <p className='d-flex flex-row'>
                  {/* <p className="me-4">Card Saved!</p> */}
                  <span className='bankCard'>
                    <b>
                      <MasterCard />
                    </b>
                    <span className='bankCard_details'>
                      <b>{data?.data[0]?.bank} </b>
                      <b> - {data?.data[0]?.last4}</b>
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
                <p>
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
    </Wrapper>
  );
};

const Wrapper = styled.div`
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
    }
  }
`;

export default FinalCoopGrpFormPage;
