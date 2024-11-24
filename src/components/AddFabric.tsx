import React, { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import MultiSelectDropdown from "./Dropdown";
import SearchableDropdown from "./SearchableDropdown";

// Initial Form Values
const initialValues = {
  startDate: new Date().toISOString().split("T")[0],
  endDate: new Date().toISOString().split("T")[0],
  productionPerDay: "",
  totalOrderQuantity: "",
  fabricName: [],
  perPieceRequirement: "",
  unit: "Metre",
  processes: [],
  colorQuantity: [{ color: "", quantity: "" }],
  skippedStages: [],
  isInternationalFabricPresent: false,
  chinaFabrics: [],
  majorFabric: "None",
  trims: [],
  accessories: [],
};

// Form submission handler
const handleSubmit = (values: any) => {
  console.log("Form Data:", values); // Add this line to console log form data
};

// Dropdown options
const processOptions = [
  { value: "DYING", label: "DYING" },
  { value: "MOCK UP", label: "MOCK UP" },
  { value: "WASHING", label: "WASHING" },
  { value: "CUTTING", label: "CUTTING" },
];

const fabricOptions = [
  { value: "Cotton", label: "Cotton" },
  { value: "Polyester", label: "Polyester" },
  { value: "Wool", label: "Wool" },
  { value: "Silk", label: "Silk" },
];

// RadioButton Component
const RadioButton = ({ name, value, label, checked, onChange }: any) => (
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

const FabricForm = () => {
  const [unit, setUnit] = useState<boolean>(true);
  const [isInternationalFabricPresent, setIsInternationalFabricPresent] =
    useState<boolean>(false);
  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-10 text-center">
        T&A DATA SUBMISSION FORM
      </h1>
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-4">
            <div className="flex space-x-4">
              {/* Start Date */}
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">
                  Start Date
                </label>
                <Field
                  type="date"
                  name="startDate"
                  className="w-full border p-2 rounded"
                />
                <ErrorMessage
                  name="startDate"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* End Date */}
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">
                  End Date
                </label>
                <Field
                  type="date"
                  name="endDate"
                  className="w-full border p-2 rounded"
                />
                <ErrorMessage
                  name="endDate"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            <div className="flex space-x-4">
              {/* Production Per Day */}
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">
                  Production Per Day Per Machine
                </label>
                <Field
                  type="number"
                  name="productionPerDay"
                  className="w-full border p-2 rounded"
                />
                <ErrorMessage
                  name="productionPerDay"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Total Order Quantity */}
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">
                  Total Order Quantity
                </label>
                <Field
                  type="number"
                  name="totalOrderQuantity"
                  className="w-full border p-2 rounded"
                />
                <ErrorMessage
                  name="totalOrderQuantity"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            {/* Fabric Name Dropdown */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Fabric Name
              </label>
              <SearchableDropdown
                name="fabricName"
                options={fabricOptions}
                value={values.fabricName}
                onChange={(selectedOption: any) =>
                  setFieldValue("fabricName", selectedOption)
                }
                placeholder="Searchable Dropdown"
              />
              <ErrorMessage
                name="fabricName"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Per Piece Requirement and Unit Selection */}
            <div className="flex space-x-4 items-start">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">
                  Per Piece Requirement
                </label>
                <Field
                  type="number"
                  name="perPieceRequirement"
                  className="w-full border p-2 rounded"
                />
                <ErrorMessage
                  name="perPieceRequirement"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              
              {/* Unit Selection */}
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">
                  Choose Unit
                </label>
                <div className="flex items-center space-x-6 mt-3">
                  <RadioButton
                    name="unit"
                    value="Metre"
                    label="M"
                    checked={unit}
                    onChange={() => {
                      setUnit(true);
                      setFieldValue("unit", "Metre");
                    }}
                  />
                  <RadioButton
                    name="unit"
                    value="Kg"
                    label="Kg"
                    checked={!unit}
                    onChange={() => {
                      setUnit(false);
                      setFieldValue("unit", "Kg");
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Processes Dropdown */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Processes
              </label>
              <MultiSelectDropdown
                name="processes"
                options={processOptions}
                value={values.processes}
                onChange={(selectedOptions: any) =>
                  setFieldValue("processes", selectedOptions)
                }
              />
              <ErrorMessage
                name="processes"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Color & Quantity */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Color & Quantity
              </label>
              <FieldArray name="colorQuantity">
                {({ push, remove }) => (
                  <>
                    {values.colorQuantity.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 mb-2"
                      >
                        <Field
                          name={`colorQuantity[${index}].color`}
                          placeholder="Color"
                          className="border p-2 rounded w-full"
                        />
                        <Field
                          name={`colorQuantity[${index}].quantity`}
                          placeholder="Quantity"
                          className="border p-2 rounded w-full"
                        />
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => push({ color: "", quantity: "" })}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Add Color & Quantity
                    </button>
                  </>
                )}
              </FieldArray>
            </div>

            {/* International Fabric Present */}
            <div>
              <label className="block text-sm font-medium mb-1">
                International Fabrics Present
              </label>
              <div className="flex items-center space-x-6">
                <RadioButton
                  name="isInternationalFabricPresent"
                  value="true"
                  label="Yes"
                  checked={isInternationalFabricPresent}
                  onChange={() => {
                    setIsInternationalFabricPresent(true);
                    setFieldValue("isInternationalFabricPresent", true);
                  }}
                />
                <RadioButton
                  name="isInternationalFabricPresent"
                  value="false"
                  label="No"
                  checked={!isInternationalFabricPresent}
                  onChange={() => {
                    setIsInternationalFabricPresent(false);
                    setFieldValue("isInternationalFabricPresent", false);
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FabricForm;
