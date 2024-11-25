import { Field } from "formik";
import React from "react";

const Radiobutton = ({ name, value, label, checked, onChange }: any) => {
  return (
    <label className="flex items-center space-x-2">
      <Field
        type="radio"
        name={name}
        value={value}
        className="hidden"
        checked={checked}
        onChange={onChange}
      />
      <span
        className={`w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center`}
      >
        <span
          className={`w-2.5 h-2.5 rounded-full ${
            checked ? "bg-black" : "bg-gray-300"
          }`}
        />
      </span>
      <span className="text-sm">{label}</span>
    </label>
  );
};

export default Radiobutton;
