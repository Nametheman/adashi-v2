import { RefObject } from "react";
import styled from "styled-components";

import { Heading2, Heading5, Paragraph, MyParagraph } from "./bits/Text";

function Faqs({ faqsRef }: { faqsRef: RefObject<HTMLElement> }) {
  const faqs = [
    {
      title: "What is Adashi Esusu Akawo?",
      desc: "Adashi Esusu Akawo is a financial tool that allows individuals or group to contribute to reach a target. Think about it like your normal normal contribution but with a more automated, efficient and reliable way.",
    },
    {
      title: "Why should I save with Adashi Esusu Akawo?",
      desc: "We have a team of financial experts who can help you plan your financial goals, keep your money from any form of theft and other financial risks. Be rest assured that your funds are save and secure.",
    },
    {
      title: "What Savings options are best for me?",
      desc: `Individual Plan: You can choose to set your personal target by creating the start date of contribution, amount, the frequency and duration. Once the cycle is set, the plan is unlocked for withdrawal. Group Savings: You can choose to make a contribution alongside with friends or family. Depending on the number of people, the amount to be saved by each member, the frequency of saving and the, fund collection cycle.`,
    },
    {
      title: "Do I need to add my ATM card to contribute?",
      desc: "Yes. This is the medium through which you can move money into your Adashi/Esusu/Akawo account. However, we do not initiate any transaction on your card that you do not authorize.",
    },
    {
      title: "How do I withdraw my money?",
      desc: "Once you savings cycle is completed, your money is automatically available for withdrawal. Withdrawal does not attract no extra charges.",
    },
    {
      title: "I still have more enquiries/questions",
      desc: "You can reach us on 080******* or email: help@adashiesusuakawo.com",
    },
  ];

  return (
    <Faqs.Wrapper ref={faqsRef}>
      <div className="faqs">
        <Heading2 fontSize="25px !important">
          Frequently Asked Questions
        </Heading2>

        <div className="faqs_list">
          {faqs.map(({ title, desc }) => {
            return (
              <div key={title} className="faqs_item">
                <Heading5>{title}</Heading5>
                <MyParagraph fontSize="15px !important">{desc}</MyParagraph>
              </div>
            );
          })}
        </div>
      </div>
    </Faqs.Wrapper>
  );
}

Faqs.Wrapper = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  .faqs {
    max-width: 1500px;
    width: 90%;
    margin: 0 auto;
  }
  .faqs_list {
    margin-top: 120px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 80px;
  }
  .faqs_item p {
    margin-top: 7px;
    opacity: 0.7;
  }

  @media screen and (max-width: 1080px) {
    .faqs_list {
      grid-template-columns: repeat(1, 1fr);
      grid-gap: 40px;
    }
  }
`;

export default Faqs;
