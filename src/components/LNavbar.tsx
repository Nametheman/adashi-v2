import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { ReactComponent as DashboardIcon } from '../assets/icons/dashboard.svg';
import logo from '../assets/icons/logo2 1.svg';
import { ReactComponent as LogoutIcon } from '../assets/icons/logout.svg';
import { ReactComponent as MyAcctIcon } from '../assets/icons/my-acct.svg';
import navgen from '../assets/icons/nav-gen.svg';
import { ReactComponent as SavingsIcon } from '../assets/icons/savings.svg';
import { ReactComponent as TransactionsIcon } from '../assets/icons/transactions.svg';
import { ReactComponent as WithdrawalIcon } from '../assets/icons/withdrawal.svg';
import { logoutUser } from '../helpers/authHelper';
import {
  savings,
  settings,
  transactions,
  user,
  withdrawal,
} from '../utils/routes';

import Warning from './Warning';
import ModalA from './bits/ModalA';

type LNavbarProps = {
  setOpen: Function;
};

const LNavbar = ({ setOpen }: LNavbarProps) => {
  const [logoutOpen, setLogoutOpen] = useState<boolean>(false);
  const router = useLocation();

  return (
    <>
      <LNavbar.Wrapper onClick={() => setOpen(false)}>
        <div className='container'>
          <Link to={user}>
            <img src={logo} alt='Adashi-Logo' width='80px' height='78px' />
          </Link>
          <ul>
            <li className='nav-item'>
              <NavLink
                to={user}
                className={`nav-link ${
                  router.pathname === '/user' ? 'activ' : ''
                }`}
              >
                <DashboardIcon className='nav-svg' />
                <span className='ms-3'>Dashboard</span>
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to={savings}
                className={`nav-link ${
                  router.pathname === '/user/savings' ? 'activ' : ''
                }`}
                // className={(isActive) => "nav-link" + (isActive ? " activ" : "")}
                // end={true}
                // className={
                //   window.location.pathname.includes("savings")
                //     ? "nav-link activ"
                //     : "nav-link"
                // }
                // onClick={() => console.log(window.location.pathname)}
              >
                <SavingsIcon className='nav-svg' />
                <span className='ms-3'>Plans</span>
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to={transactions}
                className={`nav-link ${
                  router.pathname === '/user/transactions' ? 'activ' : ''
                }`}
              >
                <TransactionsIcon className='nav-svg' />
                <span className='ms-3'>Transactions</span>
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to={withdrawal}
                className={`nav-link ${
                  router.pathname === '/user/withdrawal' ? 'activ' : ''
                }`}
              >
                <WithdrawalIcon className='nav-svg' />
                <span className='ms-3'>Withdrawal</span>
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to={settings}
                className={`nav-link ${
                  router.pathname === '/user/settings' ? 'activ' : ''
                }`}
              >
                <MyAcctIcon className='nav-svg' />
                <span className='ms-3'>My Account</span>
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to='#'
                className='nav-link'
                onClick={() => setLogoutOpen(true)}
              >
                <LogoutIcon className='nav-svg' />
                <span className='ms-3'>Log out</span>
              </NavLink>
            </li>
          </ul>
          <img
            src={navgen}
            alt='GenerateMonthly'
            width={'200px'}
            height='161.63px'
          />
        </div>
      </LNavbar.Wrapper>
      <ModalA isShown={logoutOpen} hide={() => {}}>
        <Warning
          warningTitle={'Confirm Logout'}
          warningText={<p>Are you sure you want to logout?</p>}
          closeModal={() => setLogoutOpen(false)}
          confirm={() => logoutUser()}
          confirmText={'OK'}
        />
      </ModalA>
    </>
  );
};

LNavbar.Wrapper = styled.div`
  .container {
    border-radius: 20px;
    display: flex;
    background: #e6f4ee;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    min-height: 100vh;
    // height: 100vh;
    padding-bottom: 1rem;
    font-weight: 600;

    position: fixed;
    width: 290px;

    ul {
      list-style-type: none;
      margin: 0px;
      padding: 0px;
    }

    .nav-item {
      .nav-link {
        // margin-bottom: 1rem;
        color: #33277b;
        padding: 0.5rem 1rem 0.5rem 1rem;
        margin: 1rem;
        border-radius: 8px;
        // font-size: 16px;
        font-style: normal;
        // font-weight: 600;
        // line-height: 24px;
      }
      .nav-svg {
        fill: #33277b;
        width: 25px;
      }

      .activ {
        color: #fff;
        background: #33277bcc;
        // padding: 0.8rem 2.6rem;
        .nav-svg {
          fill: #fff;
        }
      }

      .nav-link:hover,
      .nav-link:focus,
      .nav-link:active {
        color: #fff;
        background: #33277bcc;
        .nav-svg {
          fill: #fff;
        }
      }
    }
  }

  @media (max-width: 800px) {
    width: 250px;
    background: #ffffff;
    // height: -webkit-fill-available;
    min-height: 100vh;
  }
`;

export default LNavbar;
