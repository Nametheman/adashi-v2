import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import logoutImg from '../assets/icons/d-nav-logout.svg';
import notifImg from '../assets/icons/d-nav-notif.svg';
import profImg from '../assets/img/image 1.png';
import { logoutUser, userData } from '../helpers/authHelper';
// import { useGetUserProfileQuery } from "../redux/services/auth-services";
import {
  useGetCoopGroupInvitesQuery,
  useGetTarGroupInvitesQuery,
} from '../redux/services/saving-service';
import { updateNo } from '../redux/slices/notification-slice';
import { useAppDispatch } from '../redux/store';
import { settings } from '../utils/routes';

import { Burger } from './UnAuthNavbar';
import Warning from './Warning';
import ModalA from './bits/ModalA';

type DHProps = {
  show: boolean;
  setShow: Function;
};

const Dashboardheader = ({ show, setShow }: DHProps) => {
  // const notifNos = useAppSelector(
  //   (state: RootState) => state.notifications.value
  // );

  const [logoutOpen, setLogoutOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { data: coopData, refetch: coopRefetch }: any =
    useGetCoopGroupInvitesQuery();
  const { data: tarData, refetch: tarRefetch }: any =
    useGetTarGroupInvitesQuery();

  const notifData = coopData && tarData && [...coopData, ...tarData];
  const notifNo: number = notifData?.length;

  useEffect(() => {
    coopRefetch();
    tarRefetch();
    dispatch(updateNo(notifNo));
  }, [coopRefetch, tarRefetch, notifNo, dispatch]);

  return (
    <>
      <Wrapper>
        <Burger open={show} setOpen={setShow} />
        <div className='d-nav'>
          <NavLink to={settings} className='tnav-link'>
            {userData().avatar ? (
              <img
                src={userData().avatar}
                alt='notifications icon'
                className='nav-img'
                style={{
                  borderRadius: '100%',
                }}
              />
            ) : (
              <img
                src={profImg}
                alt='notifications icon'
                className='nav-img'
                style={{
                  borderRadius: '100%',
                }}
              />
            )}
          </NavLink>

          <NavLink to='settings?tab=4' className='tnav-link-notif'>
            <img src={notifImg} className='nav-img' alt='notifications icon' />
            {notifNo > 0 && <span className='notif-no'>{notifNo}</span>}
          </NavLink>

          <NavLink
            to='#'
            onClick={() => setLogoutOpen(true)}
            className='tnav-link'
          >
            <img
              src={logoutImg}
              className='logout-img'
              alt='logout icon'
              // height={"30px"}
              // width={"30px"}
            />
            <p className='mb-0'>Logout</p>
          </NavLink>
        </div>
      </Wrapper>
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

const Wrapper = styled.div`
  display: none;
  padding: 2rem;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  //   margin-top: 2rem;

  button {
    display: none;
  }
  .d-nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    min-width: 25%;
    align-items: start;

    .nav-img {
      height: 40px;
      width: 40px;
    }
    .logout-img {
      height: 30px;
      width: 30px;
    }
    .nav-sub {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }
    .tnav-link {
      margin-left: 2rem;
      text-decoration: none;
      color: #33277b;
    }

    .tnav-link-notif {
      margin-left: 2rem;
      text-decoration: none;
      color: #33277b;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 100%;
      position: relative;

      .notif-no {
        background-color: #33277b;
        border-radius: 100%;
        padding: 0.2rem 0.5rem;
        color: white;
        cursor: pointer;
        position: absolute;
        z-index: 10;
        right: -10px;
        top: -13px;
        font-size: 12px;
      }
    }
  }

  @media screen and (max-width: 1160px) {
    display: flex;
    justify-content: space-between;
    button {
      display: flex;
    }
    .d-nav {
      min-width: 35%;
    }
  }

  @media screen and (max-width: 800px) {
    .d-nav {
      width: 50%;
    }
  }

  @media screen and (max-width: 500px) {
    padding: 1rem;
    .d-nav {
      width: 50%;
      // margin-right: 2rem;
      .tnav-link {
        margin-left: 0;
      }
      .tnav-link-notif {
        margin-left: 0;
      }

      .nav-img {
        height: 30px !important;
        width: 30px !important;
      }
      .logout-img {
        height: 20px !important;
        width: 20px !important;
      }
    }
  }
`;

export default Dashboardheader;
