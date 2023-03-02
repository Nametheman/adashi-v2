import React, { useState } from "react";
import styled from "styled-components";

interface IconPasswordInputProps {
  className?: string;
  onChange?: any;
  name?: string;
  value?: any;
  label?: string;
  placeholder?: string;
  required?: boolean;
  cols?: number;
  rows?: number;
  pattern?: RegExp | string;
  onClick?: any;
  disabled?: boolean;
  autoComplete?: any;
  width?: any;
  maxLength?: any;
  minLength?: number;
  refs?: any;
  onKeyUp?: any;
  onKeyPress?: any;
  properties?: any;
  readOnly?: boolean;
  accept?: any;
  fullWidth?: any;
  icon?: any;
  onPaste?: any;
}

const IconPasswordInput = ({
  value,
  fullWidth,
  pattern,
  minLength,
  onChange,
  readOnly,
  name,
  placeholder,
  icon,
  required,
  properties,
  onKeyPress,
  onPaste,
  autoComplete,
}: IconPasswordInputProps) => {
  const [toggle, setToggle] = useState(false);
  return (
    <IconPasswordInput.Wrapper fullWidth={fullWidth}>
      <div className="input">
        <i className={icon}></i>
        <input
          type={toggle ? "text" : "password"}
          name={name}
          value={value}
          onChange={(e) => onChange && onChange(e)}
          className=""
          readOnly={readOnly}
          {...properties}
          required={required}
          placeholder={placeholder}
          pattern={pattern}
          autoComplete={autoComplete}
          minLength={minLength}
          onKeyPress={onKeyPress}
          onPaste={onPaste}
        />
        {toggle ? (
          <i
            onClick={() => setToggle(!toggle)}
            style={{ opacity: 1, fontSize: "12px" }}
            className={"far fa-eye-slash"}
          ></i>
        ) : (
          <i
            onClick={() => setToggle(!toggle)}
            style={{ opacity: 1, fontSize: "12px" }}
            className={"fas fa-eye-slash"}
          ></i>
        )}
      </div>
    </IconPasswordInput.Wrapper>
  );
};

IconPasswordInput.Wrapper = styled.div`
  .input {
    // width: ${(props: any) =>
      props.fullWidth ? props.fullWidth : "500.3px"};
    width: 100%;
    height: 40px;
    // border-radius: 1rem;
    border-radius: 4px;
    background: #f7f7f7;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: none;
    margin-bottom: 10px;
    padding: 0 10px;

    input {
      border: none;
      width: 100%;
      border-radius: 4px;
      height: 40px;
      outline: none;
      // font-size: 16px;
      line-height: 17px;
      color: #7b7b7b;
      background: #f7f7f7;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      // line-height: 1.35;
      padding: 1rem;
      // padding-left: 2rem;
      letter-spacing: 0.16px;
      text-align: left;
      margin-bottom: 0;
      ::placeholder {
        color: #c4c4c4;
      }
    }
    i {
      color: #c4c4c4;
      font-size: 18px;
    }
  }

  @media (max-width: 1280px) {
    .input {
      width: 100%;
    }
  }
  @media (max-width: 520px) {
    padding: 0;
    .input {
      // margin: 0;
      // border-radius: 1rem;
      margin-bottom: 1rem;
      border-radius: 10px;
      height: 50px;
      input {
        font-size: 15px;
        height: 40px;
      }
      i {
        color: #c4c4c4;
        font-size: 15px;
      }
    }
  }
`;
export default IconPasswordInput;
