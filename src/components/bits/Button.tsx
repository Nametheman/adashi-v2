import styled from "styled-components";

interface ButtonType {
  color?: string;
  bg?: string;
  border?: string;
  block?: boolean;
  fontSize?: string;
}
const Button = styled.button`
  color: ${({ color }: ButtonType) => color ?? "#ffffff"};
  // font-weight: 600;
  font-size: ${({ fontSize }: ButtonType) => fontSize ?? "12px"};
  font-weight: bold;
  display: inline-block;
  line-height: 1.5;
  letter-spacing: 1px;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  // cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  background-color: ${({ bg }: ButtonType) => bg ?? "#059157"};
  border: 1px solid ${({ border }: ButtonType) => border ?? "transparent"};
  padding: 0.7rem 2.5rem;
  //   font-size: 2rem;
  border-radius: 10px;
  // border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  ${({ block }: ButtonType) =>
    block &&
    "width: 100%; width: -webkit-fill-available; width: -moz-available; width: fill-available;"};

  @media (max-width: 500px) {
    font-size: ${({ fontSize }: ButtonType) => fontSize ?? "12px"};
  }
`;

export default Button;
