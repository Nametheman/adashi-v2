//import {gsap} from "gsap";
//import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  RefObject /*  useEffect, useRef, */,
  // useRef, useState
} from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { ReactComponent as ArrowRight } from "../assets/icons/right-arrow.svg";
import {
  cooperativeGroupSavings,
  individualSavings,
  targetGroupSavings,
  user,
} from "../utils/routes";

import {
  Heading2,
  Heading4,
  Heading5Light,
  Paragraph,
  Heading5,
  MyParagraph,
} from "./bits/Text";

function SavingsTypes({ productRef }: { productRef: RefObject<HTMLElement> }) {
  //gsap.registerPlugin(ScrollTrigger)

  /*  let titleHeading = useRef<null>(null)
  let other = useRef<null>(null)
  
  let saving1 = useRef<null>(null)
  let saving2 = useRef<null>(null)
  let saving3 = useRef<null>(null)
 */
  /*   useEffect(() => {

    gsap.from( titleHeading , {
      y: "50%",
      ease: "expo",
      opacity:0,
      duration: 1,
      scrollTrigger:{
        trigger: productRef.current,
        start: "top center",
      }
    })
    gsap.from( other , {
      y: "50%",
      ease: "expo",
      opacity:0,
      duration: 1,
      scrollTrigger:{
        trigger: productRef.current,
        start: "top center",
      }
    })

    gsap.from( saving1 , {
      y: "50%",
      ease: "expo",
      opacity:0,
      delay: 0.4,
      duration: 1,
      scrollTrigger:{
        trigger: productRef.current,
        start: "top center",
      }
    })
    gsap.from( saving2 , {
      y: "50%",
      ease: "expo",
      opacity:0,
      delay: 0.5,
      duration: 1,
      scrollTrigger:{
        trigger: productRef.current,
        start: "top center",
      }
    })
    gsap.from( saving3 , {
      y: "50%",
      ease: "expo",
      opacity:0,
      delay: 0.6,
      duration: 1,
      scrollTrigger:{
        trigger: productRef.current,
        start: "top center",
      }
    })
    
  }, [productRef]) */

  // const [cardHeight, setCardHeight] = useState<number>(0);

  // const coopRef = useRef<null | HTMLElement>(null);
  return (
    <SavingsTypes.Wrapper ref={productRef}>
      <div className="products">
        <Heading2 className="text-center" mb="10px !important" fontSize="30px">
          Our Products
        </Heading2>
        <MyParagraph
          className="text-center"
          fontSize="14px !important"
          mb="0 !important"
          mt="0 !important"
        >
          Achieve a steady and healthy financial habits by using any of our
          available plan types
        </MyParagraph>
        <div className="cards">
          <div className="card">
            <Heading5>Individual Plans</Heading5>
            <MyParagraph>
              Plan towards your short and long term goals such as (trips, new
              gadgets, house rent, retirement pan and lots more) and watch your
              money grow
            </MyParagraph>
            <Link to={`${user}/${individualSavings}`}>
              <Heading5Light>
                Piggy Bank <ArrowRight className="ms-2" />
              </Heading5Light>
            </Link>
          </div>

          <div className="card">
            <Heading5>Target Group Plans</Heading5>
            <MyParagraph>
              Making contributions in groups can be exciting and motivating as
              you plan towards a set goal with friends and family
            </MyParagraph>
            <Link to={`${user}/${targetGroupSavings}`}>
              <Heading5Light>
                Target Savings <ArrowRight className="ms-2" />
              </Heading5Light>
            </Link>
          </div>

          <div className="card">
            <Heading5>
              Cooperative Group Contributions (Adashi/Esusu/Akawo)
            </Heading5>
            <MyParagraph>
              With cooperative group contributions, you can take part in group
              contributions with rotatory payout order easily and also monitor
              the group progress
            </MyParagraph>
            <Link to={`${user}/${cooperativeGroupSavings}`}>
              <Heading5Light>
                Group Savings <ArrowRight className="ms-2" />
              </Heading5Light>
            </Link>
          </div>
        </div>
      </div>
    </SavingsTypes.Wrapper>
  );
}

SavingsTypes.Wrapper = styled.div`
  padding-top: 7rem;
  padding-bottom: 7rem;
  p,
  h2,
  h4,
  h5 {
    margin: 0;
  }

  p {
    margin: 40px 0;
    opacity: 0.7;
  }

  .products {
    max-width: 1500px;
    width: 90%;
    margin: 0 auto;
  }
  .cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    height: 40vh;
    width: 85%;
    margin: 0 auto;
  }
  .card {
    padding: 50px 20px;
    border: none;
    height: 90%;
    width: 87%;
    border-radius: 10px;
    box-shadow: -1px 3px 46px -9px rgba(0, 0, 0, 0.13);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
  }
  a {
    font-weight: bold;
  }
  @media screen and (max-width: 1180px) {
    .cards {
      height: auto;
    }
    .cards {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;

export default SavingsTypes;
