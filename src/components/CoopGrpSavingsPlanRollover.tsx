import { message } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { ReactComponent as BackIcon } from "../assets/icons/back.svg";
import {
  useGetCoopGroupQuery,
  useRollOverCoopGroupMutation,
} from "../redux/services/saving-service";
import { cooperativeGroupSavings } from "../utils/routes";

import CoopGrpCollectionRolloverTable from "./CoopGrpTransactionRolloverTable";
import LoadingRoller from "./bits/LoadingRoller";
import NoData from "./bits/NoData";

const CoopGrpSavingsPlanRollover = () => {
  const [isLoadingRollover, setIsLoadingRollover] = useState<boolean>(false);
  let params = useParams();
  const planId: string = params.planId || "";
  const { data, isLoading, refetch }: any = useGetCoopGroupQuery(planId);
  const [rollOverCoopGroup] = useRollOverCoopGroupMutation();

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

  const rollOverGroup = async (emails: string[]): Promise<void> => {
    try {
      setIsLoadingRollover(true);
      const res: any = await rollOverCoopGroup({
        group_id: planId,
        data: emails,
      });
      if (res?.data?.status === "success") {
        setIsLoadingRollover(false);
        message.success("Plan rolled over successfully.");
        navigate(`../${cooperativeGroupSavings}`);
      } else if (res.error) {
        setIsLoadingRollover(false);
        message.error(res.error?.data?.message);
      } else {
        setIsLoadingRollover(false);
        message.error(res.data.message);
      }
    } catch (error: any) {
      setIsLoadingRollover(false);
      message.error(error?.data?.message);
    }
  };

  return (
    <>
      <CoopGrpSavingsPlanRollover.Wrapper>
        {isLoading ? (
          <LoadingRoller />
        ) : data ? (
          <div className="container">
            <h2 style={{ fontWeight: "600", color: "#33277b" }}>{data.name}</h2>
            <hr className="line" />
            <Link
              to={`../${cooperativeGroupSavings}/${planId}`}
              style={{ textDecoration: "none" }}
              className="back"
            >
              <BackIcon />
              <p>Back</p>
            </Link>
            <p
              style={{ color: "#33277b", fontSize: 16, marginInlineStart: 10 }}
            >
              You can sort the payout order by dragging member rows over each
              other, select <b>"Continue"</b> to save when finished.
            </p>
            <CoopGrpCollectionRolloverTable
              participants={data.group_saving_participants}
              rollOverGroup={rollOverGroup}
              isLoadingRollover={isLoadingRollover}
            />
          </div>
        ) : (
          <div className="mt-4 pt-4">
            <NoData text="Please check your internet connection or reload the page." />
          </div>
        )}
      </CoopGrpSavingsPlanRollover.Wrapper>
    </>
  );
};

CoopGrpSavingsPlanRollover.Wrapper = styled.div`
  .container {
    padding: 2rem;
    color: #33277b !important;
    // font-size: 16px;

    .line {
      // border: 1px solid rgba(0, 0, 0, 0.4);
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

export default CoopGrpSavingsPlanRollover;
