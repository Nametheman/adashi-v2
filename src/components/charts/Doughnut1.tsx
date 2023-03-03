import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { useEffect, useRef } from 'react';
import { Chart } from 'react-chartjs-2';
import styled from 'styled-components';
// eslint-disable-next-line import/no-unassigned-import
import 'chart.js/auto';

import { ReactComponent as NairaIcon } from '../../assets/icons/naira-icon.svg';
import { indChartData } from '../../helpers/chartData';
import { formatNumber } from '../../helpers/formatNumbers';
import { useGetIndSavingsAllQuery } from '../../redux/services/saving-service';
import { RootState, useAppSelector } from '../../redux/store';
import AmountDisplay from '../bits/AmountDisplay';

ChartJS.register(ArcElement, Tooltip, Legend);

const Doughnut1 = () => {
  const chartRef = useRef<ChartJS>(null);
  const { data, refetch }: any = useGetIndSavingsAllQuery();

  const amountDisplayState = useAppSelector(
    (state: RootState) => state.amountDisplay
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  let finalAmt: number[] = [];
  let planNames: string[] = [];
  let planColour: string[] = [];

  if (data && data.length > 0) {
    // var { finalAmt, planNames, planColour } = indChartData(data);
    finalAmt = indChartData(data).finalAmt;
    planNames = indChartData(data).planNames;
    planColour = indChartData(data).planColour;
  }

  let data1 = {
    labels: planNames && planNames.length > 0 ? planNames : ['No plan'],
    datasets: [
      {
        label: 'Individual Savings',
        data: finalAmt && finalAmt.length > 0 ? finalAmt : [100],
        backgroundColor:
          planColour && planColour.length > 0 ? planColour : ['#5ECC43'],
        // need to generate colours for each element too
        // borderColor: ["#059157", "#0FEBA9", "#5ECC43"],
        // borderWidth: 1,
        hoverOffset: 4,
        padding: 0,
      },
    ],
  };

  const indAmt =
    finalAmt.length > 0
      ? finalAmt.reduce((prev: number, curr: number) => prev + curr)
      : 0;
  const indAmtNaira = indAmt
    ? formatNumber(parseInt(indAmt.toFixed(2).split('.')[0]))
    : 0;
  const indAmtKobo = indAmt ? indAmt.toFixed(2).split('.')[1] : '00';

  const options = {
    responsive: true,
    aspectRatio: 1.5,
    // respon
    // cutout: "75%",
    plugins: {
      legend: {
        position: 'right' as const,
        maxWidth: 100,
        labels: {
          color: '#33277B',
          boxWidth: 14,
          boxHeight: 14,
          radius: '50%',
          // radius: 50,
          font: {
            size: 10,
            weight: '500',
          },
        },
      },
      layout: {
        // padding: {
        //   left: 50,
        // },
        padding: 0,
      },
      //   title: {
      //     display: true,
      //     text: "Individual Services",
      //   },
    },
  };

  return (
    <Wrapper>
      <div className='chart-h'>
        <p className='m-0'>Individual Plans</p>
        <div className='amt'>
          <NairaIcon
            style={{
              width: '13px',
              height: '14px',
              marginInlineEnd: '0.25rem',
            }}
          />
          <AmountDisplay
            text={`${indAmtNaira}.${indAmtKobo}`}
            isAsterisk={amountDisplayState.asteriskStatus}
          />
        </div>
        {/* data={(data && data.length > 0) ? data1: data2} */}
      </div>
      {/* <div className="chart-container"> */}
      <Chart ref={chartRef} type='doughnut' data={data1} options={options} />
      {/* </div> */}
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

  // .chart-container {
  //   // position: relative;
  //   // height: 40vh;
  //   // width: 80vw;
  // }
`;

export default Doughnut1;
