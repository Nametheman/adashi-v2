import styled from "@emotion/styled";
import Moment from "react-moment";

import { ReactComponent as CloseIcon } from "../assets/icons/close-icon.svg";
import { ReactComponent as DownloadIcon } from "../assets/icons/download.svg";
import masterCardIcon from "../assets/icons/mastercard.svg";
import visaIcon from "../assets/icons/visa.svg";
import { exportAsPicture } from "../helpers/exportAsPicture";
import { format4dpNumber, formatNumber } from "../helpers/formatNumbers";

import inImg from "./../assets/img/in.png";
import outImg from "./../assets/img/out.png";

// import { ReactComponent as DownloadIcon } from "assets/icons/download.svg";
// import { SERVICES } from "pages/pagesPath";
// import { useHistory } from "react-router-dom";
// import { userData } from "utility/helper";

interface ShowTransDetailsProps {
  transaction: any;
  closeModal?: any;
  header?: any;
}

const ShowTransDetails = (props: ShowTransDetailsProps) => {
  const {
    transaction: {
      description,
      created_at,
      reference,
      status,
      amount,
      type,
      transactionable,
      card_last4,
      card_type,
    },
    closeModal,
  } = props;

  let cardImg = "";
  card_type?.trim() === "visa"
    ? (cardImg = visaIcon)
    : (cardImg = masterCardIcon);

  // const history = useHistory();
  //   planName: "Rent",
  //   date: "Mar 23, 2022",
  //   savingsType: "Cooperative Group Savings",
  //   status: "success",
  //   amount: "5500",
  //   transactionId: "20211202163844920640075",

  return (
    <ShowTransDetailsWrapper id="exportContainer">
      <div className="header">
        <div className="mini-head">
          {status === "success" ? (
            <img src={outImg} className="imgInfo" alt="outgoing" />
          ) : (
            <img src={inImg} className="imgInfo" alt="incoming" />
          )}
          <div>
            <p>{description}</p>
            <Moment format="MMM DD, YYYY">{created_at}</Moment>
          </div>
        </div>
        <p className="good">{type}</p>
        <CloseIcon
          onClick={() => closeModal()}
          style={{ cursor: "pointer", marginInlineStart: "1rem" }}
        />
      </div>
      <hr className="line" />
      <div className="rec-body">
        <div className="row1">
          <div className="amt">
            <p>Amount</p>
            <p>
              <b>₦ {formatNumber(parseFloat(amount))}</b>
            </p>
          </div>
          <div className="bal">
            <p>New Balance</p>
            <b>
              ₦{" "}
              {format4dpNumber(
                parseInt(
                  transactionable?.balance
                    ? transactionable?.balance
                    : transactionable?.wallet?.balance
                )
              )}
            </b>
          </div>
        </div>
        <div className="row1">
          <div className="amt">
            <p>Debit card</p>
            <p>
              {card_last4 ? (
                <>
                  {/* <MasterCardIcon className="me-2" /> */}
                  <img
                    src={cardImg}
                    alt="card logo"
                    style={{ width: "50px" }}
                  />
                  <b className="ms-2">{card_last4}</b>
                </>
              ) : (
                <b>nil</b>
              )}
            </p>
          </div>
          <div className="ms-2">
            <p>Reference</p>
            <b>{reference}</b>
          </div>
        </div>
        <div className="row1">
          <div className="status-h">
            <p>Status</p>
            <p className={`${status === "success" ? "good" : "bad"}`}>
              {status}
            </p>
          </div>
          <div className="download">
            <p>Download</p>
            <DownloadIcon
              style={{ cursor: "pointer" }}
              onClick={() => exportAsPicture(reference)}
            />
            {/* <p className={`${status === "success" ? "good" : "bad"}`}>
              {status}
            </p> */}
          </div>
        </div>
      </div>
    </ShowTransDetailsWrapper>
  );
};

const ShowTransDetailsWrapper = styled.div`
  background: #fff;
  border-radius: 15px;
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
    align-items: center;
    margin-bottom: 0;
    .mini-head {
      display: flex;
      flex-direction: row;
      align-items: center;

      .imgInfo {
        height: 30px;
        width: 30px;
        margin-right: 1rem;
      }
    }
  }
  .line {
    border: 1px solid rgba(0, 0, 0, 0.4);
    margin-top: 0rem;
  }
  .good {
    color: #059157;
    background: rgba(207, 232, 222, 0.2);
    border-radius: 5px;
    padding: 0.5rem;
    text-transform: capitalize;
  }
  .rec-body {
    display: flex;
    flex-direction: column;
    .row1 {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 1rem;

      div:nth-of-type(2) {
        display: flex;
        flex-direction: column;
        align-items: end;
      }
    }
    .bad {
      color: #ea0505b2;
      background: rgba(234, 5, 5, 0.15);
      border-radius: 5px;
      padding: 0.5rem;
      text-transform: capitalize;
    }
    .good {
      color: #059157;
      background: rgba(207, 232, 222, 0.2);
      border-radius: 5px;
      padding: 0.5rem;
      text-transform: capitalize;
    }
  }

  @media screen and (max-width: 1200px) {
    font-size: 14px;
  }
  @media screen and (max-width: 500px) {
    font-size: 12px;
  }
`;

export default ShowTransDetails;
