import { Skeleton } from "antd";
import React from "react";
import styled from "styled-components";

const SkeletonCards = () => {
  return (
    <Wrapper>
      <Skeleton active avatar />
      <Skeleton active avatar />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default SkeletonCards;
