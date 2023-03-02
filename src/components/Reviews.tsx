import { useEffect, useState } from "react";
import styled from "styled-components";

import quotes from "../assets/icons/Group 2.svg";
import ellipse from "../assets/img/Ellipse 1096.svg";
import avatar from "../assets/img/Ellipse 4.png";
import reviewBg from "../assets/img/reviewbg.svg";

import { Heading2, Heading5, MyParagraph, Paragraph } from "./bits/Text";

function Reviews() {
  const [reviews] = useState([
    {
      avatar: avatar,
      name: "Tolu Beckley",
      title: "It is very convenient and easy to use.",
      desc: "It’s been almost two months that i started this journey. I am amazed at how much i have been able to save over a short period., even though before now it seemed impossible for me to ever think of saving.",
    },
    {
      avatar: avatar,
      name: "Daniel Adekoya",
      title: "I enjoy using every bit of this app.",
      desc: "It’s been almost two months that i started this journey. I am amazed at how much i have been able to save over a short period., even though before now it seemed impossible for me to ever think of saving.",
    },
    {
      avatar: avatar,
      name: "Korede Bello",
      title:
        "My saving culture really developed after 3 months using this app.",
      desc: "It’s been almost two months that i started this journey. I am amazed at how much i have been able to save over a short period., even though before now it seemed impossible for me to ever think of saving.",
    },
  ]);

  const [review, setReview] = useState({
    title: "",
    desc: "",
  });

  const [currentReview, setCurrentReview] = useState("");

  const showReview = (title: string, desc: string, check: string) => {
    setReview({ title: title, desc: desc });
    setCurrentReview(check);
  };

  useEffect(() => {
    showReview(reviews[0].title, reviews[0].desc, reviews[0].title);
  }, [reviews]);

  return (
    <Reviews.Wrapper>
      <div className="reviews">
        <div className="reviews_bg">
          <div>
            <Heading5>REVIEWS</Heading5>
            <Heading2 fontSize="30px !important">
              What our users say <br /> about us
            </Heading2>
          </div>
        </div>
        <div className="reviews_list">
          <img src={quotes} alt="" />
          <div>
            <div>
              <Heading2>{review.title}</Heading2>
              <MyParagraph lineHeight="27px !important">
                {review.desc}
              </MyParagraph>
            </div>
            <div className="review_img">
              {reviews.map((item) => {
                return (
                  <div key={item.title} className="review">
                    <img
                      className={`${
                        currentReview === item.title && "review_active"
                      }`}
                      onClick={() => {
                        showReview(item.title, item.desc, item.title);
                      }}
                      src={avatar}
                      alt=""
                    />
                    <span>
                      <Heading5
                        fontSize="13.5px !important"
                        className={`${
                          currentReview === item.title && "active"
                        }`}
                      >
                        {item.name}
                      </Heading5>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <img className="eclipse" src={ellipse} alt="app" />
    </Reviews.Wrapper>
  );
}

Reviews.Wrapper = styled.div`
  padding-top: 7rem;
  padding-bottom: 7rem;
  position: relative;

  h2,
  h5,
  p {
    margin: 0;
    color: white;
  }
  h2 {
    margin-top: 30px;
  }
  h2:first-child {
    color: #33277b;
  }
  h5:last-child {
    color: #33277b;
    opacity: 0;
    transition: all 0.6s;
  }
  h5.active:last-child {
    opacity: 1;
  }
  p {
    font-size: 20px;
    opacity: 0.7;
    margin-top: 40px;
    color: #33277b;
    line-height: 40px;
    border-bottom: 1px solid #47486b;
    padding-bottom: 60px;
  }
  .reviews {
    max-width: 1500px;
    width: 90%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 80px;
  }
  .reviews_bg {
    background: url(${reviewBg});
    background-size: cover;
    border-radius: 10px;
    position: relative;
    padding: 100px;
    height: 100%;
    width: 100%;
    transition: all 0.6s;
  }
  .reviews_list {
    height: 100%;
  }
  .reviews_list .eclipse {
    position: absolute;
    right: 0;
    top: 20px;
    z-index: -1;
    height: 40rem;
  }
  .review {
    margin-right: 30px;
    text-align: center;
    width: 80px;
  }
  .review_img {
    margin-top: 50px;
    display: flex;
  }
  .review_img img {
    opacity: 0.6;
    width: 100%;
    cursor: pointer;
    margin-bottom: 10px;
    transition: all 0.8s;
  }
  .review_img img.review_active {
    opacity: 1;
  }
  @media screen and (max-width: 1080px) {
    .reviews {
      grid-template-columns: repeat(1, 1fr);
      grid-row-gap: 40px;
      height: auto;
    }
    .reviews_bg {
      padding: 50px;
    }
  }

  .eclipse {
    position: absolute;
    right: 0;
    top: 20px;
    z-index: -1;
    height: 40rem;
  }
`;

export default Reviews;
