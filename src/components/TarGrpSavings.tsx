import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { ReactComponent as BackIcon } from "../assets/icons/back.svg";
import { ReactComponent as PlusImg } from "../assets/icons/plus.svg";
import { userData } from "../helpers/authHelper";
import {
  // useGetTarGroupPendingQuery,
  useGetTarGroupInvitesQuery,
  useGetTarGroupJoinedQuery,
} from "../redux/services/saving-service";
import { savings, targetGroupSavingsForm } from "../utils/routes";

import SavingsCard from "./SavingsCard";
// import memberImg from "../assets/img/grp-savings.png";
import NoData from "./bits/NoData";
import SavingsCarousel from "./bits/SavingsCarousel";
import SkeletonCards from "./bits/SkeletonCards";

const TarGrpSavings = () => {
  const navigate = useNavigate();
  // const {
  //   data: createdGroups,
  //   refetch: refetchCreated,
  //   isLoading: isLoadingCreated,
  // }: any = useGetTarGroupCreatedQuery();
  const {
    data: pendingGroups,
    refetch: refetchPending,
    isLoading: isLoadingPending,
  }: any = useGetTarGroupInvitesQuery();
  const {
    data: joinedGroups,
    refetch: refetchJoined,
    isLoading: isLoadingJoined,
  }: any = useGetTarGroupJoinedQuery();
  useEffect(() => {
    refetchPending();
    refetchJoined();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TarGrpSavings.Wrapper>
      <div className="container">
        <h2 style={{ fontWeight: "600", color: "#33277b" }}>
          Target Group Plans
        </h2>
        <hr className="line" />
        <Link
          to={`../${savings}`}
          style={{ textDecoration: "none" }}
          className="back"
        >
          <BackIcon />
          <p>Back</p>
        </Link>
        <div className="ind-carou">
          <div className="col-7">
            <SavingsCarousel />
          </div>
          <div className="col-md-5 create">
            <button
              className="ind-btn"
              onClick={() => navigate(`../${targetGroupSavingsForm}`)}
            >
              <PlusImg />
              Create new
            </button>
          </div>
        </div>
        {pendingGroups?.length > 0 && (
          <>
            <div>
              <h4 style={{ fontWeight: "600", color: "#33277b" }}>
                Pending Groups
              </h4>
              <p>These are your pending groups</p>
            </div>
            <div className="row">
              {isLoadingPending ? (
                <SkeletonCards />
              ) : pendingGroups?.length > 0 ? (
                <>
                  {pendingGroups.map((group: any, index: number) => {
                    const {
                      status,
                      name,
                      target_amount,
                      id,
                      // group_saving_histories,
                      target_group_saving_participants,
                      // no_of_participants,
                    } = group.target_group_saving;
                    let currentBal = 0;
                    for (let participant of target_group_saving_participants) {
                      if (participant?.participant_email === userData().email) {
                        currentBal = parseFloat(participant?.balance);
                      }
                    }

                    return (
                      <div className="col-lg-6 p-3" key={index}>
                        <SavingsCard
                          status={status}
                          title={name}
                          totalAmt={parseFloat(target_amount)}
                          achievedAmt={currentBal}
                          members={target_group_saving_participants}
                          func={() =>
                            navigate(`../target-group-savings/${id}`, {
                              replace: true,
                            })
                          }
                        />
                      </div>
                    );
                  })}
                </>
              ) : (
                <div className="mt-4 pt-4">
                  <NoData text="You have no pending target group plans." />
                </div>
              )}
            </div>
          </>
        )}

        <div>
          <h4
            style={{ fontWeight: "600", color: "#33277b", marginTop: "0.5rem" }}
          >
            Existing Groups Joined
          </h4>
        </div>

        <div className="row">
          {isLoadingJoined ? (
            <SkeletonCards />
          ) : joinedGroups?.length > 0 ? (
            <>
              {joinedGroups?.map((group: any, index: number) => {
                const { target_group_saving } = group;
                let currentBal = 0;
                // target_group_saving.target_group_saving_histories?.forEach(
                //   (saving: any) => {
                //     currentBal += Number(saving.amount);
                //   }
                // );
                for (let participant of target_group_saving.target_group_saving_participants) {
                  if (participant?.participant_email === userData().email) {
                    currentBal = parseFloat(participant?.balance);
                  }
                }

                return (
                  <div className="col-lg-6 p-3" key={index}>
                    <SavingsCard
                      status={target_group_saving?.status}
                      title={target_group_saving?.name}
                      totalAmt={parseFloat(target_group_saving?.target_amount)}
                      achievedAmt={currentBal}
                      members={
                        target_group_saving?.target_group_saving_participants
                      }
                      func={() =>
                        navigate(
                          `../target-group-savings/${target_group_saving?.id}`,
                          {
                            replace: true,
                          }
                        )
                      }
                    />
                  </div>
                );
              })}
            </>
          ) : (
            <div className="mt-4 pt-4">
              <NoData text="You have not joined any target group plans. You can create one by clicking the 'Create new' button above" />
            </div>
          )}
        </div>
      </div>
    </TarGrpSavings.Wrapper>
  );
};

TarGrpSavings.Wrapper = styled.div`
  .container {
    padding: 2rem;
    color: #33277b !important;

    .line {
      border: 1px solid rgba(0, 0, 0, 0.4);
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
      padding: 1rem 2rem 1rem 1rem;
      color: #fff;
      margin-bottom: 2rem;
      p {
        // font-size: 16px;
      }

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

export default TarGrpSavings;
