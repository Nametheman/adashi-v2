import { ReactNode } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import avatar2 from "../assets/icons/Vector (1).svg";
import avatar3 from "../assets/icons/Vector (2).svg";
import avatar from "../assets/icons/Vector22.svg";
import logoImg from "../assets/img/logo2 1.svg";

import { Heading2, Heading5, Paragraph, MyParagraph } from "./bits/Text";

function SignupTemplate({ children }: { children: ReactNode }) {
  //   const name = window.location.pathname;
  //   console.log(name);
  return (
    // <SignupTemplate.Wrapper name={name}>
    <SignupTemplate.Wrapper>
      <div className="bg-left">
        <div className="fg-left  p-3">
          <Link to="/">
            <img src={logoImg} alt="Adashi" />
          </Link>
          <Heading2 color="#ffffff" className="mt-4 mb-2">
            Build Your Finances
          </Heading2>
          <div className="features-body">
            <div className="features">
              <img src={avatar} alt="Adashi" />
              <Heading5 color="#ffffff" className="mb-2">
                Automated savings
              </Heading5>
              <MyParagraph color="#ffffff">
                You can make automated payments to fund <br /> your plans with a
                preferred choice of frequency.
              </MyParagraph>
            </div>
            <div className="features">
              <img src={avatar2} alt="Adashi" />
              <Heading5 color="#ffffff" className="mb-2">
                Flexible savings
              </Heading5>
              <MyParagraph color="#ffffff">
                Transfer, withdraw, manage and organise your money for free at
                any time.
              </MyParagraph>
            </div>
            <div className="features">
              <img src={avatar3} alt="Adashi" />
              <Heading5 color="#ffffff" className="mb-2">
                Locked savings
              </Heading5>
              <MyParagraph color="#ffffff">
                Lock money away for a fixed duration with no access to it until
                maturity.
              </MyParagraph>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-right">
        <div className="fg-right p-3">
          <Link to="/" className="text-center home-logo">
            <img src={logoImg} alt="Adashi" className="home-logo" />
          </Link>
          <div className="col-lg-6 col-12 mx-auto p">{children}</div>
        </div>
      </div>
    </SignupTemplate.Wrapper>
  );
}

SignupTemplate.Wrapper = styled.div`
  .home-logo {
    display: none;
  }
  display: flex;
  .bg-right {
    padding: 70px 100px 70px 0;

    min-height: 100vh;
    min-width: 65vw;
    background: rgba(5, 145, 87, 0.2);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .fg-right {
      min-height: 80vh;
      // height: -webkit-fill-available;
      min-width: 750px;
      width: 80%;
      background: #ffffff;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .row {
        .col-md-12 {
          h3 {
            margin-bottom: 5px;
          }
          p {
            font-size: 12px;
          }
        }
      }
    }
  }
  .bg-left {
    padding: 70px 0 70px 100px;
    background: rgba(5, 145, 87, 0.8);
    min-height: 100vh;
    min-width: 35vw;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .fg-left {
      position: relative;
      min-height: 80vh;
      // height: 90vh;
      min-width: 350px;
      width: 400px;
      background: rgba(255, 255, 255, 0.004);
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
      padding: 1rem 1rem 1rem 2rem;
      img {
        width: 60px;
      }
      .features-body {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-top: 2rem;
      }
      .features {
        img {
          width: 20px;
          margin-bottom: 15px;
        }
        p {
          // font-size: 16px;
        }
        margin-bottom: 2rem;
      }
    }
  }
  .forgot-link {
    text-decoration: none;
    text-align: right;
    display: block;
    color: rgba(5, 145, 87, 1);
    // margin-top: 10px;
    // margin-bottom: 40px;
    margin: 1rem 0;
    font-size: 14px;
    span {
      color: rgba(71, 72, 107, 0.48);
    }
  }

  .text-left {
    font-size: 14px;
    margin-bottom: 1rem;
  }
  .field {
    margin-top: 1rem;
  }
  .field-top {
    margin: 1rem 0;
  }

  @media screen and (min-height: 870px) {
    .fg-left {
      height: 90vh;
    }
    .fg-right {
      height: 90vh;
    }
  }
  @media screen and (max-height: 870px) {
    .fg-left {
      height: -webkit-fill-available;
      height: -moz-available;
      min-height: 98vh !important;
    }
    .fg-right {
      height: -webkit-fill-available;
      height: -moz-available;
      min-height: 98vh !important;
    }
  }

  @media screen and (max-width: 1280px) {
    .bg-left {
      min-width: 35vw;
    }
    .bg-right {
      min-width: 63.55vw;
    }
  }

  @media screen and (max-width: 1160px) {
    // @media screen and (max-width: 1160px), screen and (max-height: 870px) {
    .bg-left {
      background: rgba(5, 145, 87, 0.8);
      min-height: 100vh;
      min-width: 35vw;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .fg-left {
        // height: -webkit-fill-available;
        min-height: 70vh;
        min-width: 100%;
        width: 100%;
        background: rgba(255, 255, 255, 0.004);
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        box-shadow: none;
        img {
          width: 60px;
        }
        .features {
          img {
            width: 20px;
            margin-bottom: 10px;
          }
          p {
            // display: none;
          }
        }
      }
    }
    .bg-right {
      min-height: 100vh;
      min-width: 65vw;
      background: rgba(5, 145, 87, 0.2);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
      .fg-right {
        // box-shadow: none;
        // height: -webkit-fill-available;
        min-height: 70vh;
        min-width: 100%;
        background: #ffffff;
        border-radius: 10px;
      }
    }
  }
  @media screen and (max-width: 500px) {
    display: block;
    .bg-left {
      display: none;
    }
    .bg-right {
      .fg-right {
        position: relative;
        .home-logo {
          width: 50px;
          top: -15px;
          display: block;
          position: absolute;
        }
        // .welcome {
        //   margin-top: 1rem !important;
        // }
        .field,
        field-a {
          margin-top: 0.5rem;
        }
        .field-top {
          margin: 0.5rem 0;
        }
        .text-left {
          margin-bottom: 0.5rem;
        }
      }
    }
  }
`;

export default SignupTemplate;
