import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Tab = styled.div`
  display: flex;
  // margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 2rem;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  // @media screen and (max-width: 960px) {
  //   justify-content: space-between;
  //   align-items: center;
  // }
`;

type TabItemProps = {
  active?: boolean;
};

export const TabItem = styled.div<TabItemProps>`
  // padding: 1.2rem 30px;
  padding: 1rem 26px;
  //   font-family: Orkney;
  color: #b8b8b8;
  cursor: pointer;
  // font-size: 1.4rem;
  font-size: 18px;
  line-height: 17px;
  font-weight: 400;
  margin-right: 1.5rem;
  ${props =>
    props.active &&
    css`
      // background: #e8eaff 0% 0% no-repeat padding-box;
      background: #e8eafd 0% 0% no-repeat padding-box;
      border-radius: 34px;
      font-weight: bold;
      margin-right: 1.5rem;
      color: #292d61;
    `}
  @media screen and (max-width: 960px) {
    padding: 0.5rem 1rem;
    // font-size: 10px;
    // font-size: 16px;
    height: fit-content;
  }
`;
