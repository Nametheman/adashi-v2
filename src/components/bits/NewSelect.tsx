// import { useState } from "react";
import styled from "styled-components";

interface DataTypes {
  name: string;
  value: string | number;
}

interface SelectTypes {
  className?: string;
  label?: string;
  options: DataTypes[];
  fullWidth?: boolean;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  name?: string;
  ref?: any;
  onChange?: any;
  properties?: any;
  selected?: {
    name: string;
    value: any;
  };
}
const NewSelect = ({
  label,
  //   value,
  options,
  fullWidth,
  required,
  disabled,
  placeholder,
  name,
  selected,
  properties,
  ref,
  onChange,
  className,
}: SelectTypes) => {
  //   const getDisplay = () => {
  //     if (selected) {
  //       return selected.name;
  //     }

  //     return placeholder;
  //   };
  //   const [isSelected, setIsSelected] = useState(false);

  return (
    <NewSelect.Wrapper fullWidth={fullWidth}>
      <div className="form-group mb-4">
        {label && (
          <label>
            {label}
            <span className="text-danger">{required && "*"}</span>{" "}
          </label>
        )}
        <select
          onChange={(e) => onChange && onChange(e)}
          name={name}
          ref={ref}
          required={required}
          {...properties}
          className={`custom-select mb-2 ${className}`}
          // className="custom-select mb-2"
          placeholder={placeholder}
          disabled={disabled}
        >
          {selected?.value ? (
            // <option style={{ display: `${isSelected}` ? "block" : "none" }} value={selected.value}>
            <option value={selected.value}>{selected.name}</option>
          ) : (
            <option>{placeholder}</option>
          )}

          {options.map((data: DataTypes, i: number) => (
            <>
              <option key={i} value={data.value}>
                {data.name}
              </option>
            </>
          ))}
        </select>
      </div>
    </NewSelect.Wrapper>
  );
};

NewSelect.Wrapper = styled.div<any>`
  .form-group {
    label {
      // font-size: 16px;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.35;
      letter-spacing: 0.14px;
      text-align: left;
      color: #000000;
      margin-bottom: 5px;
    }
    select {
      width: ${(props: SelectTypes) =>
        props.fullWidth ? props.fullWidth : "500.3px"};
      // font-size: 16px;
      //   line-height: 17px;
      color: #7b7b7b;
      padding: 1rem;
      padding-left: 2rem;
      border-radius: 1rem;
      border: 1px solid #bec6df;
      width: 100%;
      display: block;
      transition: all 0.3s;
      box-shadow: 0px 3px 6px #0000000d;
      // height: 4.9rem;
      height: 60px;
      background: #f9fffb;
      &:focus {
        outline: none;
        border: 0.5px solid #bec6df;
        background-color: none;
      }

      &:focus:invalid {
        border: 1px solid red;
      }

      &::-webkit-input-placeholder {
        color: #47486b;
        opacity: 0.4;
      }
      &:disabled {
        background-color: #dadceb;
        color: #47486b;
        cursor: not-allowed;
      }
    }
  }
  @media (max-width: 1280px) {
    .form-group {
      input {
        width: 100%;
      }
    }
  }
  @media (max-width: 520px) {
    .form-group {
      label {
        font-size: 13px !important;
      }
      select {
        width: 100%;
        height: 50px;
        padding-left: 10px;
        font-size: 13px;
        color: #7b7b7b;
        padding-left: 2rem;
      }
    }
  }
`;
export default NewSelect;
