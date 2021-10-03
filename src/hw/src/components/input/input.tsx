import React, { useCallback } from "react";

import "./style.scss";

export type inputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};
const Input: React.FC<inputProps> = ({ value, onChange, placeholder }) => {
  const handelChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <input
      className="input input-group_input"
      value={value}
      placeholder="Введите название организации"
      onChange={handelChange}
    ></input>
  );
};

export default React.memo(Input);
