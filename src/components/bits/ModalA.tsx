import { ReactElement } from "react";
import styled from "styled-components";
// import { isAuth } from "utility/helper";

export interface ModalProps {
  isShown: boolean;
  hide: () => void;
  modalContent: ReactElement;
  isSummary?: boolean;
  children: any;
}

const ModalA: any = ({
  isShown,
  hide,
  children,
}: //   isSummary,
ModalProps) => {
  // isAuth();
  return (
    isShown && (
      <Wrapper>
        <div
          //   className={`modal-body ${
          //     isAuth()
          //       ? "col-xl-3 col-lg-4  col-md-6"
          //       : `${
          //           isSummary
          //             ? "col-xl-3 col-lg-4  col-md-4"
          //             : "col-xl-6 col-lg-10  col-md-10"
          //         }`
          //   }`}
          className="modala-body col-xl-4 col-lg-6  col-md-8"
        >
          {children}
        </div>
      </Wrapper>
    )
  );
};

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  width: -webkit-fill-available;
  height: -webkit-fill-available;
  width: -moz-available;
  height: -moz-available;
  width: 100%;
  height: 100%;
  // width: 100vw;
  // height: 100vh;
  // background: red;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;

  > .modala-body {
    border-radius: 15px;
    padding: 0;
    background-color: white;
    border-outline: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    z-index: 30;
    animation: slide-down 300ms ease-out forwards;
    max-height: 100vh;
    overflow: auto;
  }
`;

export default ModalA;
