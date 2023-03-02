import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { ReactComponent as LeftIcon } from "../../assets/icons/left.svg";
import { ReactComponent as RightIcon } from "../../assets/icons/right.svg";

type CardCarouselProps = {
  children: any;
  colour?: string;
  sliderColour: string;
};

const CardCarousel = (props: CardCarouselProps) => {
  const { children } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(children.length);

  // Set the length to match current children from props
  useEffect(() => {
    setLength(children.length);
  }, [children]);

  const next = () => {
    if (currentIndex < length - 1) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };
  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  //   const updateIndex = (newIndex: number) => {
  //     setCurrentIndex(newIndex);
  //   };

  return (
    <Wrapper>
      <div className="carousel-wrapper">
        <div className="carousel-content-wrapper">
          {currentIndex > 0 && (
            <button onClick={prev} className="left-arrow">
              {/* &lt; */}
              <LeftIcon />
            </button>
          )}
          <div
            className="carousel-content"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {children}
          </div>
          {currentIndex < length - 1 && (
            <button onClick={next} className="right-arrow">
              {/* &gt; */}
              <RightIcon />
            </button>
          )}
        </div>
        {/* <div className="sliders">
          {children.map((child: any, index: number) => (
            <div
              onClick={() => {
                updateIndex(index);
              }}
              className="slider-nav"
              style={{
                background: `${
                  index === currentIndex ? sliderColour : " #FFFFFF33"
                }`,
              }}
            ></div>
          ))}
        </div> */}
      </div>
    </Wrapper>
  );
};

export default CardCarousel;

const Wrapper = styled.div`
  //   width: 80%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  // font-size: 16px;

  .sliders {
    display: flex;
    flex-direction: row;
  }

  .slider-nav {
    border-radius: 50%;
    width: 15px;
    height: 15px;
    background: rgba(207, 232, 222, 0.2);
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    margin: 1rem 1rem 1rem 0;
  }

  .carousel-wrapper {
    display: flex;
    flex-direction: column;

    width: 100%;
    position: relative;
  }

  .carousel-content-wrapper {
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  .carousel-content {
    display: flex;
    flex-direction: row;
    // justify-content: center;
    transition: all 250ms linear;
    -ms-overflow-style: none; /* hide scrollbar in IE and Edge */
    scrollbar-width: none; /* hide scrollbar in Firefox */
  }

  /* hide scrollbar in webkit browser */
  .carousel-content::-webkit-scrollbar,
  .carousel-content::-webkit-scrollbar {
    display: none;
  }

  .carousel-content > * {
    width: 100%;
    flex-shrink: 0;
    flex-grow: 1;
  }

  .left-arrow,
  .right-arrow {
    position: absolute;
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: white;
    border: 1px solid #ddd;
  }

  .left-arrow {
    left: 24px;
  }

  .right-arrow {
    right: 24px;
  }
`;
