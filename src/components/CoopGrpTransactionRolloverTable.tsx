import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

import Button from "./bits/Button";
import LoadingButton from "./bits/LoadingButton";
import NoData from "./bits/NoData";

type CoopGrpCollectionRolloverTableProps = {
  participants: any;
  rollOverGroup: Function;
  isLoadingRollover: boolean;
};

const CoopGrpCollectionRolloverTable = (
  props: CoopGrpCollectionRolloverTableProps
) => {
  const { participants, rollOverGroup, isLoadingRollover } = props;

  const [listData, setListData] = useState([...participants]);
  const [orderedEmails, setOrderedEmails] = useState<string[]>([]);

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;
    // this prevents the list item from moving out of bounds

    let items: any = Array.from(listData);

    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    // this sorts the created array based on the destination index

    let newList = [];
    for (let i = 0; i < items.length; i++) {
      let val = { ...items[i], payout_order: i + 1 };
      newList.push(val);
    }
    // this creates a new array where the payout order of each item
    //  is updated to match the destination index

    newList.sort(
      (member1: any, member2: any) =>
        member1.payout_order - member2.payout_order
    );
    // then we sort it based on payout order

    setListData(newList);

    let res: string[] = [];
    items.forEach((element: any) => {
      res.push(element.participant_email);
    });
    setOrderedEmails(res);
  }

  const grid = 10;

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",

    // change background colour if dragging
    background: isDragging ? "#e6f4ee" : "none",

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver: boolean) => ({
    // background: isDraggingOver ? "lightblue" : "none",
    padding: grid,
    // width: 250,
  });

  return (
    <Wrapper className="row justify-content-center">
      <div className="trans-table col-lg-10">
        {listData.length > 0 ? (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="rollOverList">
              {(provided, snapshot) => (
                <table
                  ref={provided.innerRef}
                  className="table table-hover align-middle text-center"
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  <thead className="header">
                    <tr>
                      <th>Member's Name</th>
                      <th>Status</th>
                      <th>Payout Order</th>
                      <th>Payout Status</th>
                    </tr>
                  </thead>

                  <tbody className="characters" {...provided.droppableProps}>
                    {listData
                      // .sort(
                      //   (member1: any, member2: any) =>
                      //     member1.payout_order - member2.payout_order
                      // )
                      .map((member: any, index: number) => {
                        return (
                          <Draggable
                            key={member.collection_date}
                            draggableId={member.collection_date}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <tr
                                key={index}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="my-4"
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                              >
                                <td>
                                  {/* {member.participant_name
                                    ? member.participant_name
                                    : member.participant_email} */}
                                  {member.participant_name}
                                </td>
                                <td style={{ textTransform: "capitalize" }}>
                                  {member.status}
                                </td>
                                <td>{member.payout_order}</td>
                                <td>
                                  {member.payout !== 0
                                    ? "Collected"
                                    : "Not collected"}
                                </td>
                              </tr>
                            )}
                          </Draggable>
                        );
                      })}
                    {provided.placeholder}
                  </tbody>
                </table>
              )}
            </Droppable>
            <Button
              // fontSize="16px"
              className="ms-auto"
              onClick={() => rollOverGroup(orderedEmails)}
            >
              {isLoadingRollover ? <LoadingButton /> : "Roll Over"}
            </Button>
          </DragDropContext>
        ) : (
          <div className="mt-4 pt-4">
            <NoData text="There are no other group participants." />
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
.trans-table {
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // font-size: 16px;
  text-transform: capitalize;
  table {
    // width: 75%;
  },
    th {
      padding: 0.5rem;
    }
    td {
      color: #33277b;
      padding: 0.5rem;
      width: 25% !important;
    }
  }
  .header{
    color: #47486B99;
  }
  .status {
    width: 20%;
  }
  .bad {
    color: #ea0505b2;
    background: rgba(234, 5, 5, 0.15);
    border-radius: 5px;
    padding: 0.5rem;
  }
  .good {
    color: #059157;
    background: rgba(207, 232, 222, 0.2);
    border-radius: 5px;
    padding: 0.5rem;
  }
  .processing {
    color: #F3B756;
    background: rgba(207, 232, 222, 0.2);
    border-radius: 5px;
    padding: 0.5rem;
  }
  .amt {
    display: flex;
    flex-direction row;
    align-items: center;
  }

  @media screen and (min-width: 500px) {
    .gd {
      margin: 0rem 2rem 0rem 0rem;
      padding: 0px;
    }
    .good,
    .bad,
    .processing {
      margin-right: 2rem;
    }
  }

  @media screen and (max-width: 500px) {
    .trans-table {
      // overflow-x: auto;
      margin-top: 0 !important;
      padding-top: 0 !important;
      table {
        min-width: 300px;
      },
        th,
        td {
          padding: 0.5rem 0.28rem  !important;
          img {
            height: 25px;
            width: 25px;
          }
        }
      }
    }
  }

}
`;

export default CoopGrpCollectionRolloverTable;
