import React, { useState } from "react";
import { Option, Select } from "@material-tailwind/react";
import { useField, useFormikContext } from "formik";

export function DropdownWrapper({ name, label, currencies }) {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  // const [value, setValue] = useState("");

  const handleChange = (value) => {
    // setValue(value.currency);
    setFieldValue(name, value);
  };

  const configs = {
    ...field,
    label,
  };
  console.log(configs);

  return (
    <div className="w-[40%]">
      <Select {...configs} onChange={handleChange} value={"USD"}>
        {currencies?.map((data, i) => (
          <Option key={`${data.currency}-${i}`} value={data}>
            <div className="flex gap-3">
              <img
                src={`https://raw.githubusercontent.com/jiathinhj/token-icons/d5e14bba248508d0ed5f9f2741df256de63747ca/tokens/${data.currency}.svg`}
                alt="currency-icon"
                className="h-6 w-6"
              />
              {data.currency}
            </div>
          </Option>
        ))}
      </Select>
      {meta && meta.touched && (
        <p className="text-red-500 text-sm mt-1 px-1">{meta.error}</p>
      )}
    </div>
  );
}
