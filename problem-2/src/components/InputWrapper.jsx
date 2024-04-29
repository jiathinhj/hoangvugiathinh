import { Input } from "@material-tailwind/react";
import { useField } from "formik";
import React from "react";

const InputWrapper = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name);
  const configs = {
    ...field,
    ...otherProps,
  };

  return (
    <div className="my-5">
      <Input {...configs} placeholder="Input amount here" type="number" />

      {meta.error && meta.touched && (
        <p className="text-red-500 text-sm mt-1 px-1">{meta.error}</p>
      )}
    </div>
  );
};

export default InputWrapper;
