import styled from "@emotion/styled";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logoImg from "../assets/img/logo2 1.svg";

import Button from "./bits/Button";
// import Button from "./reusables/Button";

export const Burger = ({ open, setOpen }: any) => {
  return (
    <StyledBurger open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </StyledBurger>
  );
};

const UnAuthNavbar = ({ navRef, bg, scroll, productRef, faqsRef }: any) => {
  const [show, setShow] = useState(false);
  let navigate = useNavigate();

  return (
    <Wrapper
      ref={navRef}
      className={`${bg ? "bg-white py-3 shadow" : "py-3"} ${
        show && "bg-white"
      }`}
    >
      <div className="container">
        <div className="mobile-menu">
          <div>
            <img src={logoImg} alt="Adashi" />
          </div>
          <div className="menu">
            <Burger open={show} setOpen={setShow} />
          </div>
        </div>
        <div className={`cta-container ${show && "show"}`}>
          <div className="links">
            <Link to="/">Home</Link>
            <span
              onClick={() => {
                window.location.pathname === "/"
                  ? scroll(productRef)
                  : navigate("/#products");
                setShow(false);
              }}
            >
              Products
            </span>
            <span
              onClick={() => {
                window.location.pathname === "/"
                  ? scroll(faqsRef)
                  : navigate("/#faqs");
                setShow(false);
              }}
            >
              FAQs
            </span>
          </div>
          <div className="cta_buttons">
            <Link className="mr-4" to="/login">
              <Button>Login</Button>
            </Link>
            <Link to="/signup">
              {/* <Button label="Sign Up" /> */}
              <Button bg="#ffffff" color="#059157">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default UnAuthNavbar;
const StyledBurger = styled.button<any>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: #03b66b;
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-of-type {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    :nth-of-type(2) {
      // opacity: ${({ open }) => (open ? "0" : "1")};
      transform: ${({ open }) => (open ? "translateX(-4px)" : "translateX(0)")};
    }

    :nth-of-type(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;
const Wrapper = styled.div`
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  .bg-white {
    background: #ffffff;
  }
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > img {
      /* width: ; */
    }

    .links {
      display: flex;
      justify-content: space-between;
      align-items: center;
      a,
      span {
        padding: 10px 20px;
        text-decoration: none;
        font-weight: 600;
        font-size: 20px;
        line-height: 29px;
        /* identical to box height */

        color: #33277b;
        cursor: pointer;
      }
    }
    .mobile-menu {
      margin-right: 30px;
      img {
        width: 50px;
      }
      .menu {
        display: none;
      }
    }
    .cta-container {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
    .cta_buttons {
      display: flex;
      justify-content: space-between;
    }
    button {
    }
    .hamburger {
      display: none;
    }
    .close {
      display: none;
    }
  }

  @media screen and (max-width: 960px) {
    .container {
      justify-content: space-between;
      flex-direction: column;
      padding: 0 2rem;
      align-items: flex-start;
      > .container {
        position: relative;
      }
      .cta-container {
        padding: 2rem;
        position: absolute;
        top: 60px;
        left: 0;
        width: 100vw;
        z-index: 20;
        height: 100vh;
        background: white;
        display: none;
      }
      .hide {
        display: none;
      }
      .show {
        display: block;
      }
      .links,
      .cta_buttons {
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: flex-start;
        /* height: 49vh; */

        left: -100%;
        & > * {
          margin: 1rem 0;
        }
      }
      .cta_buttons {
      }
      .links {
        margin-top: 2rem;
      }
      .hamburger {
        display: block;
        cursor: pointer;
      }
      .close {
        display: block;
        position: absolute;
        right: 10%;
        top: 8%;
        font-size: 2rem;
        cursor: pointer;
      }
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      }
      .mobile-menu {
        display: flex;
        width: 100%;
        justify-content: space-between;
        div {
          img {
            width: 35px;
          }
        }
        .menu {
          display: block;
        }
      }
    }
  }
`;
