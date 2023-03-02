import { useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";

import Faqs from "../../components/Faqs";
import Features from "../../components/Features";
import Footer from "../../components/Footer";
import GetOnStore from "../../components/GetOnStore";
import Hero from "../../components/Hero";
import NewNavbar from "../../components/NewNav";
import Reviews from "../../components/Reviews";
import SavingsTypes from "../../components/SavingsTypes";
//import UnAuthNavbar from "../../components/UnAuthNavbar";
import { user } from "../../utils/routes";

function Home() {
  const productRef = useRef<HTMLElement>(null);
  const faqsRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  //const [bg, setBg] = useState(true);
  const scrollToDiv = (ref: any) =>
    window.scrollTo(0, ref.current.offsetTop - 200);
  let navRef = useRef<HTMLDivElement | any>(null);
  function setBackground() {
    if (
      navRef &&
      navRef.current &&
      window.pageYOffset > navRef.current.scrollHeight
    ) {
      //setBg(true);
    } else {
      //setBg(false);
    }
  }
  window.onscroll = function () {
    setBackground();
  };
  useEffect(() => {
    window.location.hash === "#products" && scrollToDiv(productRef);
    window.location.hash === "#faqs" && scrollToDiv(faqsRef);
    // useGetMetricsQuery();
  }, []);

  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     navigate(user);
  //   }
  // }, [navigate]);

  if (localStorage.getItem("token")) {
    return <Navigate to={user} replace={true} />;
  }

  return (
    <Home.Wrapper>
      <NewNavbar 
        productRef={productRef}
        faqsRef={faqsRef}
        scroll={scrollToDiv}
        navRef={navRef}
        heroRef={heroRef}
      />
      {/* <UnAuthNavbar
        productRef={productRef}
        faqsRef={faqsRef}
        scroll={scrollToDiv}
        navRef={navRef}
        bg={bg}
      /> */}
      <Hero heroRef={heroRef} />
      <Features />
      <SavingsTypes productRef={productRef} />
      <Reviews />
      <GetOnStore />
      <Faqs faqsRef={faqsRef} />
      <Footer />
    </Home.Wrapper>
  );
}

Home.Wrapper = styled.div`
overflow-x: hidden
`;

export default Home;
