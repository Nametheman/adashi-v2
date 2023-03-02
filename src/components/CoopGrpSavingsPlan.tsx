import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { ReactComponent as BackIcon } from "../assets/icons/back.svg";
import { ReactComponent as EditIcon } from "../assets/icons/edit-plan.svg";
// import { ReactComponent as RollOverIcon } from "../assets/icons/rollover.svg";
import { ReactComponent as TopUpIcon } from "../assets/icons/topup-plan.svg";
import { ReactComponent as WithdrawPlanIcon } from "../assets/icons/withdraw-plan.svg";
// import { userData } from "../helpers/authHelper";
import { grpChartData } from "../helpers/chartData";
import { useGetCoopGroupQuery } from "../redux/services/saving-service";
import {
  cooperativeGroupSavings,
  editCoopGrp,
  savings,
  // savings,
  // withdrawal,
} from "../utils/routes";

import CoopGrpCollectionTable from "./CoopGrpTransactionTable";
import FormSubmit from "./FormSubmit";
import GrpPlanInfo from "./GrpPlanInfo";
// import TopUp from "./TopUp";
import Warning from "./Warning";
import LoadingRoller from "./bits/LoadingRoller";
import ModalA from "./bits/ModalA";
import NoData from "./bits/NoData";
import GrpCollChart from "./charts/GrpCollChart";

const CoopGrpSavingsPlan = () => {
  let params = useParams();
  const planId: string = params.planId || "";
  const { data, isLoading, refetch }: any = useGetCoopGroupQuery(planId);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [currentModal, setCurrentModal] = useState<Number>(0);
  // const [cardHeight, setCardHeight] = useState<number>(0);

  // const cardRef1 = useRef<null | HTMLDivElement>(null);
  // const cardRef2 = useRef<null | HTMLElement>(null);

  // useLayoutEffect(() => {
  //   data &&
  //     cardRef1?.current?.clientHeight &&
  //     setCardHeight(cardRef1.current.clientHeight);
  // }, [data]);

  // console.log(cardHeight);
  // console.log(cardRef1);

  const navigate = useNavigate();

  let allMembersNo: number = 0;
  let collectedMembersNo: number = 0;
  let pendingMembersNo: number = 0;

  if (data) {
    // var { finalAmt, planNames, planColour } = indChartData(data);
    allMembersNo = grpChartData(data).memberNo;
    collectedMembersNo = grpChartData(data).collected;
    pendingMembersNo = grpChartData(data).pending;
  }

  // const rollOverGroup = async (): Promise<void> => {
  //   try {
  //     const res: any = await rollOverCoopGroup(planId);
  //     if (res?.data?.status === "success") {
  //       message.success("Plan rolled over successfully.");
  //       navigate(`../${cooperativeGroupSavings}`);
  //     } else if (res.error) {
  //       message.error(res.error?.data?.message);
  //     } else {
  //       message.error(res.data.message);
  //     }
  //   } catch (error: any) {
  //     message.error(error?.data?.message);
  //   }
  // };

  return (
    <>
      <CoopGrpSavingsPlan.Wrapper>
        {isLoading ? (
          <LoadingRoller />
        ) : data ? (
          <div className="container">
            <h2 style={{ fontWeight: "600", color: "#33277b" }}>{data.name}</h2>
            <hr className="line" />
            <Link
              to={`../${cooperativeGroupSavings}`}
              style={{ textDecoration: "none" }}
              className="back"
            >
              <BackIcon />
              <p>Back</p>
            </Link>
            <div className="ind-carou">
              <div className="icon-row col-12 col-lg-8">
                <div
                  className="plan-icon"
                  onClick={() => navigate(`../${editCoopGrp}/${planId}`)}
                >
                  <EditIcon />
                  <p>Edit Plan</p>
                </div>
                <div
                  // onClick={() => navigate(`../${withdrawal}`)}
                  aria-disabled={true}
                >
                  <WithdrawPlanIcon />
                  <p>Withdraw</p>
                </div>
                <div
                  // onClick={() => setCurrentModal(1)}
                  aria-disabled={true}
                >
                  <TopUpIcon />
                  <p>Top Up</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 p-3">
                <div className="card1">
                  {/* <div className="card1" ref={cardRef1}> */}
                  <div className="title">
                    <h2>
                      <b>Group Collection Chart</b>
                    </h2>
                    <hr className="line" />
                  </div>
                  <GrpCollChart
                    allMembersNo={allMembersNo}
                    collectedMembersNo={collectedMembersNo}
                    pendingMembersNo={pendingMembersNo}
                  />
                </div>
              </div>
              <div className="col-lg-6 p-3">
                <GrpPlanInfo
                  // planInfoRef={cardRef2}
                  startDate={data.start_date}
                  maturityDate={data.end_date}
                  nextCollectingMember={data.next_collecting_member}
                  nextContributionDate={data.next_contribution_date}
                  planType={data.saving_plan}
                  status={data.status}
                  // cardHeight={cardHeight}
                  ownerId={data.owner_id}
                  rollOverGroup={() => setCurrentModal(2)}
                />
              </div>
            </div>
            <CoopGrpCollectionTable
              participants={data.group_saving_participants}
            />
          </div>
        ) : (
          <div className="mt-4 pt-4">
            <NoData text="Please check your internet connection or reload the page." />
          </div>
        )}
      </CoopGrpSavingsPlan.Wrapper>
      {/* {currentModal === 1 && (
        <ModalA isShown={true} hide={() => {}}>
          <TopUp
            closeModal={() => setCurrentModal(0)}
            addCardModal={() => setCurrentModal(4)}
            // updCard={handleAcctChange}
            // updAmt={handleTotalAmtChange}
            // func={setCurrentModal}
            // totalAmt={planData.totalAmt}
            // pageUp={savings}
            setCurrentModal={setCurrentModal}
            fromStash={true}
          />
        </ModalA>
      )} */}
      {currentModal === 2 && (
        <ModalA isShown={true} hide={() => {}}>
          <Warning
            warningTitle={"Great Choice!!"}
            warningText={
              <p>
                You have decided to roll over <b>"{data?.name}"</b>. You will be
                required to reset the group payout order.
              </p>
            }
            closeModal={() => setCurrentModal(0)}
            confirm={() => navigate(`./rollover`)}
            confirmText={"Continue"}
          />
        </ModalA>
      )}
      {currentModal === 3 && (
        <ModalA isShown={true} hide={() => {}}>
          <FormSubmit onConfirm={() => navigate(`../${savings}`)} top={true} />
        </ModalA>
      )}
    </>
  );
};

CoopGrpSavingsPlan.Wrapper = styled.div`
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
      // font-size: 16px;
      align-items: center;
      p {
        margin: 0 0 0 1rem;
      }
      margin: 1rem 0;
    }

    .row {
      justify-content: space-between;
    }

    .ind-carou {
      display: flex;
      flex-direction: column;
      // justify-content space-between;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      background: #33277b;
      border-radius: 20px;
      color: #fff;
      padding: 1rem 6rem;
      margin-bottom: 2rem;

      // .header-row {
      //   display: flex;
      //   flex-direction: row;
      //   justify-content: space-between;
      //   width: 100%;
      // }

      .icon-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        // width: 60%;
        margin-top: 1rem;

        p {
          margin-top: 1rem;
        }

        .plan-icon {
          cursor: pointer;
        }
      }
    }

    .title {
      h2 {
        color: #33277b;
      }
      // margin-bottom: 1rem;
      width: 100%;
    }

    .card1 {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      // padding: 1rem;
      // background: rgba(207, 232, 222, 0.2);
      border: 1px solid rgba(0, 0, 0, 0.4);
      border-radius: 20px;
      min-height: 450px;
      padding: 1rem 2rem;
      
      .roll {
        display: flex;
        flex-direction: row;
        cursor: pointer;
        justify-content: center;
        color: #059157;
        margin-left: auto;
        margin: 0.5rem 0;
      }
    }
    .card2 {
      border-radius: 20px;
    }
  
    .card1:hover,
    .card1:focus,
    .card1:active,
    .card2:hover,
    .card2:focus,
    .card2:active
     {
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    }

    .trans-text {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      font-weight: 600;
    }

    .trans-table {
      // font-size: 16px;
      table {
      },
        th {
          padding: 0.5rem;
        }
        td {
          color: #33277b;
          padding: 1rem;
        }
        tr {
          background: rgba(207, 232, 222, 0.1);
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
          border-radius: 10px;
          padding: 1rem;
        }
      }
      .header{
        color: #47486B99;

      }
  
      @media screen and (max-width: 500px) {
        font-size: 12px;
        padding: 0;
      }
  
    }

    @media screen and (max-width: 950px) {
      .ind-carou {
        padding: 1rem 4rem;
      }
    }

    @media screen and (max-width: 500px) {
      padding: 1rem;
      .ind-carou {
        padding: 1rem 2rem !important;
      }
    }
  }
`;

export default CoopGrpSavingsPlan;
