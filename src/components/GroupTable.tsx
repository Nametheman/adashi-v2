import React from "react";
// import inImg from "./../assets/img/in.png";
// import outImg from "./../assets/img/out.png";
import styled from "styled-components";

const GroupTable = () => {
  const data = [
    {
      email: "Johnboyega@gmail.com",
      status: "Active",
      collectionOrder: 1,
      collectionDate: "Feb 22,2022",
      collectionStatus: "Collected",
    },
    {
      email: "Johnboyega@gmail.com",
      status: "Active",
      collectionOrder: 2,
      collectionDate: "Feb 22,2022",
      collectionStatus: "Collected",
    },
    {
      email: "Johnboyega@gmail.com",
      status: "Active",
      collectionOrder: 3,
      collectionDate: "Feb 22,2022",
      collectionStatus: "Pending",
    },
    {
      email: "Johnboyega@gmail.com",
      status: "Active",
      collectionOrder: 4,
      collectionDate: "Feb 22,2022",
      collectionStatus: "Pending",
    },
  ];
  return (
    <Wrapper className="col-12">
      <div className="trans-table">
        <table className="table align-middle">
          <thead className="header">
            <th>Group Email Address</th>
            <th>Status</th>
            <th>Collection Order</th>
            <th>Collection Date</th>
            <th>Collection Status</th>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.email}</td>
                <td>{item.status}</td>
                <td>{item.collectionOrder}</td>
                <td>{item.collectionDate}</td>
                <td>{item.collectionStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
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


    @media screen and (min-width: 500px) {
      .gd {
        margin: 0rem 2rem 0rem 0rem;
        padding: 0px;
      }
    }

    @media screen and (max-width: 500px) {
      font-size: 12px;
      padding: 0;
    }

  }
`;

export default GroupTable;
