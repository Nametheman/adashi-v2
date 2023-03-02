import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { ReactComponent as BackIcon } from "../assets/icons/back.svg";
import { ReactComponent as PlusImg } from "../assets/icons/plus.svg";
import {
  // useGetCoopGroupCreatedQuery,
  useGetCoopGroupInvitesQuery,
  useGetCoopGroupJoinedQuery,
} from "../redux/services/saving-service";
import {
  cooperativeGroupSavingsForm,
  cooperativeGroupSavingsLanding,
} from "../utils/routes";

import SavingsCard from "./SavingsCard";
import NoData from "./bits/NoData";
import SavingsCarousel from "./bits/SavingsCarousel";
import SkeletonCards from "./bits/SkeletonCards";

const CoopGrpSavings = () => {
  const navigate = useNavigate();
  // const {
  //   data: createdGroups,
  //   refetch: refetchCreated,
  //   isLoading: isLoadingCreated,
  // }: any = useGetCoopGroupInvitesQuery();
  const {
    data: pendingGroups,
    refetch: refetchPending,
    isLoading: isLoadingPending,
  }: any = useGetCoopGroupInvitesQuery();
  const {
    data: joinedGroups,
    refetch: refetchJoined,
    isLoading: isLoadingJoined,
  }: any = useGetCoopGroupJoinedQuery();
  useEffect(() => {
    refetchPending();
    refetchJoined();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CoopGrpSavings.Wrapper>
      <div className="container">
        <h2 style={{ fontWeight: "600", color: "#33277b" }}>
          Cooperative Group Contributions
        </h2>
        <hr className="line" />
        <Link
          to={`../${cooperativeGroupSavingsLanding}`}
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
              onClick={() => navigate(`../${cooperativeGroupSavingsForm}`)}
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
                      amount,
                      id,
                      // group_saving_histories,
                      group_saving_participants,
                      no_of_participants,
                    } = group.group_saving;
                    // let currentBal = 0;
                    // group_saving_histories?.forEach((saving: any) => {
                    //   currentBal += Number(saving.amount);
                    // });
                    let currentColl = 0;
                    group_saving_participants?.forEach((saving: any) => {
                      currentColl += Number(saving.payout);
                    });

                    return (
                      <div className="col-lg-6 p-3" key={index}>
                        <SavingsCard
                          status={status}
                          title={name}
                          totalAmt={parseFloat(amount) * no_of_participants}
                          // achievedAmt={currentBal}
                          members={group_saving_participants}
                          totalMembers={group_saving_participants.length}
                          collectedMembers={currentColl}
                          isGroup={true}
                          func={() =>
                            navigate(`../cooperative-group-savings/${id}`)
                          }
                        />
                      </div>
                    );
                  })}
                </>
              ) : (
                <div className="mt-4 pt-4">
                  <NoData
                    text="You have no pending cooperative group contributions."
                    // link="/user/savings"
                  />
                </div>
              )}
            </div>
          </>
        )}

        <div className="mt-4">
          <h4
            style={{ fontWeight: "600", color: "#33277b", marginTop: "0.5rem" }}
          >
            Existing Groups Joined
          </h4>
          <p>These are the groups you have joined</p>
        </div>
        <div className="row">
          {isLoadingJoined ? (
            <SkeletonCards />
          ) : joinedGroups?.length > 0 ? (
            <>
              {joinedGroups?.map((group: any, index: number) => {
                const { group_saving } = group;
                // let currentBal = 0;
                // group_saving?.group_saving_histories.forEach((saving: any) => {
                //   currentBal += Number(saving.amount);
                // });
                let currentColl = 0;
                group_saving?.group_saving_participants?.forEach(
                  (saving: any) => {
                    currentColl += Number(saving.payout);
                  }
                );

                return (
                  <div className="col-lg-6 p-3" key={index}>
                    <SavingsCard
                      status={group_saving?.status}
                      title={group_saving?.name}
                      totalAmt={
                        parseFloat(group_saving?.amount) *
                        group_saving?.no_of_participants
                      }
                      // achievedAmt={currentBal}
                      members={group_saving?.group_saving_participants}
                      totalMembers={
                        group_saving?.group_saving_participants.length
                      }
                      collectedMembers={currentColl}
                      isGroup={true}
                      func={() =>
                        navigate(
                          `../cooperative-group-savings/${group_saving?.id}`
                        )
                      }
                    />
                  </div>
                );
              })}
            </>
          ) : (
            <div className="mt-4 pt-4">
              <NoData
                text="You have not joined any cooperative group contributions. You can create one by clicking the 'Create new' button above"
                // link="/user/savings"
              />
            </div>
          )}
        </div>
      </div>
    </CoopGrpSavings.Wrapper>
  );
};

CoopGrpSavings.Wrapper = styled.div`
  .container {
    padding: 2rem;
    color: #33277b !important;

    .sub {
      font
    }

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

export default CoopGrpSavings;
