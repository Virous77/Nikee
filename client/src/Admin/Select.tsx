import React from "react";

type SelectType = {
  data: string[];
  value: string;
  setValue: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Select: React.FC<SelectType> = ({ data, value, setValue }) => {
  return (
    <select value={value} onChange={setValue}>
      {data.map((item, idx) => (
        <option value={item} key={idx}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default Select;
