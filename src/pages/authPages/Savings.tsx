// import { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// import { useShowNav } from "./AuthIndex";
import { ReactComponent as BackIcon } from '../../assets/icons/back.svg';
import cooperativeGroupImg from '../../assets/img/CooperativeGroupSavings.svg';
import individualImg from '../../assets/img/IndividualSavings.svg';
import stashImg from '../../assets/img/MyStash.svg';
import targetGroupImg from '../../assets/img/TargetGroupSavings.svg';
import {
  // cooperativeGroupSavings,
  cooperativeGroupSavingsLanding,
  individualSavings,
  stash,
  targetGroupSavings,
} from '../../utils/routes';

const Savings = () => {
  const navigate = useNavigate();
  // const { setShowNav } = useShowNav();
  // useEffect(() => {
  //   setShowNav(true);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <SavingsWrapper>
      <div className='container'>
        <h2 style={{ fontWeight: '600', color: '#33277b' }}>Plan Types</h2>
        <hr className='line' />
        <Link to={`..`} style={{ textDecoration: 'none' }} className='back'>
          <BackIcon />
          <p>Back</p>
        </Link>
        <div className='row'>
          <div className='col-lg-6 p-4'>
            <div
              className='card1'
              onClick={() => navigate(`../${stash}`, { replace: true })}
            >
              <img src={stashImg} className='mb-2' alt='My Purse' />
              <p className='title'>
                <b>My Purse</b>
              </p>
              <p>Keep easily accessible funds and withdraw anytime.</p>
            </div>
          </div>
          <div className='col-lg-6 p-4'>
            <div
              className='card1'
              onClick={() =>
                navigate(`../${individualSavings}`, { replace: true })
              }
            >
              <img
                src={individualImg}
                className='mb-2'
                alt='Individual Plans'
              />
              <p className='title'>
                <b>Individual Plans</b>
              </p>
              <p>
                Contribute money on your own terms for a minimum of 3 months and
                get juicy rewards.
              </p>
            </div>
          </div>
          <div className='col-lg-6 p-4'>
            <div
              className='card1'
              onClick={() =>
                navigate(`../${targetGroupSavings}`, { replace: true })
              }
            >
              <img
                src={targetGroupImg}
                className='mb-2'
                alt='Target Group Plans'
              />
              <p className='title'>
                <b>Target Group Plans</b>
              </p>
              <p>
                Contribute money towards a shared goal with friends and family.
              </p>
            </div>
          </div>
          <div className='col-lg-6 p-4'>
            <div
              className='card1'
              onClick={() =>
                navigate(`../${cooperativeGroupSavingsLanding}`, {
                  replace: true,
                })
              }
            >
              <img
                src={cooperativeGroupImg}
                className='mb-2'
                alt='Cooperative Group Contributions'
              />
              <p className='title'>
                <b>Cooperative Group Contributions</b>
              </p>
              <p>
                Create group contributions with peers and make rotatory
                collections on your preferred payout date.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SavingsWrapper>
  );
};

export const SavingsWrapper = styled.div`
  .container {
    padding: 2rem;
    color: #33277b;

    .line {
      // border: 0.4px solid rgba(0, 0, 0, 0.4) !important;
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

    .title {
      color: #33277b;
      font-size: 18px;
    }

    .card1 {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      // justify-content: center;
      padding: 1rem 3rem 1rem 3rem;
      color: #47486b;
      // font-size: 16px;
      background: rgba(207, 232, 222, 0.2);
      border-radius: 16px;
      cursor: pointer;
      height: 100%;
      border: 0.1px solid rgba(51, 39, 123, 0.05);

      img {
        height: 70px;
      }
    }

    .card1:hover,
    .card1:focus,
    .card1:active {
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    }

    @media screen and (max-width: 500px) {
      padding: 1rem;
    }
  }
`;

export default Savings;
