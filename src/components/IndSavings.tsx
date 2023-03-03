import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// import { useShowNav } from "../pages/authPages/AuthIndex";
import { ReactComponent as BackIcon } from '../assets/icons/back.svg';
import { ReactComponent as PlusImg } from '../assets/icons/plus.svg';
import { useGetIndSavingsAllQuery } from '../redux/services/saving-service';
import { individualSavingsForm, savings } from '../utils/routes';

import SavingsCard from './SavingsCard';
import NoData from './bits/NoData';
import SavingsCarousel from './bits/SavingsCarousel';
import SkeletonCards from './bits/SkeletonCards';

const IndSavings = () => {
  const navigate = useNavigate();
  const { data, refetch, isLoading }: any = useGetIndSavingsAllQuery();
  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IndSavings.Wrapper>
      <div className='container'>
        <h2 style={{ fontWeight: '600', color: '#33277b' }}>
          Individual Plans
        </h2>
        <hr className='line' />
        <Link
          to={`../${savings}`}
          style={{ textDecoration: 'none' }}
          className='back'
        >
          <BackIcon />
          <p>Back</p>
        </Link>
        <div className='ind-carou'>
          <div className='col-7'>
            <SavingsCarousel />
          </div>
          <div className='col-md-5 create'>
            <button
              className='ind-btn'
              onClick={() => navigate(`../${individualSavingsForm}`)}
            >
              <PlusImg />
              Create new
            </button>
          </div>
        </div>
        <div className='row'>
          {isLoading ? (
            <SkeletonCards />
          ) : data?.length > 0 ? (
            <>
              {data?.map((plan: any, index: number) => {
                const { status, name, target_amount, id, end_date, balance } =
                  plan;

                return (
                  <div className='col-lg-6 p-4' key={index}>
                    <SavingsCard
                      status={
                        target_amount === balance.toString()
                          ? 'Completed'
                          : status
                      }
                      title={name}
                      totalAmt={target_amount}
                      id={id}
                      achievedAmt={parseFloat(balance)}
                      func={() =>
                        navigate(`../individual-savings/${id}`, {
                          replace: true,
                        })
                      }
                      endDate={end_date}
                      // rate={item.rate}
                    />
                  </div>
                );
              })}
            </>
          ) : (
            <div className='mt-4 pt-4'>
              <NoData
                text="You have not yet created a plan. You can create one by clicking the 'Create new' button above"
                // link="/user/savings"
              />
            </div>
          )}
        </div>
      </div>
    </IndSavings.Wrapper>
  );
};

IndSavings.Wrapper = styled.div`
  .container {
    padding: 2rem;
    color: #33277b !important;

    .line {
      // border: 1px solid rgba(0, 0, 0, 0.4);
    }

    .row {
      justify-content: space-between;
    }

    .back {
      display: flex;
      color: #33277b;
      // font-size: 16px;
      align-items: center;
      p {
        margin: 0 0 0 1rem;
      }
      margin: 1rem 0;
    }

    .ind-carou {
      display: flex;
      flex-direction: row;
      justify-content space-between;
      background: #33277b;
      border-radius: 20px;
      padding: 1rem 2rem 1rem 2rem;
      color: #fff;
      margin-bottom: 2rem;

      .savings {
        display: flex;
        flex-direction: row;
        align-items: bottom;
        h2 {
          color: #fff !important;
        }
        .savingsIcon {
          margin-inline-end: 0.25rem;
        }
      }
      .create {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: end;
      }
    }

    .ind-btn{
      padding: 0.5rem 1rem;
      display: flex;
      flex-direction: row;
      justify-content space-between;
      align-items: center;
      color: #059157;
      // font-size: 16px;
      border-radius: 10px;
      min-width: 150px;
      border: 1px solid transparent;
      cursor: pointer;
    }

    @media screen and (max-width: 500px) {
      padding: 1rem;
      .ind-carou {
        display: flex;
        flex-direction: column;
        justify-content space-between;
        align-items: start;
      }
    }
  }
`;

export default IndSavings;
