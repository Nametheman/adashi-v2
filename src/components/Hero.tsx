//import {gsap} from 'gsap'
import { RefObject /* useEffect, useRef */ } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import next from "../assets/icons/Vector.svg";
import ellipse from "../assets/img/Ellipse 1096.svg";
import bgBanner from "../assets/img/Vector 9.svg";
import line from "../assets/img/line.png";
import Iphone from "../assets/img/phone.png";

import { Heading2, Paragraph, MyParagraph } from "./bits/Text";

function Hero({ heroRef }: { heroRef: RefObject<HTMLElement> }) {
  //let headingRef = useRef(null)
  //let headingRef2 = useRef(null)
  //let pTextRef = useRef(null)
  //let pTextRef2 = useRef(null)
  //let buttonRef = useRef(null)
  //let miscRef = useRef(null)
  //let heroImg = useRef(null)
  //let bannerRef = useRef(null)

  /*   useEffect(() => {
    gsap.from(headingRef, {
      opacity: 0,
      duration: 1,
      delay: .6,
      translateY: "100%",
      ease: "expo",
    })
    gsap.from(headingRef2, {
      opacity: 0,
      duration: 1,
      delay: .6,
      translateY: "100%",
      ease: "expo",
    })
    gsap.from(pTextRef, {
      opacity: 0,
      duration: 1,
      delay: .6,
      translateY: "100%",
      ease: "expo",
    })
    gsap.from(pTextRef2, {
      opacity: 0,
      duration: 1,
      delay: .6,
      translateY: "100%",
      ease: "expo",
    })
    gsap.from(buttonRef, {
      opacity: 0,
      duration: 1,
      delay: .6,
      translateY: "100%",
      ease: "expo",
    })
    gsap.from(miscRef, {
      opacity: 0,
      duration: 1,
      delay: .6,
      translateY: "100%",
      ease: "expo",
    })
    gsap.from(heroImg, {
      opacity: 0,
      duration: 1,
      delay: .6,
      translateY: "100%",
      ease: "expo",
    })
    gsap.from(bannerRef, {
      opacity: 0,
      delay: .2,
      duration: 1,
    })
  }, []) */

  return (
    <Hero.Wrapper ref={heroRef}>
      <div className="hero">
        <div className="hero_text">
          <Heading2 className="mt-4 heading_text" fontSize="30px !important">
            Revolutionizing the age long <br /> Adashi/Esusu/Akawo traditional
            <br />
            contribution
          </Heading2>
          <Heading2 className="mt-4 heading_text2" fontSize="12px !important">
            Revolutionizing the age long Adashi/Esusu/Akawo traditional
            contribution
          </Heading2>
          <MyParagraph color="#47486B" className="p_text" fontSize="15px">
            Adashi helps you create halal contributions towards achieving a{" "}
            <br />
            better financial future while also providing a platform where <br />
            rotatory contribution is possible in groups.
          </MyParagraph>
          <Paragraph color="#47486B" className="p_text2">
            Adashi helps you create halal contributions towards achieving a
            better financial future while also providing a platform where
            rotatory contribution is possible in groups.
          </Paragraph>
          <Link to="/signup" className="get_started">
            Get Started
            <span>
              <img src={next} alt="next" />
            </span>
          </Link>

          <div className="hero_misc">
            <div className="hero_misc_item">
              <svg
                width="25"
                height="23"
                viewBox="0 0 25 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.4999 4.98958L3.01512 13.3555C2.9448 13.4188 2.85496 13.4484 2.7777 13.5009V21.5278C2.7777 21.9115 3.08847 22.2222 3.47215 22.2222H9.94914L8.33326 19.0621L12.8519 16.2843L10.2408 11.1098L16.6666 17.0464L12.1479 19.8242L13.8806 22.2222H21.5277C21.9114 22.2222 22.2221 21.9115 22.2221 21.5278V13.5026C22.1484 13.4523 22.0607 13.4236 21.9938 13.3637L12.4999 4.98958ZM24.7695 10.2552L22.2221 8.00564V2.08333C22.2221 1.69965 21.9114 1.38889 21.5277 1.38889H18.7499C18.3662 1.38889 18.0555 1.69965 18.0555 2.08333V4.32682L13.6609 0.447484C13.3298 0.149741 12.9149 0.000434977 12.4999 9.49039e-07C12.085 -0.000433079 11.6709 0.148004 11.3411 0.445747L0.230393 10.2552C-0.0547635 10.5117 -0.078635 10.9505 0.177875 11.2361L1.10669 12.27C1.36277 12.5551 1.80201 12.579 2.0876 12.3225L12.0407 3.54297C12.3033 3.31163 12.697 3.31163 12.9596 3.54297L22.9127 12.322C23.1978 12.5781 23.6371 12.5547 23.8936 12.2695L24.8224 11.2357C25.0785 10.9505 25.055 10.5113 24.7695 10.2552Z"
                  fill="#33277B"
                />
              </svg>
              <span>Rent</span>
            </div>

            <img src={line} alt="" />

            <div className="hero_misc_item">
              <svg
                width="25"
                height="23"
                viewBox="0 0 25 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.8332 8.33333H15.8727L11.3111 0.349826C11.2503 0.243536 11.1624 0.155204 11.0565 0.0937728C10.9505 0.0323416 10.8302 -7.67912e-06 10.7078 1.36733e-09L7.8649 1.36733e-09C7.40353 1.36733e-09 7.07063 0.441406 7.19737 0.884983L9.32541 8.33333H4.861L2.986 5.83333C2.85492 5.65842 2.64876 5.55556 2.43044 5.55556H0.694763C0.24294 5.55556 -0.0886568 5.98003 0.0211523 6.4184L1.38877 11.1111L0.0211523 15.8038C-0.0886568 16.2422 0.24294 16.6667 0.694763 16.6667H2.43044C2.64919 16.6667 2.85492 16.5638 2.986 16.3889L4.861 13.8889H9.32541L7.19737 21.3368C7.07063 21.7804 7.40353 22.2222 7.8649 22.2222H10.7078C10.9569 22.2222 11.187 22.0885 11.3106 21.8724L15.8727 13.8889H20.8332C22.3675 13.8889 24.9999 12.6454 24.9999 11.1111C24.9999 9.57682 22.3675 8.33333 20.8332 8.33333Z"
                  fill="#33277B"
                />
              </svg>
              <span>Vacation</span>
            </div>

            <img src={line} alt="" />

            <div className="hero_misc_item">
              <svg
                width="22"
                height="25"
                viewBox="0 0 22 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.875 17.5V1.25C21.875 0.46875 21.4062 0 20.625 0H4.6875C2.03125 0 0 2.03125 0 4.6875V20.3125C0 22.9688 2.03125 25 4.6875 25H20.625C21.25 25 21.875 24.5312 21.875 23.75V22.9688C21.875 22.6562 21.7188 22.3438 21.4062 22.0312C21.25 21.25 21.25 19.0625 21.4062 18.4375C21.7188 18.2812 21.875 17.9688 21.875 17.5ZM7.03125 8.20312C7.03125 8.09952 7.0724 8.00017 7.14566 7.92691C7.21892 7.85365 7.31827 7.8125 7.42188 7.8125H10.1562V5.07812C10.1562 4.97452 10.1974 4.87517 10.2707 4.80191C10.3439 4.72865 10.4433 4.6875 10.5469 4.6875H12.8906C12.9942 4.6875 13.0936 4.72865 13.1668 4.80191C13.2401 4.87517 13.2812 4.97452 13.2812 5.07812V7.8125H16.0156C16.1192 7.8125 16.2186 7.85365 16.2918 7.92691C16.3651 8.00017 16.4062 8.09952 16.4062 8.20312V10.5469C16.4062 10.6505 16.3651 10.7498 16.2918 10.8231C16.2186 10.8963 16.1192 10.9375 16.0156 10.9375H13.2812V13.6719C13.2812 13.7755 13.2401 13.8748 13.1668 13.9481C13.0936 14.0213 12.9942 14.0625 12.8906 14.0625H10.5469C10.4433 14.0625 10.3439 14.0213 10.2707 13.9481C10.1974 13.8748 10.1562 13.7755 10.1562 13.6719V10.9375H7.42188C7.31827 10.9375 7.21892 10.8963 7.14566 10.8231C7.0724 10.7498 7.03125 10.6505 7.03125 10.5469V8.20312ZM18.5938 21.875H4.6875C3.75 21.875 3.125 21.25 3.125 20.3125C3.125 19.375 3.90625 18.75 4.6875 18.75H18.5938V21.875Z"
                  fill="#33277B"
                />
              </svg>
              <span>Medical</span>
            </div>
          </div>
        </div>

        <div className="hero_img">
          <img
            className="bg_banner"
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              pointerEvents: "none",
            }}
            src={bgBanner}
            alt=""
          />
          <img
            className="phone"
            style={{
              position: "relative",
              zIndex: "1000",
              width: "90%",
              pointerEvents: "none",
            }}
            src={Iphone}
            alt=""
          />
        </div>
      </div>

      <img
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          transform: "translateX(-30%) translateY(30%) rotate(180deg)",
        }}
        src={ellipse}
        alt="app"
      />
    </Hero.Wrapper>
  );
}

Hero.Wrapper = styled.div`
  padding-top: 130px;
  width: 100%;
  position: relative;

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }
  p {
    margin: 30px 0;
    line-height: 36px;
    font-weight: 100;
  }

  * {
    margin: 0;
  }

  .hero {
    display: flex;
    align-items: center;
    max-width: 1500px;
    width: 90%;
    margin: 0 auto;
  }

  .heading_text {
    line-height: 56px;
    font-weight: 800;
    margin-bottom: 20px;
    font-size: 36px;
  }

  .get_started {
    display: block;
    width: max-content;
    background: #059157;
    border-radius: 8px;
    color: #ffffff;
    font-weight: 400;
    font-size: 14px;
    padding: 13px 25px;
    text-decoration: none;
  }

  .get_started span {
    margin-left: 14px;

    img {
      width: 20px;
    }
  }

  .hero_text {
    width: 50%;
    position: relative;
    z-index: 10;
  }

  .heading_text2,
  .p_text2 {
    display: none;
  }

  .hero_misc {
    margin-top: 60px;
    display: flex;
    align-items: center;
    pointer-events: none;
    width: 100%;
  }

  .hero_misc_item {
    margin: 0 40px;
    display: flex;
  }

  .hero_misc_item:first-child {
    margin-left: 0;
  }

  .hero_misc_item svg {
    margin-right: 20px;
  }

  .hero_misc_item span {
    color: #33277b;
  }
  .bg_banner {
    width: 47rem;
    height: 55rem;
  }

  @media screen and (max-width: 1280px) {
    .hero_misc {
      display: none;
    }
    .bg_banner {
      display: none;
    }
    .hero {
      flex-direction: column;
    }
    .hero_text {
      width: 100%;
    }
    .hero_img {
      width: 0;
    }
    .phone {
      display: none;
    }
  }

  @media screen and (max-width: 500px) {
    .heading_text {
      font-size: 30px;
    }
    .heading_text,
    .p_text {
      display: none;
    }
    .heading_text2,
    .p_text2 {
      display: block;
    }
  }
`;

export default Hero;
