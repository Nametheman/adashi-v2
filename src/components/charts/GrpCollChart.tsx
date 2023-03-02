import { Chart as ChartJS } from "chart.js";
import React, { useRef } from "react";
import { Chart } from "react-chartjs-2";
import styled from "styled-components";
// eslint-disable-next-line import/no-unassigned-import
import "chart.js/auto";

// interface ChartProps {
//   labels: string[];
//   datasets: object[];
// }

interface GrpChartProps {
  allMembersNo: number;
  collectedMembersNo: number;
  pendingMembersNo: number;
  // rollOverGroup: Function;
}
// pass the number of all members here, and separate them into pending and collected respectively

const GrpCollChart = ({
  allMembersNo,
  collectedMembersNo,
  pendingMembersNo,
}: // rollOverGroup,
GrpChartProps) => {
  const chartRef = useRef<ChartJS>(null);

  const data1 = {
    labels: ["Collected", "Pending"],
    datasets: [
      {
        label: "Total Members",
        data:
          collectedMembersNo > 0 || pendingMembersNo > 0
            ? [collectedMembersNo, pendingMembersNo]
            : [100],
        backgroundColor: ["#F3D243", "#FFA412"],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    // cutout: "75%",
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      //   title: {
      //     display: true,
      //     text: "Individual Services",
      //   },
    },
  };

  return (
    <Wrapper>
      {/* <div className="title">
        <h2>
          <b>Group Collection Chart</b>
        </h2>
        <hr className="line" />
      </div> */}
      <div className="chart-h">
        <p className="m-0">Total Approved Members</p>
        <p className="m-0">
          <b>{allMembersNo}</b>
        </p>
      </div>
      <Chart ref={chartRef} type="doughnut" data={data1} options={options} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  // background: rgba(207, 232, 222, 0.2);
  // border: 1px solid rgba(0, 0, 0, 0.4);
  // box-sizing: border-box;
  // border-radius: 20px;
  // padding: 2rem 3rem 2rem 3rem;
  // cursor: pointer;
  // // font-size: 16px;

  .line {
    border: 1px solid rgba(0, 0, 0, 0.4);
  }

  .title {
    h2 {
      color: #33277b;
    }
    margin-bottom: 2rem;
  }

  .chart-h {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #33277b;
  }
`;

export default GrpCollChart;
