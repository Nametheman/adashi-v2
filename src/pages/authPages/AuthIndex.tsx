import React, { useState } from 'react';
import { Navigate, Outlet, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

import Dashboardheader from '../../components/Dashboardheader';
import LNavbar from '../../components/LNavbar';
import WarningA from '../../components/WarningA';
import ModalA from '../../components/bits/ModalA';
import { logoutUser } from '../../helpers/authHelper';
import { getParams } from '../../helpers/otherHelpers';

type ContextType = { show: boolean; setShow: Function };
type ContextType2 = { showNav: boolean; setShowNav: Function };

type AuthWrapperProps = {
  show: boolean;
};

export function useShow() {
  return useOutletContext<ContextType>();
}

export function useShowNav() {
  return useOutletContext<ContextType2>();
}

function AuthIndex() {
  const [show, setShow] = useState<boolean>(false);
  const [showNav, setShowNav] = useState<boolean>(true);
  const [logoutOpen, setLogoutOpen] = useState<boolean>(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     logoutUser();
  //   }, 10 * 60 * 1000);
  // }, []);

  // if (!localStorage.getItem("token")) {
  //   window.location.pathname = "/";
  // }

  const events = [
    'load',
    'mousemove',
    'click',
    'scroll',
    'keypress',
    'keydown',
    'DOMMouseScroll',
    'mousewheel',
    'mousedown',
    'touchstart',
    'touchmove',
    'MSPointerDown',
    'MSPointerMove',
    'visibilitychange',
  ];

  let timerRef = React.useRef<any>(null);

  // this function sets the timer that open the logout modal after 4 minutes
  const handleLogoutTimer = () => {
    timerRef.current = setTimeout(() => {
      // clears any pending timer.
      resetTimer();
      // Listener clean up. Removes the existing event listener from the window
      Object.values(events).forEach(item => {
        window.removeEventListener(item, resetTimer);
      });
      // opens the modal
      setLogoutOpen(true);
    }, 4 * 60 * 1000);
  };

  // when component mounts, it adds an event listener to the window
  // each time any of the event is triggered, i.e on mouse move, click, scroll, keypress etc, the timer to opens the modal after 4 minutes of inactivity.
  // However, if none of the event is triggered within 4 minutes, that means app is inactive, the modal automatically opens.

  // this resets the timer if it exists.
  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  React.useEffect(() => {
    Object.values(events).forEach(item => {
      window.addEventListener(item, () => {
        resetTimer();
        handleLogoutTimer();
      });
    });
    // eslint-disable-next-line
  }, []);

  const Authenticated = () => {
    return (
      <>
        <AuthIndex.Wrapper show={show}>
          <div className='left' onClick={() => setShow(false)}>
            <div className='l-nav'>
              <LNavbar setOpen={setShow} />
            </div>
          </div>
          <div className='right'>
            {showNav && <Dashboardheader show={show} setShow={setShow} />}
            <Outlet context={{ show, setShow, showNav, setShowNav }} />
            {/* these contexts are available to every component under outlet- */}
          </div>
        </AuthIndex.Wrapper>
        <ModalA isShown={logoutOpen} hide={() => {}}>
          <WarningA
            warningTitle={'Confirm Logout'}
            closeModal={() => {
              setLogoutOpen(false);
            }}
            confirm={() => logoutUser()}
            confirmText={'OK'}
          />
        </ModalA>
      </>
    );
  };

  return localStorage.getItem('token') ? (
    <Authenticated />
  ) : (
    <Navigate
      to={
        window.location.pathname !== '/user'
          ? '/login' + getParams(window.location)
          : `/login`
      }
      // to={
      //   window.location.pathname !== "/user"
      //     ? `/login?redirect=${window.location.pathname}${window.location.search}`
      //     : `/login`
      // }
      replace={true}
    />
  );
}

AuthIndex.Wrapper = styled.div`
  // width: 100vw;
  display: flex;

  .left {
    width: 350px;
    padding: 2rem 2rem 4rem 2rem;
  }
  .right {
    width: calc(100vw - 350px);
  }

  // @media screen and (max-width: 1200px) {
  //   .left {
  //     position: fixed;
  //     top: 0;
  //     left: 0;
  //     width: 350px;
  //     border: 1px solid #f2f2f2;
  //     z-index: 20;
  //     background: #ffffff;
  //     min-height: 100vh;
  //     display: none;
  //   }
  //   .right {
  //     width: 100vw;
  //     min-height: 100vh;
  //   }
  // }

  // @media (min-width: 1160px) {
  //   .d-header {
  //     justify-content: space-between;
  //     button {
  //       display: none;
  //     }
  //   }
  //   .d-text {
  //     display: block;
  //   }
  // }

  @media screen and (max-width: 1160px) {
    flex-direction: column-reverse;
    .left {
      position: fixed;
      top: 0;
      width: 100vw;
      // border: 1px solid #f2f2f2;
      z-index: 20;
      background: rgba(0, 0, 0, 0.75);
      min-height: 100vh;
      height: -webkit-fill-available;
      height: -moz-available;
      transition: all 0.3s linear;
      display: block;
      left: ${({ show }: AuthWrapperProps) => (show ? '0' : '-100vw')};
      border: none;
      overflow-y: auto;
      .l-nav {
        width: 350px;
        border-radius: 20px;
      }
    }
    .right {
      width: 100vw;
      min-height: 100vh;
    }
  }

  @media screen and (max-width: 500px) {
    .left {
      height: 100vh;
      padding: 0;
    }
  }
`;

export default AuthIndex;
