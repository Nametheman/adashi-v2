import { Skeleton } from "antd";
import React, { useEffect } from "react";
import styled from "styled-components";

import {
  useGetCoopGroupInvitesQuery,
  useGetTarGroupInvitesQuery,
} from "../redux/services/saving-service";
import { updateNo } from "../redux/slices/notification-slice";
import { useAppDispatch } from "../redux/store";

import NoData from "./bits/NoData";

type NotificationProps = {
  setTab: Function;
  setGroupItem: Function;
  setGroupMisc: Function;
};

const Notifications = (props: NotificationProps) => {
  const { setTab, setGroupItem, setGroupMisc } = props;
  const {
    data: coopData,
    refetch: coopRefetch,
    isLoading: coopIsLoading,
  }: any = useGetCoopGroupInvitesQuery();

  const {
    data: tarData,
    refetch: tarRefetch,
    isLoading: tarIsLoading,
  }: any = useGetTarGroupInvitesQuery();

  const dispatch = useAppDispatch();

  const isLoading = coopIsLoading && tarIsLoading;
  const data = coopData && tarData && [...coopData, ...tarData];
  const notifNo: number = data?.length;

  useEffect(() => {
    coopRefetch();
    tarRefetch();
    dispatch(updateNo(notifNo));
  }, [coopRefetch, tarRefetch, notifNo, dispatch]);

  const updProps = (item: any) => {
    if (item.group_saving) {
      setGroupItem(item.group_saving);
      setGroupMisc({
        ownerName: item?.owner_name,
        // payoutOrder: Object.values(item?.available_payout_order),
        payoutOrder: item?.available_payout_order,
        savingsType: item?.savings_type,
      });
      setTab(5);
    } else if (item.target_group_saving) {
      setGroupItem(item.target_group_saving);
      setGroupMisc({
        ownerName: item?.owner_name,
        savingsType: item?.saving_type,
      });
      setTab(6);
    }
  };

  return (
    <Notifications.Wrapper>
      <div className="container col-md-10 mx-auto">
        {isLoading ? (
          <Skeleton active />
        ) : data?.length > 0 ? (
          <>
            {data.map((item: any, id: number) => (
              <div key={id}>
                <div>
                  <div
                    className="notif-row"
                    style={{
                      background: "rgba(207, 232, 222, 0.2)",
                      cursor: "pointer",
                    }}
                    // onClick={() => {
                    //   setGroupItem(item?.group_saving || item?.target_group_saving);
                    //   item?.group_saving ? setTab(5) : setTab(6);
                    // }}
                    onClick={() => updProps(item)}
                  >
                    <p className="notif-header">
                      <b>Invite Link</b>
                    </p>
                    <p className="notif-text">
                      You have been invited to join{" "}
                      {item?.group_saving?.name ||
                        item?.target_group_saving?.name}{" "}
                      group. Please click here to accept or decline.
                    </p>
                  </div>
                </div>
                <hr className="line" />
              </div>
            ))}
          </>
        ) : (
          <div className="mt-4 pt-4">
            <NoData
              text="You have no pending invitations."
              // link="/user/savings"
            />
          </div>
        )}
      </div>
    </Notifications.Wrapper>
  );
};

Notifications.Wrapper = styled.div`
  .notif-row {
    //   display: flex;
    //   flex-direction: row;
    justify-content: space-between;
    padding: 1rem;
  }

  .line {
    border: 1px solid rgba(0, 0, 0, 0.4);
    margin-top: 0;
  }
`;
export default Notifications;
