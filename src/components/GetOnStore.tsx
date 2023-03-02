import { useEffect } from "react";
import styled from "styled-components";

import androidImg from "../assets/img/Group 237605.svg";
import iosImg from "../assets/img/Group 237606.svg";
import appImg from "../assets/img/phone2.png";

import { Heading2, Paragraph, MyParagraph } from "./bits/Text";

function GetOnStore() {
  //  gsap.registerPlugin(ScrollTrigger)

  //let cont = useRef<null>(null)
  useEffect(() => {
    /*   gsap.from(cont, {
      y: "50%",
      opacity: 0,
      ease: "expo",
      duration: 1,
      scrollTrigger:{
        trigger: cont.current,
      }
    }) */
  }, []);

  return (
    <GetOnStore.Wrapper>
      <div className="store">
        <div>
          <Heading2 fontSize="25px !important">
            Achieve Financial Independence
          </Heading2>
          <MyParagraph>
            With Adashi, you can start a contribution individually or <br />{" "}
            together with friends and family. We automate the process for <br />{" "}
            you and make it easy to use.
          </MyParagraph>
          <div className="store_cta">
            <img style={{ marginRight: "20px" }} src={androidImg} alt="" />
            <img src={iosImg} alt="" />
          </div>
        </div>
        <div className="store_img">
          <img className="phone" src={appImg} alt="" />
        </div>
      </div>
    </GetOnStore.Wrapper>
  );
}

GetOnStore.Wrapper = styled.div`
  padding-top: 7rem;
  padding-bottom: 7rem;
  position: relative;

  h2,
  p {
    color: white;
    margin: 0;
  }
  p {
    margin: 40px 0;
    opacity: 0.7;
    font-weight: 100;
  }

  .store {
    max-width: 1500px;
    width: 90%;
    margin: 0 auto;
    display: grid;
    background-color: #059157;
    border-radius: 20px;
    padding: 80px 50px;
    position: relative;
  }
  .store_img {
    position: absolute;
    right: 40px;
    width: 600px;
    bottom: 0;
    overflow: hidden;
  }
  .phone {
    width: 100%;
    transform: translateY(5%);
  }
  .store_cta img {
    height: 50px;
  }
  @media screen and (max-width: 1280px) {
    .phone {
      display: none;
    }
  }

  @media screen and (max-width: 530px) {
    .phone {
      display: none;
    }
    .store {
      padding: 40px 25px;
    }
    .store_cta {
      display: flex;
      flex-direction: column;
    }
    .store_cta img {
      margin: 0;
      width: 140px;
    }
    .store_cta img:first-child {
      margin-bottom: 20px;
    }
  }
`;

export default GetOnStore;
