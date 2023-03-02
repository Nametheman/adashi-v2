// import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// import { useShowNav } from "./AuthIndex";
import { ReactComponent as BackIcon } from '../../assets/icons/back.svg';
import TransactionTable from '../../components/TransactionTable';

const Transactions = () => {
  // const { setShowNav } = useShowNav();
  // useEffect(() => {
  //   setShowNav(true);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <Transactions.Wrapper>
      <div className='container'>
        <h2 style={{ fontWeight: '600', color: '#33277b' }}>
          Transaction History
        </h2>
        <hr className='line' />
        <Link to={`..`} style={{ textDecoration: 'none' }} className='back'>
          <BackIcon />
          <p>Back</p>
        </Link>
        <TransactionTable />
      </div>
    </Transactions.Wrapper>
  );
};

Transactions.Wrapper = styled.div`
  .container {
    padding: 2rem;
    color: #33277b;

    .line {
      border: 1px solid rgba(0, 0, 0, 0.4);
    }

    .back {
      display: flex;
      color: #33277b;
      // font-size: 16px;
      align-items: center;
      p {
        margin: 0 0 0 1rem;
      }
      margin: 1rem 0;
    }

    @media screen and (max-width: 500px) {
      padding: 1rem;
    }
  }
`;

export default Transactions;
