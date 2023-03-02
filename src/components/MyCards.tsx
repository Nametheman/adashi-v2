import { message } from 'antd';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

// import React from "react";
import { ReactComponent as CloseIcon } from '../assets/icons/close-icon.svg';
import {
  useGetCardDataQuery,
  useInitializeCardMutation,
} from '../redux/services/transaction-service';
import { user } from '../utils/routes';

import Card from './Card';
import DeleteCard from './DeleteCard';
import Button from './bits/Button';
import CardCarousel from './bits/CardCarousel';
import ModalA from './bits/ModalA';
import NoData from './bits/NoData';

const MyCards = ({ func, redirectUrl }: any) => {
  const { data, refetch }: any = useGetCardDataQuery();
  // You can put the "add card" modal here
  const [completed, setCompleted] = useState(false);
  const [delCard, setDelCard] = useState(false);
  const [tempCardId, setTempCardId] = useState('');
  const [initializeCard] = useInitializeCardMutation();

  useEffect(() => {
    refetch();
    setCompleted(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (completed) {
      refetch();
      setCompleted(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completed]);

  const initialRequest = async (): Promise<void> => {
    try {
      const res: any = await initializeCard({
        redirect_url: `${process.env.REACT_APP_FRONTEND_URL2}${user}/${redirectUrl}`,
      });
      if (res.data.status === 'success') {
        window.location.href = res.data.data.authorization_url;
      } else {
        message.error(res.data?.message);
      }
    } catch (error: any) {
      message.error(error?.data?.message);
    }
  };

  return (
    <>
      <Wrapper>
        <div className='header'>
          <h5 style={{ color: '#33277b' }}>
            <b>My Cards</b>
          </h5>
          <CloseIcon
            onClick={() => func(0)}
            style={{ cursor: 'pointer', marginInlineStart: '1rem' }}
          />
        </div>

        {data?.data.length > 0 && (
          <p>
            <b>Tap card to delete</b>
          </p>
        )}

        <div className='card-body'>
          {data?.data.length > 0 ? (
            <CardCarousel sliderColour='#059157'>
              {data?.data?.map((item: any, itemId: number) => (
                <Card
                  key={itemId}
                  bank={item.bank}
                  brand={item.brand}
                  last4={item.last4}
                  cardId={item.id}
                  expMonth={item.exp_month}
                  expYear={item.exp_year}
                  setTempCardId={setTempCardId}
                  setDelCard={setDelCard}
                />
              ))}
            </CardCarousel>
          ) : (
            <NoData
              text='You have no saved cards. Add one by clicking the button below.'
              // link="/user/savings"
            />
          )}
        </div>
        <div className='btn'>
          <Button onClick={() => initialRequest()}>Add new card</Button>
          {/* <Button onClick={() => setAddNewCard(true)}>Add new card</Button>
          {addNewCard && (
            <AddCard
              closeAddNewCard={() => setAddNewCard(false)}
              addNewCard
              setCompleted={setCompleted}
            />
          )} */}
        </div>
      </Wrapper>
      <ModalA isShown={delCard} hide={() => {}}>
        <DeleteCard
          closeModal={() => setDelCard(false)}
          delCardId={tempCardId}
          setCompleted={setCompleted}
        />
      </ModalA>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 4rem;
  // width: 100%
  // height: 100%;
  color: #33277b !important;
  // font-size: 16px;

  p {
    // // font-size: 16px;
  }

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 2rem;
  }

  .card-body {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .btnA {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
`;

export default MyCards;
