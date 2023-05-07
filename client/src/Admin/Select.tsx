import React from "react";

type SelectType = {
  data: string[];
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const Select: React.FC<SelectType> = ({ data, value, setValue }) => {
  return (
    <select value={value} onChange={(e) => setValue(e.target.value)}>
      {data.map((item, idx) => (
        <option value={item} key={idx}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default Select;
