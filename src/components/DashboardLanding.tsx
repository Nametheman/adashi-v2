import { useEffect, useLayoutEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

import logoutImg from "../assets/icons/d-nav-logout.svg";
import notifImg from "../assets/icons/d-nav-notif.svg";
import { ReactComponent as NairaIcon } from "../assets/icons/naira-icon.svg";
import profImg from "../assets/img/image 1.png";
import { logoutUser, userData } from "../helpers/authHelper";
import { indChartData, tarGrpChartData } from "../helpers/chartData";
import { formatNumber } from "../helpers/formatNumbers";
import { useShow, useShowNav } from "../pages/authPages/AuthIndex";
import { useGetUserProfileQuery } from "../redux/services/auth-services";
import {
  useGetCoopGroupInvitesQuery,
  useGetIndSavingsAllQuery,
  useGetTarGroupInvitesQuery,
  useGetTarGroupJoinedQuery,
} from "../redux/services/saving-service";
import { updateStatus } from "../redux/slices/amountDisplay-slice";
import { updateNo } from "../redux/slices/notification-slice";
import { updateBVNStatus } from "../redux/slices/requestBVN-slice";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import { settings, transactions } from "../utils/routes";

import AddBank from "./AddBank";
import DCardRow1 from "./DCardRow1";
import DCardRow2 from "./DCardRow2";
import FormSubmit from "./FormSubmit";
import TransactionTable2 from "./TransactionTable2";
import { Burger } from "./UnAuthNavbar";
import Warning from "./Warning";
import AdCarousel from "./bits/AdCarousel";
import AmountDisplay from "./bits/AmountDisplay";
import LoadingRoller from "./bits/LoadingRoller";
import ModalA from "./bits/ModalA";

const DashboardLanding = () => {
  const { show: open, setShow: setOpen } = useShow();
  const { setShowNav } = useShowNav();
  // const [stashBal, setStashBal] = useState(0);
  const [logoutOpen, setLogoutOpen] = useState<boolean>(false);
  const [currentModal, setCurrentModal] = useState<number>(0);

  const dispatch: any = useAppDispatch();

  const amountDisplayState = useAppSelector(
    (state: RootState) => state.amountDisplay
  );

  const requestBVNState = useAppSelector(
    (state: RootState) => state.requestBVN
  );

  // const { open, setOpen, setShowNav } = props;
  const {
    data: userData1,
    isLoading: userData1Loading,
    refetch: userRefetch,
  }: any = useGetUserProfileQuery();
  const {
    data: indData,
    isLoading: indDataLoading,
    refetch: indRefetch,
  }: any = useGetIndSavingsAllQuery();
  const {
    data: coopData,
    isLoading: coopDataLoading,
    refetch: coopRefetch,
  }: any = useGetCoopGroupInvitesQuery();
  const {
    data: tarData,
    isLoading: tarDataLoading,
    refetch: tarRefetch,
  }: any = useGetTarGroupInvitesQuery();
  const {
    data: joinedGroups,
    isLoading: joinedGroupsLoading,
    refetch: refetchJoined,
  }: any = useGetTarGroupJoinedQuery();

  // component will mount, then return for when the component is unmounting
  useLayoutEffect(() => {
    setShowNav(false);
    //set it to false because we already have a horizontal navbar on dashboard landing page
    return () => {
      setShowNav(true);
    };
  }, [setShowNav]);

  useEffect(() => {
    if (
      !requestBVNState.bvnViewed &&
      userData1?.user_profile?.bvn_verified === 0
    ) {
      setCurrentModal(1);
    }
  }, [requestBVNState.bvnViewed, userData1?.user_profile?.bvn_verified]);

  // useEffect(() => {
  //   setStashBal(parseFloat(userData1?.wallet.balance));
  // }, [userData1]);

  const notifData = coopData && tarData && [...coopData, ...tarData];
  const notifNo: number = notifData?.length;

  useEffect(() => {
    indRefetch();
    coopRefetch();
    tarRefetch();
    refetchJoined();
    userRefetch();
    dispatch(updateNo(notifNo));
  }, [
    indRefetch,
    coopRefetch,
    tarRefetch,
    refetchJoined,
    userRefetch,
    notifNo,
    dispatch,
  ]);

  let indChartAmt: number[] = [];
  let tarGrpChartAmt: number[] = [];

  indData &&
    indData.length > 0 &&
    (indChartAmt = indChartData(indData).finalAmt);

  joinedGroups &&
    joinedGroups.length > 0 &&
    (tarGrpChartAmt = tarGrpChartData(joinedGroups).finalAmt);

  // for individual savings amount
  const indAmt =
    indChartAmt.length > 0
      ? indChartAmt.reduce((prev: number, curr: number) => prev + curr)
      : 0;
  const indAmtNaira = indAmt
    ? formatNumber(parseInt(indAmt.toFixed(2).split(".")[0]))
    : 0;
  const indAmtKobo = indAmt ? indAmt.toFixed(2).split(".")[1] : "00";

  // for target group savings amount
  const tarGrpAmt =
    tarGrpChartAmt.length > 0
      ? tarGrpChartAmt.reduce((prev: number, curr: number) => prev + curr)
      : 0;
  const tarGrpAmtNaira = tarGrpAmt
    ? formatNumber(parseInt(tarGrpAmt.toFixed(2).split(".")[0]))
    : 0;
  const tarGrpAmtKobo = tarGrpAmt ? tarGrpAmt.toFixed(2).split(".")[1] : "00";

  // for stash balance
  const stashBal = parseFloat(userData1?.wallet.balance);
  const stashBalNaira = stashBal
    ? formatNumber(parseInt(stashBal.toFixed(2).split(".")[0]))
    : 0;
  const stashBalKobo = stashBal ? stashBal.toFixed(2).split(".")[1] : "00";

  // for total savings amount
  const totalAmt = indAmt + stashBal + tarGrpAmt;
  const totalAmtNaira = totalAmt
    ? formatNumber(parseInt(totalAmt.toFixed(2).split(".")[0]))
    : 0;
  const totalAmtKobo = totalAmt ? totalAmt.toFixed(2).split(".")[1] : "00";

  const hideAmount = () => {
    dispatch(updateStatus());
  };

  return (
    <>
      <DashboardLanding.Wrapper>
        <div className="container">
          <div className="d-header">
            <Burger open={open} setOpen={setOpen} />
            <span className="d-text">Welcome, {userData().name}</span>
            <div className="d-nav">
              <NavLink to={settings} className="tnav-link">
                {userData().avatar ? (
                  <img
                    src={userData().avatar}
                    alt="user display icon"
                    className="nav-img"
                    style={{
                      borderRadius: "100%",
                    }}
                  />
                ) : (
                  <img
                    src={profImg}
                    alt="user display icon"
                    className="nav-img"
                    style={{
                      borderRadius: "100%",
                    }}
                  />
                )}
              </NavLink>

              <NavLink to="settings?tab=4" className="tnav-link-notif">
                <img
                  src={notifImg}
                  className="nav-img"
                  alt="notifications icon"
                />
                {notifNo > 0 && <span className="notif-no">{notifNo}</span>}
              </NavLink>

              <NavLink
                to="#"
                onClick={() => setLogoutOpen(true)}
                className="tnav-link"
              >
                <img src={logoutImg} className="logout-img" alt="logout icon" />
                <p className="mb-0">Logout</p>
              </NavLink>
            </div>
          </div>
          {userData1Loading ||
          indDataLoading ||
          coopDataLoading ||
          tarDataLoading ||
          joinedGroupsLoading ? (
            <LoadingRoller />
          ) : (
            <>
              <span className="m-text">Welcome, {userData().name}</span>
              <div className="mt-4">
                <AdCarousel sliderColour="#059157">
                  <div>
                    <p>Total Balance</p>
                    {/* <h2 className="my-0">
                <b>&#8358;&nbsp; 100,000</b>
              </h2> */}
                    <h2 className="my-0 savings">
                      <NairaIcon className="savingsIcon" />
                      <AmountDisplay
                        text={`${totalAmtNaira}.${totalAmtKobo}`}
                        isAsterisk={amountDisplayState.asteriskStatus}
                      />
                      {amountDisplayState.asteriskStatus ? (
                        <i
                          onClick={() => hideAmount()}
                          style={{ opacity: 1, fontSize: "18px" }}
                          className={"far fa-eye-slash ast"}
                        ></i>
                      ) : (
                        <i
                          onClick={() => hideAmount()}
                          style={{ opacity: 1, fontSize: "18px" }}
                          className={"fas fa-eye-slash ast"}
                        ></i>
                      )}
                    </h2>
                  </div>
                  <div>
                    <p>Individual Balance</p>
                    <h2 className="my-0 savings">
                      <NairaIcon className="savingsIcon" />
                      <AmountDisplay
                        text={`${indAmtNaira}.${indAmtKobo}`}
                        isAsterisk={amountDisplayState.asteriskStatus}
                      />
                      {amountDisplayState.asteriskStatus ? (
                        <i
                          onClick={() => hideAmount()}
                          style={{ opacity: 1, fontSize: "18px" }}
                          className={"far fa-eye-slash ast"}
                        ></i>
                      ) : (
                        <i
                          onClick={() => hideAmount()}
                          style={{ opacity: 1, fontSize: "18px" }}
                          className={"fas fa-eye-slash ast"}
                        ></i>
                      )}
                    </h2>
                  </div>
                  <div>
                    <p>Target Group Balance</p>
                    <h2 className="my-0 savings">
                      <NairaIcon className="savingsIcon" />
                      <AmountDisplay
                        text={`${tarGrpAmtNaira}.${tarGrpAmtKobo}`}
                        isAsterisk={amountDisplayState.asteriskStatus}
                      />
                      {amountDisplayState.asteriskStatus ? (
                        <i
                          onClick={() => hideAmount()}
                          style={{ opacity: 1, fontSize: "18px" }}
                          className={"far fa-eye-slash ast"}
                        ></i>
                      ) : (
                        <i
                          onClick={() => hideAmount()}
                          style={{ opacity: 1, fontSize: "18px" }}
                          className={"fas fa-eye-slash ast"}
                        ></i>
                      )}
                    </h2>
                  </div>
                  <div>
                    <p>My Purse</p>
                    <h2 className="my-0 savings">
                      <NairaIcon className="savingsIcon" />
                      <AmountDisplay
                        text={`${stashBalNaira}.${stashBalKobo}`}
                        isAsterisk={amountDisplayState.asteriskStatus}
                      />

                      {amountDisplayState.asteriskStatus ? (
                        <i
                          onClick={() => hideAmount()}
                          style={{ opacity: 1, fontSize: "18px" }}
                          className={"far fa-eye-slash ast"}
                        ></i>
                      ) : (
                        <i
                          onClick={() => hideAmount()}
                          style={{ opacity: 1, fontSize: "18px" }}
                          className={"fas fa-eye-slash ast"}
                        ></i>
                      )}
                    </h2>
                  </div>
                </AdCarousel>
              </div>
              <DCardRow1
                stashBalNaira={stashBalNaira}
                stashBalKobo={stashBalKobo}
              />
              <p className="desc-text" style={{ fontWeight: "600" }}>
                Let's Get Started!
              </p>
              <DCardRow2 />
              <div className="trans-text">
                <p className="desc-text">Recent Transactions</p>
                <Link
                  to={transactions}
                  style={{ textDecoration: "none", color: "#059157" }}
                >
                  See All
                </Link>
              </div>
              <div className="trans">
                <TransactionTable2 />
              </div>
            </>
          )}
        </div>
      </DashboardLanding.Wrapper>
      <ModalA isShown={logoutOpen} hide={() => {}}>
        <Warning
          warningTitle={"Confirm Logout"}
          warningText={<p>Are you sure you want to logout?</p>}
          closeModal={() => setLogoutOpen(false)}
          confirm={() => logoutUser()}
          confirmText={"OK"}
        />
      </ModalA>
      {currentModal === 1 && (
        <ModalA isShown={true} hide={() => {}}>
          <Warning
            warningTitle={"Add your BVN"}
            warningText={
              <p>
                You need to add your Bank Verification Number (BVN) to perform
                any transaction. Please click <b>Proceed</b> to do this
              </p>
            }
            closeModal={() => {
              setCurrentModal(0);
              dispatch(updateBVNStatus(true));
            }}
            confirm={() => {
              setCurrentModal(2);
              dispatch(updateBVNStatus(true));
            }}
            confirmText={"Proceed"}
          />
        </ModalA>
      )}
      {currentModal === 2 && (
        <ModalA isShown={true} hide={() => {}}>
          <AddBank func={setCurrentModal} num={3} />
        </ModalA>
      )}
      {currentModal === 3 && (
        <ModalA isShown={true} hide={() => {}}>
          <FormSubmit onConfirm={() => setCurrentModal(0)} />
        </ModalA>
      )}
    </>
  );
};

DashboardLanding.Wrapper = styled.div`
  .d-header {
    color: #33277b;
    display: flex !important;
    // padding: 2rem;
    padding: 2rem 0;
    flex-direction: row;
    // justify-content: end;
    align-items: center;
    //   margin-top: 2rem;
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
    .d-text {
      margin-top: 1rem;
      font-weight: 600;
      font-size: 30px;
      // color: #33277b;
      text-transform: capitalize;
    }
  }

  .container {
    display: flex;
    flex-direction: column;
    // padding: 2rem;
    // font-weight: 600;
    color: #33277b;
    // // font-size: 16px;

    .m-text {
      margin-top: 1rem;
      font-weight: 600;
      font-size: 30px;
      // color: #33277b;
      text-transform: capitalize;
    }

    .dCarou {
      display: flex;
      flex-direction: column;
    }

    .carou {
      li button {
        background: #059157;
      }
      /* libutton: hover, libutton: focus {
        background: #059157;
      } */
      li button::selection {
        background: #059157;
      }
    }

    .trans-text {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    .savings {
      display: flex;
      flex-direction: row;
      align-items: center;
      .savingsIcon {
        margin-inline-end: 0.25rem;
        margin-bottom: 0.5rem;
      }
      .ast {
        margin-inline-start: 1rem;
      }
    }

    // .card-row1 {
    //   //   margin-top: 1rem;
    //   display: flex;
    //   flex-direction: row;
    //   justify-content: space-evenly;
    // }
  }

  @media (min-width: 1160px) {
    .d-header {
      justify-content: space-between;
      button {
        display: none;
      }
    }
    .d-text {
      display: block;
    }
    .m-text {
      display: none;
    }
  }

  @media (max-width: 1160px) {
    .d-header {
      justify-content: space-between;
      button {
        display: flex;
      }
      .d-nav {
        min-width: 35%;
      }
    }
    .d-text {
      display: none;
    }
    .m-text {
      display: block;
    }
  }

  @media screen and (max-width: 800px) {
    .d-nav {
      width: 50%;
    }
  }

  @media (max-width: 500px) {
    .d-nav {
      width: 50%;
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
    .m-text {
      margin-top: 0 !important;
      font-size: 22px !important;
    }
    .desc-text {
      margin-bottom: 0;
    }
    .savingsIcon {
      width: 13px;
      height: 14px;
      margin-bottom: 0.25rem !important;
    }
    .ast {
      width: 17.5px;
      height: 14px;
    }
    .trans {
      overflow-x: none;
    }
  }

  @media (max-width: 400px) {
    .d-nav {
      margin-right: 1.5rem;
    }
  }
`;

export default DashboardLanding;
