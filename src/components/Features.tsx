//import {gsap} from 'gsap'
//import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect /* useRef */ } from "react";
import styled from "styled-components";

import avatar2 from "../assets/icons/Group 237596.svg";
import avatar from "../assets/icons/Group 237597.svg";
import avatar3 from "../assets/icons/Group 237598.png";
import ellipse from "../assets/img/Ellipse 1096.svg";
import noFund from "../assets/img/Rectangle 2.png";

import { Heading2, Heading5, Paragraph, MyParagraph } from "./bits/Text";

function Features() {
  //gsap.registerPlugin(ScrollTrigger)

  //let features = useRef<null>(null)
  useEffect(() => {
    /* gsap.from( features , {
      y: "50%",
      ease: "expo",
      opacity:0,
      duration: 1,
      scrollTrigger:{
        trigger: features.current,
        start: "bottom center",
      }
    }) */
  }, []);

  return (
    <Features.Wrapper>
      <div className="features">
        <div className="features_img"></div>
        <div className="features_content">
          <Heading2 fontSize="30px !important">
            Financial freedom and <br /> flexibility for all
          </Heading2>
          <div className="features_list">
            <div className="features_item">
              <img src={avatar2} alt="" />
              <div>
                <Heading5 className="">Easy</Heading5>
                <MyParagraph fontSize="14px">
                  Create flexible plans easily on your own terms by <br />{" "}
                  automating your contributions
                </MyParagraph>
              </div>
            </div>
            <div className="features_item">
              <img src={avatar} alt="" />
              <div>
                <Heading5 className="">Safe</Heading5>
                <MyParagraph fontSize="14px">
                  Our payment processors are PCIDSS compliant <br /> to ensure
                  optimum security of your data <br /> electronically.
                </MyParagraph>
              </div>
            </div>
            <div className="features_item">
              <img src={avatar3} alt="" />
              <div>
                <Heading5 className="">Reliable</Heading5>
                <MyParagraph fontSize="14px">
                  You can rely on us to help you achieve financial <br />{" "}
                  stability since we safeguard your personal <br /> information.
                </MyParagraph>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img className="eclipse" src={ellipse} alt="app" />
    </Features.Wrapper>
  );
}

Features.Wrapper = styled.div`
  position: relative;

  p {
    margin: 0;
    opacity: 0.7;
    font-weight: 100;
  }
  h5 {
    margin: 0;
  }

  .features {
    display: flex;
    align-items: flex-start;
    max-width: 1500px;
    width: 90%;
    height: 685.61px;
    margin: 0 auto;
    margin-top: 200px;
  }
  .features_img {
    margin-right: 100px;
    width: 50%;
    height: 100%;
    background: url("${noFund}");
    background-size: cover;
    border-radius: 10px;
    position: relative;
  }
  .features_content {
    width: 50%;
  }
  .features_item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 80px;
  }
  .feature_item:last-child {
    margin-bottom: 0;
  }
  .features_item img {
    margin-right: 20px;
    height: 55px;
  }
  .features_item h5 {
    margin: 10px 0;
    margin-top: 13px;
  }

  .eclipse {
    position: absolute;
    right: 0;
    top: 20px;
    z-index: -1;
    height: 40rem;
  }

  @media screen and (max-width: 1280px) {
    .features_img {
      margin-right: 50px;
    }
  }
  @media screen and (max-width: 950px) {
    .features {
      flex-direction: column;
    }
    .features_content {
      width: 100%;
    }
    .features_item {
      margin-bottom: 40px;
    }
    .features_img {
      display: none;
    }
    p {
      font-size: 16px;
    }
  }
`;

export default Features;
