import styled from "styled-components";

interface HeadingType {
  color?: string;
  mb?: string;
  mt?: string;
  fontSize?: string;
  width?: string;
  lineHeight?: string;
}

export const Heading1 = styled.h1<HeadingType>`
  color: ${({ color }: HeadingType) => color ?? "rgba(51, 39, 123, 1)"};
  font-weight: bold;
  margin-bottom: 50px;
`;
export const Heading2 = styled.h2<HeadingType>`
  color: ${({ color }: HeadingType) => color ?? "rgba(51, 39, 123, 1)"};
  font-weight: bold;
  font-size: ${({ fontSize }: HeadingType) => fontSize ?? "15px"};
  margin-bottom: ${({ mb }: HeadingType) => mb ?? "50px"};
`;
export const Heading3 = styled.h3<HeadingType>`
  color: ${({ color }: HeadingType) => color ?? "rgba(51, 39, 123, 1)"};
  font-weight: bold;
  font-size: 27px;
`;
export const Heading4 = styled.h4<HeadingType>`
  color: ${({ color }: HeadingType) => color ?? "rgba(51, 39, 123, 1)"};
  font-weight: bold;
  margin-bottom: 40px;
`;
export const Heading5 = styled.h5<HeadingType>`
  color: ${({ color }: HeadingType) => color ?? "rgba(51, 39, 123, 1)"};
  font-size: ${({ fontSize }: HeadingType) => fontSize ?? "16px"};
  font-weight: bold;
  margin-bottom: ${({ mb }: HeadingType) => mb ?? "40px"};
  margin-top: ${({ mt }: HeadingType) => mt ?? "0"};
`;

export const Heading5Light = styled.h5<HeadingType>`
  color: ${({ color }: HeadingType) => color ?? "#059157"};
  // font-weight: bold;
  // margin-bottom: 40px;
  font-size: ${({ fontSize }: HeadingType) => fontSize ?? "15px"};
`;
export const Paragraph = styled.p<HeadingType>`
  color: ${({ color }: HeadingType) => color ?? "rgba(71, 72, 107, 1)"};
  margin-bottom: 20px;
  line-height: 28px;
  font-size: 18px;
  font-weight: 100;
`;
export const MyParagraph = styled.p<HeadingType>`
  color: ${({ color }: HeadingType) => color ?? "rgba(71, 72, 107, 1)"};
  margin-bottom: 20px;
  font-weight: 100;
  font-weight: 500 !important;
  line-height: ${({ lineHeight }: HeadingType) => lineHeight ?? "25px"};

  font-size: ${({ fontSize }: HeadingType) => fontSize ?? "14px !important"};
  width: ${({ width }: HeadingType) => width ?? "100%"};
`;
export const Label = styled.label<HeadingType>`
  color: ${({ color }: HeadingType) => color ?? "#33277B"};
  margin-bottom: 5px;
  font-size: 11px;
  font-weight: 600;
`;
