import { useEffect } from 'react';
import styled from 'styled-components';

import { ReactComponent as NairaIcon } from '../../assets/icons/naira-white.svg';
import { indChartData, tarGrpChartData } from '../../helpers/chartData';
import { formatNumber } from '../../helpers/formatNumbers';
import { useGetUserProfileQuery } from '../../redux/services/auth-services';
import {
  useGetIndSavingsAllQuery,
  useGetTarGroupJoinedQuery,
} from '../../redux/services/saving-service';

import AdCarousel from './AdCarousel';

const SavingsCarousel = () => {
  const { data: indData, refetch }: any = useGetIndSavingsAllQuery();
  const { data: joinedGroups, refetch: refetchJoined }: any =
    useGetTarGroupJoinedQuery();
  const { data: userData1, refetch: userRefetch }: any =
    useGetUserProfileQuery();
  useEffect(() => {
    refetch();
    refetchJoined();
    userRefetch();
  }, [refetch, refetchJoined, userRefetch]);

  let indChartAmt: number[] = [];
  let tarGrpChartAmt: number[] = [];

  indData &&
    indData.length > 0 &&
    (indChartAmt = indChartData(indData).finalAmt);

  joinedGroups &&
    joinedGroups.length > 0 &&
    (tarGrpChartAmt = tarGrpChartData(joinedGroups).finalAmt);

  // for individual savings amount
  const indAmt =
    indChartAmt.length > 0
      ? indChartAmt.reduce((prev: number, curr: number) => prev + curr)
      : 0;
  const indAmtNaira = indAmt
    ? formatNumber(parseInt(indAmt.toFixed(2).split('.')[0]))
    : 0;
  const indAmtKobo = indAmt ? indAmt.toFixed(2).split('.')[1] : '00';

  // for target group savings amount
  const tarGrpAmt =
    tarGrpChartAmt.length > 0
      ? tarGrpChartAmt.reduce((prev: number, curr: number) => prev + curr)
      : 0;
  const tarGrpAmtNaira = tarGrpAmt
    ? formatNumber(parseInt(tarGrpAmt.toFixed(2).split('.')[0]))
    : 0;
  const tarGrpAmtKobo = tarGrpAmt ? tarGrpAmt.toFixed(2).split('.')[1] : '00';

  // for stash balance
  const stashBal = parseFloat(userData1?.wallet.balance);
  const stashBalNaira = stashBal
    ? formatNumber(parseInt(stashBal.toFixed(2).split('.')[0]))
    : 0;
  const stashBalKobo = stashBal ? stashBal.toFixed(2).split('.')[1] : '00';

  // for total savings amount
  const totalAmt = indAmt + stashBal;
  const totalAmtNaira = totalAmt
    ? formatNumber(parseInt(totalAmt.toFixed(2).split('.')[0]))
    : 0;
  const totalAmtKobo = indAmt ? totalAmt.toFixed(2).split('.')[1] : '00';

  return (
    <AdCarousel colour='#fff' sliderColour='#fff'>
      <div>
        <p>Total Balance</p>
        <h2 className='my-0 savings'>
          <NairaIcon className='savingsIcon' />
          <b>
            {totalAmtNaira}.{totalAmtKobo}
          </b>
        </h2>
      </div>
      <div>
        <p>Individual Balance</p>
        <h2 className='my-0 savings'>
          <NairaIcon className='savingsIcon' />
          <b>
            {indAmtNaira}.{indAmtKobo}
          </b>
        </h2>
      </div>
      <div>
        <p>Target Group Balance</p>
        <h2 className='my-0 savings'>
          <NairaIcon className='savingsIcon' />
          <b>
            {tarGrpAmtNaira}.{tarGrpAmtKobo}
          </b>
        </h2>
      </div>
      <div>
        <p>My Purse</p>
        <h2 className='my-0 savings'>
          <NairaIcon className='savingsIcon' />
          <b>
            {stashBalNaira}.{stashBalKobo}
          </b>
        </h2>
      </div>
    </AdCarousel>
  );
};

SavingsCarousel.Wrapper = styled.div`
  //   .savings {
  //     display: flex;
  //     flex-direction: row;
  //     align-items: bottom;
  //     h2 {
  //       color: #fff !important;
  //     }
  //     .savingsIcon {
  //       margin-inline-end: 0.25rem;
  //     }
  //   }
`;

export default SavingsCarousel;
