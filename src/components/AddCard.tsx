import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { usePaystackPayment } from 'react-paystack';

import { userData } from '../helpers/authHelper';
// import { useGetUserProfileQuery } from "../redux/services/auth-services";
import {
  useAddCardMutation,
  useInitializeCardMutation,
} from '../redux/services/transaction-service';

interface AddCardProps {
  closeAddNewCard: Function;
  addNewCard: Boolean;
  setCompleted: Function;
  redirectUrl: string;
}

const AddCard = (props: AddCardProps) => {
  const { closeAddNewCard, addNewCard, setCompleted, redirectUrl } = props;
  const [initialized, setInitialized] = useState(false);
  const [initializeCard] = useInitializeCardMutation();
  // const { data: userData }: any = useGetUserProfileQuery();
  const [addCard] = useAddCardMutation();
  const [final, setFinal] = useState({
    ref: '',
    amt: 0,
  });
  const config = {
    reference: final.ref,
    email: userData().email,
    amount: final.amt * 100,
    publicKey: 'pk_test_2e2e6231059150310cb92e9becbd64ba8ff8c2c8',
  };

  // const onSuccess = (data: any) => {
  //   console.log(data);
  // };
  // pk_live_d7c3c905ef98347b3f52485544bf5790233e1838

  const onSuccess = (data: any) => {
    finalRequest(data);
  };

  const onClose = () => {
    closeAddNewCard();
  };

  const initializePayment = usePaystackPayment(config);

  const initialRequest = async (): Promise<void> => {
    try {
      const res: any = await initializeCard({
        redirect_url: `user/${redirectUrl}`,
      });
      console.log(res);
      if (res.data.status === 'success') {
        setFinal({
          ...final,
          amt: res.data.data.amount,
          ref: res.data.data.reference,
          ...res.data.data,
        });
        setInitialized(true);
      } else {
        message.error(res.data?.message);
      }
    } catch (error: any) {
      message.error(error?.data?.message);
    }
  };

  const finalRequest = async (data: any): Promise<void> => {
    try {
      const res: any = await addCard({
        reference: data.reference,
        ref: final.ref,
        channel: 'paystack',
      });
      if (res.data.status === 'success') {
        message.success(res.data?.message);
        setCompleted(true);
      } else {
        message.error(res.data?.message);
      }
      closeAddNewCard();
    } catch (error: any) {
      message.error(error?.data?.message);
      closeAddNewCard();
    }
  };

  //   To initialize the request
  useEffect(() => {
    if (addNewCard) {
      initialRequest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addNewCard]);

  // To inititialize payments
  useEffect(() => {
    if (initialized) {
      initializePayment(onSuccess, onClose);
      setInitialized(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized]);

  return <div></div>;
};

export default AddCard;
