import styled from "@emotion/styled";
import React from "react";

interface InputProps {
  className?: string;
  onChange?: any;
  name?: string;
  value?: any;
  type: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  cols?: number;
  rows?: number;
  pattern?: any;
  onClick?: any;
  disabled?: boolean;
  autoComplete?: any;
  width?: any;
  minLength?: number;
  maxLength?: number;
  // maxLength?: any;
  refs?: any;
  onKeyUp?: any;
  onKeyPress?: any;
  properties?: any;
  readOnly?: boolean;
  accept?: any;
  height?: string;
  min?: number;
  max?: number;
  capitalize?: boolean;
}

const Input = (props: InputProps) => {
  const {
    onChange,
    label,
    value,
    type,
    name,
    pattern,
    placeholder,
    cols = 10,
    rows = 5,
    onClick,
    required,
    disabled,
    autoComplete,
    maxLength,
    refs,
    onKeyUp,
    onKeyPress,
    className,
    properties,
    readOnly,
    accept,
    min,
    max,
  } = props;

  return (
    <Input.Wrapper className="form">
      <div className="form">
        {type === "textarea" ? (
          <textarea
            className="form__input"
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            cols={cols}
            rows={rows}
            {...properties}
            disabled={disabled}
          ></textarea>
        ) : (
          <input
            className={`${
              value?.length ? "filled" : ""
            } form__input ${className}`}
            type={type}
            placeholder={placeholder}
            name={name}
            readOnly={readOnly}
            value={value}
            pattern={pattern}
            onChange={onChange}
            required={required}
            onClick={onClick}
            disabled={disabled}
            autoComplete={autoComplete}
            maxLength={maxLength}
            ref={refs}
            {...properties}
            onKeyUp={onKeyUp}
            onKeyPress={onKeyPress}
            accept={accept}
            min={min}
            max={max}
          />
        )}
        <label
          htmlFor={name}
          className={`${value?.length ? "shrink" : ""} form__label`}
        >
          {label}
        </label>
      </div>
    </Input.Wrapper>
  );
};

Input.Wrapper = styled.div`
  /* margin-top: 2rem; */
  .filled {
    background-color: #e6ffea;
    border: 0.5px solid #059157;
  }
  .form {
    position: relative;
    &__label {
      position: absolute;
      top: 0;
      left: 0.5rem;
      padding: 0 0.3rem;
      // font-size: 1.2rem;
      // line-height: 1.5rem;
      // font-size: 16px;
      line-height: 17px;
      background-color: #e6ffea;
      display: block;
      transition: all 0.3s;
      opacity: 0;
      color: #059157;
    }
    &__input {
      // font-size: 1.3rem;
      // font-size: 16px;
      line-height: 17px;
      //   font-family: Orkney;
      color: #7b7b7b;
      background: #f7f7f7;
      padding: 1rem;
      padding-left: 1rem;
      // border-radius: 1rem;
      border-radius: 4px;
      border: none;
      width: 100%;
      display: block;
      transition: all 0.3s;
      box-shadow: 0px 3px 6px #0000000d;
      // height: 40px;
      height: ${(props: any) => (props.height ? props.height : "40px")};
      margin-bottom: 10px;

      /* Chrome, Safari, Edge, Opera */
      &[type="number"]::-webkit-outer-spin-button,
      &[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      /* Firefox */
      &[type="number"] {
        -moz-appearance: textfield;
      }
      &:focus {
        outline: none;
        border: 0.5px solid #bec6df;
        background-color: #ffffff;
      }

      &:focus {
        outline: none;
        border: 0.5px solid #bec6df;
        background-color: #ffffff;
      }

      &:focus:invalid {
        border: 1px solid red;
      }

      &::-webkit-input-placeholder {
        // font-family: Orkney;
        color: #47486b;
        opacity: 0.4;
      }
      &:disabled {
        background-color: #dadceb;
        color: #47486b;
        cursor: not-allowed;
      }
    }
    .shrink {
      top: -0.8rem;
      opacity: 1;
    }
  }
  // @media (max-width: 1280px) {
  //   .form &__input {
  //     width: 100%;
  //   }
  // }
  @media (max-width: 520px) {
    .form {
      position: relative;

      &__input {
        // font-size: 16px;
        line-height: 17px;
        // font-family: Orkney;
        color: #7b7b7b;
        padding: 1rem;
        padding-left: 1rem;
        // border-radius: 1rem;
        border-radius: 10px;
        border: 1px solid #bec6df;
        width: 100%;
        display: block;
        transition: all 0.3s;
        box-shadow: 0px 3px 6px #0000000d;
        height: 50px;
        background: #f9fffb;
      }
    }
  }
`;
export default Input;
