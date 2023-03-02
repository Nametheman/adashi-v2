import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React, { useEffect, useRef } from 'react';
import { Chart } from 'react-chartjs-2';
import styled from 'styled-components';
// eslint-disable-next-line import/no-unassigned-import
import 'chart.js/auto';

import { ReactComponent as NairaIcon } from '../../assets/icons/naira-icon.svg';
// import { useGetTarGroupJoinedQuery } from "../../redux/services/saving-service";
import { tarGrpChartData } from '../../helpers/chartData';
import { formatNumber } from '../../helpers/formatNumbers';
import { useGetTarGroupJoinedQuery } from '../../redux/services/saving-service';
import { RootState, useAppSelector } from '../../redux/store';
import AmountDisplay from '../bits/AmountDisplay';

// import { Chart as ChartJS } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Doughnut2 = () => {
  const chartRef = useRef<ChartJS>(null);
  const { data: joinedGroups, refetch: refetchJoined }: any =
    useGetTarGroupJoinedQuery();

  const amountDisplayState = useAppSelector(
    (state: RootState) => state.amountDisplay
  );

  useEffect(() => {
    refetchJoined();
  }, [refetchJoined]);

  let finalAmt: number[] = [];
  let planNames: string[] = [];
  let planColour: string[] = [];

  if (joinedGroups && joinedGroups.length > 0) {
    // var { finalAmt, planNames, planColour } = indChartData(data);
    finalAmt = tarGrpChartData(joinedGroups).finalAmt;
    planNames = tarGrpChartData(joinedGroups).planNames;
    planColour = tarGrpChartData(joinedGroups).planColour;
  }

  const data1 = {
    labels: planNames && planNames.length > 0 ? planNames : ['No plan'],
    datasets: [
      {
        label: 'Target Group Savings',
        data: finalAmt && finalAmt.length > 0 ? finalAmt : [100],
        backgroundColor:
          planColour && planColour.length > 0 ? planColour : ['#FAE488'],
        // backgroundColor: ['#FAE488', '#EBA10F', '#F4CA8D'],
        hoverOffset: 4,
        padding: 0,
      },
    ],
  };

  const tarAmt =
    finalAmt.length > 0
      ? finalAmt.reduce((prev: number, curr: number) => prev + curr)
      : 0;
  const tarAmtNaira = tarAmt
    ? formatNumber(parseInt(tarAmt.toFixed(2).split('.')[0]))
    : 0;
  const tarAmtKobo = tarAmt ? tarAmt.toFixed(2).split('.')[1] : '00';

  const options = {
    responsive: true,
    aspectRatio: 1.5,
    // cutout: "75%",
    plugins: {
      legend: {
        position: 'right' as const,
        maxWidth: 100,
        labels: {
          color: '#33277B',
          boxWidth: 20,
          font: {
            // size: 14,
            weight: '600',
          },
        },
      },
      layout: {
        padding: 0,
      },
    },
  };

  return (
    <Wrapper>
      <div className='chart-h'>
        <p className='m-0'>Target Group Plans</p>
        <div className='amt'>
          <NairaIcon
            style={{
              width: '13px',
              height: '14px',
              marginInlineEnd: '0.25rem',
            }}
          />
          <AmountDisplay
            text={`${tarAmtNaira}.${tarAmtKobo}`}
            isAsterisk={amountDisplayState.asteriskStatus}
          />
        </div>
      </div>
      <Chart ref={chartRef} type='doughnut' data={data1} options={options} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .chart-h {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #33277b;
    margin-bottom: 0.5rem;
    .amt {
      margin: 0rem;
      display: flex;
      /* flex-direction row; */
      align-items: center;
    }
  }
  margin: 1rem 0;
  font-weight: 600;
`;

export default Doughnut2;
