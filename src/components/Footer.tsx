import { Link } from "react-router-dom";
import styled from "styled-components";

import footerBg from "../assets/img/footerbg.svg";
import logo from "../assets/img/logo2 1.svg";
import {
  cooperativeGroupSavings,
  individualSavings,
  targetGroupSavings,
  user,
} from "../utils/routes";

import { Heading4 } from "./bits/Text";

function Footer() {
  return (
    <Footer.Wrapper>
      <div className="footer">
        <img src={logo} alt="Adashi-Logo" />
        <div className="item">
          <Heading4>Company</Heading4>
          <Link to="/product">About</Link>
        </div>
        <div className="item">
          <Heading4>Product</Heading4>
          <div>
            <Link to={`${user}/${individualSavings}`}>Individual savings</Link>
          </div>
          <div className="item_mid">
            <Link to={`${user}/${targetGroupSavings}`}>
              Target Group savings
            </Link>
          </div>
          <div>
            <Link to={`${user}/${cooperativeGroupSavings}`}>
              Cooperative Group savings
            </Link>
          </div>
        </div>
        <div className="item">
          <Heading4>Get in touch</Heading4>
          <div>
            <a href="mailto:tm30@adashi.com">tm30@adashi.com</a>
          </div>
          <div>
            <a href="tel:+234 812 345 6789">+234 812 345 6789</a>
          </div>
        </div>
      </div>
    </Footer.Wrapper>
  );
}

Footer.Wrapper = styled.div`
  background: url(${footerBg});
  background-size: cover;
  width: 100%;
  padding-top: 7rem;
  padding-bottom: 3rem;
  margin-top: 100px;

  a,
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }
  h4 {
    margin-bottom: 40px;
  }

  a {
    color: #47486b;
    font-weight: 100;
    opacity: 0.7;
  }
  .item_mid {
    margin: 20px 0;
  }
  .footer {
    max-width: 1500px;
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  @media screen and (max-width: 1080px) {
    .footer {
      flex-direction: column;
    }
    h4 {
      margin-bottom: 10px;
    }
    .item {
      margin-top: 60px;
    }
    .item_mid {
      margin: 10px 0;
    }
  }
`;

export default Footer;
