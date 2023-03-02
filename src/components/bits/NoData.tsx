import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import NoDataImg from "../../assets/img/no-data.png";

interface NoDataProps {
  Click?: Function;
  text?: string;
  link?: string;
}

const NoData = (props: NoDataProps) => {
  const { text, link } = props;
  return (
    <Wrapper>
      <img src={NoDataImg} alt="No data available" />
      <div className="mt-4">
        {text}&nbsp;{link && <Link to={link}>here</Link>}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // margin-top: 6rem;
  text-transform: none;
`;
export default NoData;
