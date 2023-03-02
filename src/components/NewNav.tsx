import styled from "@emotion/styled";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logoImg from "../assets/img/logo2 1.svg";

import Button from "./bits/Button";
// import Button from "./reusables/Button";

const NewNavbar = ({ navRef, scroll, productRef, faqsRef, heroRef }: any) => {
  const navigate = useNavigate();
  const [nav, setNav] = useState(false)
  const [navBg, setNavBg] = useState(false)

  const changeBackgroundNav = () => {
    if(window.scrollY >= 10){
        setNavBg(true)
    } else{
        setNavBg(false)
    }
  }
  window.addEventListener('scroll', changeBackgroundNav)

  const date = new Date()

  const scrollTo = (x: any, id: any) => {
    setNav(false)
    if(window.location.pathname === "/"){
        scroll(x)
    }else{
        navigate(id)
    }
  }

  return (
    <Wrapper
      ref={navRef}
    >
        <div className={`other ${navBg ? 'active' : ''}`}>
            <div className="container">
                <div className="nav_one">
                    <div className="logo_img">
                        <img src={logoImg} alt="" />
                    </div>
                    <div className="nav_links">
                        <div onClick={() => scrollTo(heroRef, '#hero')} className="nav_link">Home</div>
                        <div onClick={() => scrollTo(productRef, '#products')} className="nav_link">Products</div>
                        <div onClick={() => scrollTo(faqsRef, '#faqs')} className="nav_link">FAQs</div>
                    </div>
                </div>
                <div className="nav_two">
                    <Link style={{marginRight: '10px'}} className="mr-4" to="/login">
                        <Button fontSize="18px">Log In</Button>
                    </Link>
                    <Link className="mr-4" to="/signup">
                        <Button fontSize="18px" bg="#FFF" color="#059157">Sign Up</Button>
                    </Link>
                </div>
                <div className="nav_burger">
                <div onClick={() => setNav(el => !el)} className="hamburger-icon" id="icon">
                    <div className={`icon-1 ${nav && 'a'}`} id="a"></div>
                    <div className={`icon-3 ${nav && 'b'}`} id="b"></div>
                    <div className={`icon-2 ${nav && 'c'}`} id="c"></div>
                    <div className="clear"></div>
                </div>
                    <div className={`nav_burger_sect ${nav && 'open'}`}>
                        <div className="nav_burger_sect_in">
                            <div onClick={() => scrollTo(heroRef, '#hero')} className="nav_link">Home</div>
                            <div onClick={() => scrollTo(productRef, '#products')} className="nav_link">Products</div>
                            <div onClick={() => scrollTo(faqsRef, '#faqs')} className="nav_link">FAQs</div>
                            <div>
                                <Link className="mr-4" to="/login">
                                    <Button fontSize="22px">Log In</Button>
                                </Link> 
                            </div>
                            <div>
                                <Link className="mr-4" to="/signup">
                                    <Button className="sign_up" fontSize="22px" bg="#FFF" color="#059157">Sign Up</Button>
                                </Link>
                            </div>
                        </div>
                        <div className="other">
                            <div>
                                <div>
                                    <img className="logo_img2" src={logoImg} alt="" />
                                </div>
                                <div>
                                    Adashi Technologies - <b>©{date.getFullYear()}</b>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        </div>
      
    </Wrapper>
  );
};

export default NewNavbar;
const Wrapper = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
transition: all 500ms;
z-index: 10000;
.other{
    background: transparent;
    transition: all 0.4s;
    background: white;
    border-bottom: 2px solid rgba(0, 0, 0, 0);
}
.other.active{
    border-bottom: 2px solid #34277b29;
}
*{
    margin: 0;
    box-sizing: border-box;
}
.container{
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1500px;
    width: 90%;
    margin: 0 auto;
    z-index: 1000;
    padding: 20px 0px;

    .nav_one{
        display: flex;
        align-items: center;
        justify-content: space-between;

        .logo_img{
            width: 60px;
            margin-right: 64px;
            pointer-events: none;

            img{
                width: 100%
            }
        }

        .nav_links{
            display: flex;
            

        }
    }

    .nav_burger{
        display: none
    }
    .nav_link{
        margin-right: 64px;
        color: #33277B;
        font-size: 18px;
        cursor: pointer;
    }
}

@media screen and (max-width: 960px) {
    .container{
        padding: 20px 0px;

        align-items: flex-start;
        .nav_one{
            .nav_links{
                display: none
            }
        }
        .nav_two{
            display: none
        }
        .nav_burger{
            display: block;
            position: relative;
            transition: all 1s;


            .hamburger-icon {
                position: relative;
                height: 60px;
                width: 60px;
                z-index: 1000;
                cursor: pointer;
                border-radius: 50%;
                transition: all 0.2s ease-in-out;
                background: rgba(255,255,255,0.2);
            }

            .icon-1, .icon-2, .icon-3 {
                position: absolute;
                left: 25%;
                top: 50%;
                width: 30px;
                height: 3px;
                background-color: #33277B;
                transition: all 400ms cubic-bezier(.84,.06,.52,1.8);
            }
            
            .icon-1 {
              transform: translateY(-8px);
              animation-delay: 100ms;
            }
            
            .icon-3 {
              transform: translateY(8px);
              animation-delay: 250ms;
            }

            .icon-1.a {
                transform: rotate(40deg);
            }
            .icon-3.b {
                transform: rotate(-40deg);
            }
            .icon-2.c {
                opacity: 0;
            }
            
            .nav_burger_sect{
                position: fixed;
                top: 0;
                right: 0; 
                transform: translateX(20%);
                opacity: 0;
                pointer-events: none;
                width: 400px;
                max-width: 80%;
                padding: 30px;
                background: white;
                box-shadow: -1px -5px 53px -16px rgba(51,39,123,0.46);
                z-index: 10;
                transition: all 400ms;
                height: 100vh !important;
                padding-top: 50px;

                .nav_burger_sect_in{
                    padding-bottom: 10px;
                    border-bottom: 1px solid #00000021;
                    height: 84%;
                }
                
                .nav_link{
                    margin-right: 0px;
                    font-size: 22px;
                    width: max-content;
                    margin-bottom: 30px;
                }
                .sign_up{
                    padding-left: 0px
                }
                div{
                    margin-bottom: 24px 
                }
            }

            .nav_burger_sect.open{
                pointer-events: all;
                opacity: 1;
                transform: translateX(0);
            }
          
        }
    }
}
.other{
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: flex-end;
}
.logo_img2{
    width: 50px;
}
`;
