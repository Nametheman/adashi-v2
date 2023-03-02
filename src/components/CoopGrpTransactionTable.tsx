import styled from "styled-components";

import NoData from "./bits/NoData";

type CoopGrpCollectionTableProps = {
  participants: any;
};

const CoopGrpCollectionTable = (props: CoopGrpCollectionTableProps) => {
  const { participants } = props;

  let participantsCopy = [...participants];

  return (
    <Wrapper className="col-12">
      <div className="trans-table">
        {participantsCopy.length > 0 ? (
          <table className="table table-hover align-middle text-center">
            <thead className="header">
              <tr>
                <th>Member's Name</th>
                <th>Status</th>
                <th>Payout Order</th>
                <th>Payout Date</th>
                <th>Payout Status</th>
              </tr>
            </thead>
            <tbody>
              {participantsCopy
                .sort(
                  (member1: any, member2: any) =>
                    member1.payout_order - member2.payout_order
                )
                .map((member: any, index: number) => {
                  return (
                    <tr key={index} className="my-4">
                      <td>{member.participant_name}</td>
                      <td style={{ textTransform: "capitalize" }}>
                        {member.status}
                      </td>
                      <td>{member.payout_order}</td>
                      <td>{member.collection_date}</td>
                      <td>
                        {member.payout !== 0 ? "Collected" : "Not collected"}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
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
    // font-size: 16px;
    table {
    },
      th {
        padding: 0.5rem;
      }
      td {
        color: #33277b;
        padding: 0.5rem;
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
      .good {
        margin-right: 2rem;
      }
      .bad {
        margin-right: 2rem;
      }
    }

    @media screen and (max-width: 500px) {
      .trans-table {
        overflow-x: auto;
        // width: fit-content;
        table {
        },
          th,
          td {
            // font-size: 12px !important;
          }
        }
      }
    }

  }
`;

export default CoopGrpCollectionTable;
