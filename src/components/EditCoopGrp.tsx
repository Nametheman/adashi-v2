import { DatePicker, Skeleton, message } from "antd";
import moment from "moment";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { ReactComponent as BackIcon } from "../assets/icons/back.svg";
import { userData } from "../helpers/authHelper";
import { formatNumber } from "../helpers/formatNumbers";
import { cardList } from "../helpers/otherHelpers";
import {
  useDeleteCoopGroupMutation,
  useEditCoopGroupMutation,
  useGetCoopGroupQuery,
} from "../redux/services/saving-service";
import { useGetCardDataQuery } from "../redux/services/transaction-service";
import { cooperativeGroupSavings } from "../utils/routes";

import ConfirmDelete from "./ConfirmDelete";
import FormSubmit from "./FormSubmit";
import Button from "./bits/Button";
import Input from "./bits/InputText";
import LoadingButton from "./bits/LoadingButton";
import ModalA from "./bits/ModalA";
import NewSelect from "./bits/NewSelect";
import NoData from "./bits/NoData";
import { Label } from "./bits/Text";

export type EditGrpProps = {
  groupName: string;
  nextContributionDate: moment.Moment | null;
  nextContributionDateString: string;
  contribution: number;
  amountPerCycle: number;
  frequencyName: string;
  frequencyValue: string;
  automatedName: string;
  automatedValue: string;
  lockStatus?: string;
  cardId: string;
  cardName: string;
  savingsType?: string;
};

const EditCoopGrp = () => {
  let params = useParams();
  const navigate = useNavigate();
  const planId: string = params.planId || "";
  const {
    data: planData,
    isLoading: planIsLoading,
    refetch: planRefetch,
  }: any = useGetCoopGroupQuery(planId);
  const { data: cardData, refetch: cardRefetch }: any = useGetCardDataQuery();
  const [deleteCoopGroup] = useDeleteCoopGroupMutation();
  const [editCoopGroup] = useEditCoopGroupMutation();
  const [delLoading, setDelLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [currentModal, setCurrentModal] = useState<Number>(0);

  let currentBal = 0;
  planData?.group_saving_histories?.forEach((saving: any) => {
    currentBal += Number(saving.amount);
  });

  // only thing to edit should be the user's card details, i.e. this should only accept payment_auth
  const [formData, setFormData] = useState<EditGrpProps>({
    groupName: "",
    // savingsType: "",
    nextContributionDate: null,
    nextContributionDateString: "",
    contribution: 0,
    amountPerCycle: 0,
    frequencyName: "",
    frequencyValue: "",
    automatedName: "",
    automatedValue: "",
    cardId: "",
    cardName: "",
  });

  const populateState = (updatedData: any) => {
    updatedData &&
      setFormData((currData) => {
        return {
          ...currData,
          groupName: updatedData.name,
          nextContributionDate: moment(updatedData.next_contribution_date),
          nextContributionDateString: updatedData.next_contribution_date,
          contribution: parseFloat(updatedData.amount),
          amountPerCycle:
            parseFloat(updatedData.amount) * updatedData.no_of_participants,
          frequencyName: updatedData.plan,
          frequencyValue: updatedData.plan,
          automatedName: updatedData.status,
          automatedValue: updatedData.status,
          // cardId: updatedData.payment_gateway_id,
        };
      });

    updatedData?.group_saving_participants?.forEach((element: any) => {
      element.participant_email === userData().email &&
        setFormData((currData) => {
          return {
            ...currData,
            cardId: element.payment_gateway_id,
            cardName: `****${element.payment_gateway?.last4}`,
          };
        });
    });
    // updatedData?.group_saving_participants?.forEach((element: any) => {
    //   element.participant_email === userData().email &&
    //     setFormData({
    //       ...formData,
    //       cardId: element.payment_gateway_id,
    //       cardName: `****${element.payment_gateway?.last4}`,
    //     });
    // });
  };

  useEffect(() => {
    populateState(planData);
    planRefetch();
    cardRefetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planData]);
  // added planData as a dependency because on initial loading it is undefined, when it changes to a value, then you want to populate it

  const blockTodaysDate = (currDate: moment.Moment) => {
    return currDate && currDate < moment().endOf("day");
  };

  const handleFormChange = (e: ChangeEvent<any>): any => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFrequencyChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      frequencyName: name,
      frequencyValue: value,
    });
  };

  const handleAutomationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      automatedName: name,
      automatedValue: value,
    });
  };

  const submitHandler = async (e: any): Promise<void> => {
    e.preventDefault();
    try {
      setEditLoading(true);
      const res: any = await editCoopGroup({
        planId: planId,
        payment_auth: formData.cardId,
      });
      if (res?.data?.status === "success") {
        setEditLoading(false);
        message.success(res.data.message);
        setCurrentModal(2);
      } else if (res.error) {
        setEditLoading(false);
        message.error(res.error?.data?.message);
      } else {
        setEditLoading(false);
        message.error(res.data.message);
      }
    } catch (error: any) {
      setEditLoading(false);
      message.error(error?.data?.message);
    }
  };

  const submitDelete = async (): Promise<void> => {
    if (currentBal === 0) {
      try {
        setDelLoading(true);
        const res: any = await deleteCoopGroup(planId);
        if (res?.data?.status === "success") {
          setDelLoading(false);
          message.success(res.data.message);
          setCurrentModal(3);
        } else if (res.error) {
          setDelLoading(false);
          message.error(res.error?.data?.message);
          setCurrentModal(0);
        } else {
          setDelLoading(false);
          message.error(res.data.message);
          setCurrentModal(0);
        }
      } catch (error: any) {
        setDelLoading(false);
        message.error(error?.data?.message);
      }
    } else {
      message.error(
        "You can only delete a plan when all funds have been withdrawn."
      );
      setCurrentModal(0);
    }
  };

  return (
    <>
      <Wrapper>
        <div className="container">
          <h2 style={{ fontWeight: "600", color: "#33277b" }}>
            Edit Cooperative Group
          </h2>
          <hr className="line" />
          <Link
            to={`../${cooperativeGroupSavings}`}
            style={{ textDecoration: "none" }}
            className="back"
          >
            <BackIcon />
            <p>Back</p>
          </Link>

          {planIsLoading ? (
            <Skeleton active />
          ) : planData ? (
            <form className="form-container" onSubmit={submitHandler}>
              <div className="form-body col-md-10">
                <div className="invite">
                  <Label color="#33277B">Group Name</Label>
                  <Input
                    type="text"
                    placeholder="Enter group name"
                    name="groupName"
                    onChange={handleFormChange}
                    value={formData.groupName}
                    required
                    disabled
                    className="caps"
                  />
                </div>

                <div className="invite">
                  <Label color="#33277B">Amount Per Cycle</Label>
                  <Input
                    type="text"
                    placeholder="Enter target amount"
                    name="target"
                    onChange={handleFormChange}
                    value={
                      formData.amountPerCycle > 0
                        ? formatNumber(formData.amountPerCycle)
                        : ""
                    }
                    required
                    disabled
                  />
                </div>

                <div className="invite">
                  <Label color="#33277B">Savings Frequency</Label>
                  <NewSelect
                    placeholder="Frequency"
                    // name="frequencyValue"
                    fullWidth
                    options={[
                      { name: "Daily", value: "daily" },
                      { name: "Weekly", value: "weekly" },
                      { name: "Monthly", value: "monthly" },
                      { name: "Flexible", value: "flexible" },
                    ]}
                    selected={{
                      name: formData.frequencyName,
                      value: formData.frequencyValue,
                    }}
                    onChange={handleFrequencyChange}
                    required
                    disabled
                  />
                </div>
                <div className="invite">
                  <Label color="#33277B">Automation Status</Label>
                  <NewSelect
                    placeholder="Automation"
                    // name="automated"
                    fullWidth
                    options={[
                      { name: "Active", value: "active" },
                      { name: "Paused", value: "paused" },
                    ]}
                    selected={{
                      name: formData.automatedName,
                      value: formData.automatedValue,
                    }}
                    onChange={handleAutomationChange}
                    required
                    disabled
                    className="caps"
                  />
                </div>
                <div className="invite">
                  <Label color="#33277B">Next Contribution Date</Label>
                  <DatePicker
                    className="col-md-10 col-lg-8 date-picker"
                    placeholder="End Date"
                    format={"MMM DD, YYYY"}
                    value={formData.nextContributionDate}
                    disabledDate={blockTodaysDate}
                    disabled
                  />
                </div>

                <div className="invite">
                  <Label color="#33277B">Periodic Contribution</Label>
                  <Input
                    type="text"
                    name="contribution"
                    placeholder="Amount to save"
                    onChange={handleFormChange}
                    min={500}
                    value={
                      formData.contribution > 0
                        ? formatNumber(formData.contribution)
                        : ""
                    }
                    required
                    disabled
                  />
                </div>

                <div className="mb-2">
                  <Label color="#33277B">Debit Card</Label>
                  <NewSelect
                    placeholder="Debit Card"
                    name="cardId"
                    fullWidth
                    options={cardData ? cardList(cardData) : []}
                    onChange={handleFormChange}
                    selected={{
                      name: formData.cardName,
                      value: formData.cardId,
                    }}
                    required
                  />
                </div>
              </div>

              <div className="ft">
                {planData?.owner_id === userData().id && (
                  <Button
                    bg="white"
                    color="#EA0505"
                    border="#EA0505"
                    fontSize="16px"
                    className="me-4"
                    type="button"
                    onClick={() => setCurrentModal(1)}
                  >
                    {delLoading ? <LoadingButton /> : "Delete Plan"}
                  </Button>
                )}

                <Button
                  style={{ minWidth: "150px", fontSize: "16px" }}
                  type="submit"
                >
                  {editLoading ? <LoadingButton /> : "Save Changes"}
                </Button>
              </div>
            </form>
          ) : (
            <div className="mt-4 pt-4">
              <NoData text="Please check your internet connection or reload the page." />
            </div>
          )}
        </div>
      </Wrapper>
      {currentModal === 1 && (
        <ModalA isShown={true} hide={() => {}}>
          <ConfirmDelete func={setCurrentModal} submitDelete={submitDelete} />
        </ModalA>
      )}
      {currentModal === 2 && (
        <ModalA isShown={true} hide={() => {}}>
          {/* <FormSubmit pageUp={cooperativeGroupSavings} edit={true} /> */}
          <FormSubmit
            edit={true}
            onConfirm={() => navigate(`../${cooperativeGroupSavings}`)}
          />
        </ModalA>
      )}
      {currentModal === 3 && (
        <ModalA isShown={true} hide={() => {}}>
          <FormSubmit
            del={true}
            onConfirm={() => navigate(`../${cooperativeGroupSavings}`)}
          />
        </ModalA>
      )}
    </>
  );
};

const Wrapper = styled.div`
  .container {
    padding: 2rem;
    color: #33277b;
    // display: flex;
    // flex-direction: column;
    // // flex-wrap: wrap;
    // // justify-content: flex-start;
    // // font-size: 16px;

    .line {
      border: 1px solid rgba(0, 0, 0, 0.4);
    }

    .back {
      display: flex;
      color: #33277b;
      align-items: center;
      p {
        margin: 0 0 0 1rem;
      }
      margin: 1rem 0;
    }

    .form-container {
      display: flex;
      flex-direction: column;
      align-items: center;

      .form-body {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        // width: 80%;
        .invite {
          display: flex;
          flex-direction: column;
          width: 47%;
          margin-bottom: 2rem;
        }
      }
      // .button {
      //   display: flex;
      //   justify-content: flex-end;
      //   margin: 3rem 0;
      // }
    }

    .ft {
      margin-top: 2rem;
      // margin-left: auto;
      display: flex;
      flex-direction: row;
      justify-content: start;
    }
  }

  @media screen and (max-width: 500px) {
    display: flex;
    flex-direction: column;
    // flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    .form-container {
      margin-top: 0rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding: 0;

      .form-body {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 0;
        .invite {
          width: 100% !important;
        }
      }
    }
  }
`;

export default EditCoopGrp;
