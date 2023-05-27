import React from "react";

type StatesType = {
  value: string;
  data: string[];
  onChange: (e: string) => void;
  name: string;
};

const States: React.FC<StatesType> = ({ value, data, onChange, name }) => {
  return (
    <fieldset>
      <label>{name}</label>
      <select onChange={(e) => onChange(e.target.value)} value={value}>
        {data.map((state) => (
          <option value={state} key={state}>
            {state}
          </option>
        ))}
      </select>
    </fieldset>
  );
};

export default States;
