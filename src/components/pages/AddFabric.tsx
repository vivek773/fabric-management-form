import React, { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";

import { FormValues } from "../../types/componentTypes";
import { chinaFabricOptions, fabricOptions, processOptions, stagesSKippedOptions } from "../Constants/enums";
import Radiobutton from "../Form/Radiobutton";
import SearchableDropdown from "../Form/SingleSearchableDropdown";
import MultiSelectDropdown from "../Form/MultiSelectDropdown";

// Initial Form Values
const initialValues: FormValues = {
  startDate: new Date().toISOString().split("T")[0],
  endDate: new Date().toISOString().split("T")[0],
  productionPerDay: "",
  totalOrderQuantity: "",
  majorFabric: null,
  chinaFabric: [],
  fabrics: [
    {
      fabricName: [],
      perPieceRequirement: "",
      unit: "Metre",
      processes: [],
      colorQuantity: [{ color: "", quantity: "" }],
      stagestoBeSKipped: [],
    },
  ],
  isInternationalFabricPresent: false,
};

const FabricForm = () => {
  const [isInternationalFabricPresent, setIsInternationalFabricPresent] =
    useState<boolean>(false);

  const handleSubmit = (values: any) => {
    console.log("Form Data:", values);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-10 text-center">
        T&A DATA SUBMISSION FORM
      </h1>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, setFieldValue }) => (
          <Form className="space-y-4">
            {/* Start Date and End Date */}
            <div className="flex space-x-4">
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

            {/* Production Per Day and Total Order Quantity */}
            <div className="flex space-x-4">
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

            {/* Fabric Section */}
            <FieldArray name="fabrics">
              {({ push, remove }) => (
                <>
                  {values.fabrics.map((fabric, index) => (
                    <div key={index} className="border p-4 rounded mb-4">
                      <h2 className="text-lg font-semibold mb-2">
                        Fabric Section {index + 1}
                      </h2>

                      {/* Fabric Name Dropdown */}
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Fabric Name
                        </label>
                        <SearchableDropdown
                          name={`fabrics[${index}].fabricName`}
                          options={fabricOptions}
                          value={fabric.fabricName}
                          onChange={(selectedOption: any) =>
                            setFieldValue(
                              `fabrics[${index}].fabricName`,
                              selectedOption
                            )
                          }
                          placeholder="Searchable Dropdown"
                        />
                        <ErrorMessage
                          name={`fabrics[${index}].fabricName`}
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      {/* Per Piece Requirement and Unit Selection */}
                      <div className="flex space-x-4">
                        <div className="flex-1">
                          <label className="block text-sm font-medium mb-1">
                            Per Piece Requirement
                          </label>
                          <Field
                            type="number"
                            name={`fabrics[${index}].perPieceRequirement`}
                            className="w-full border p-2 rounded"
                          />
                          <ErrorMessage
                            name={`fabrics[${index}].perPieceRequirement`}
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-medium mb-1">
                            Unit
                          </label>
                          <div className="flex items-center space-x-4 mt-3">
                            <Radiobutton
                              name={`fabrics[${index}].unit`}
                              value="Metre"
                              label="Metre"
                              checked={fabric.unit === "Metre"}
                              onChange={() =>
                                setFieldValue(`fabrics[${index}].unit`, "Metre")
                              }
                            />
                            <Radiobutton
                              name={`fabrics[${index}].unit`}
                              value="Kg"
                              label="Kg"
                              checked={fabric.unit === "Kg"}
                              onChange={() =>
                                setFieldValue(`fabrics[${index}].unit`, "Kg")
                              }
                            />
                          </div>
                        </div>
                      </div>

                      {/* Color & Quantity */}
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Color & Quantity
                        </label>
                        <FieldArray name={`fabrics[${index}].colorQuantity`}>
                          {({ push, remove }) => (
                            <>
                              {fabric.colorQuantity.map((_, colorIndex) => (
                                <div
                                  key={colorIndex}
                                  className="flex items-center space-x-2 mb-2"
                                >
                                  <Field
                                    name={`fabrics[${index}].colorQuantity[${colorIndex}].color`}
                                    placeholder="Color"
                                    className="border p-2 rounded w-full"
                                  />
                                  <Field
                                    name={`fabrics[${index}].colorQuantity[${colorIndex}].quantity`}
                                    placeholder="Quantity"
                                    className="border p-2 rounded w-full"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => remove(colorIndex)}
                                    className="text-red-500"
                                  >
                                    Remove
                                  </button>
                                </div>
                              ))}
                              <button
                                type="button"
                                onClick={() =>
                                  push({ color: "", quantity: "" })
                                }
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                              >
                                Add Color & Quantity
                              </button>
                            </>
                          )}
                        </FieldArray>
                      </div>

                      <div className="flex space-x-4">
                        <div className="flex-1">
                          <label className="block text-sm font-medium mb-1">
                            Processes
                          </label>
                          <MultiSelectDropdown
                            name={`fabrics[${index}].processes`}
                            options={processOptions}
                            value={fabric.processes}
                            onChange={(selectedOptions: any) =>
                              setFieldValue(
                                `fabrics[${index}].processes`,
                                selectedOptions
                              )
                            }
                            placeholder="Select Processes"
                          />
                        </div>

                        <div className="flex-1">
                          <label className="block text-sm font-medium mb-1">
                            Stages to Be Skipped
                          </label>
                          <MultiSelectDropdown
                            name={`fabrics[${index}].stagestoBeSKipped`}
                            options={stagesSKippedOptions}
                            value={fabric.stagestoBeSKipped}
                            onChange={(selectedOptions: any) =>
                              setFieldValue(
                                `fabrics[${index}].stagestoBeSKipped`,
                                selectedOptions
                              )
                            }
                            placeholder="Select Stages to Skip"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-500 mt-4"
                      >
                        Remove Fabric Section
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() =>
                      push({
                        fabricName: [],
                        perPieceRequirement: "",
                        unit: "Metre",
                        processes: [],
                        colorQuantity: [{ color: "", quantity: "" }],
                        stagestoBeSKipped: [],
                      })
                    }
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Add More Fabrics
                  </button>
                </>
              )}
            </FieldArray>

            {/* Is China Fabric Present */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Is China Fabric Present ?
              </label>
              <div className="flex items-center space-x-6">
                <Radiobutton
                  name="isInternationalFabricPresent"
                  value="true"
                  label="Yes"
                  checked={isInternationalFabricPresent}
                  onChange={() => {
                    setIsInternationalFabricPresent(true);
                    setFieldValue("isInternationalFabricPresent", true);
                  }}
                />
                <Radiobutton
                  name="isInternationalFabricPresent"
                  value="false"
                  label="No"
                  checked={!isInternationalFabricPresent}
                  onChange={() => {
                    setIsInternationalFabricPresent(false);
                    setFieldValue("isInternationalFabricPresent", false);
                    setFieldValue("chinaFabric", []);
                  }}
                />
              </div>
            </div>
            {isInternationalFabricPresent && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Select China Fabric
                </label>
                <MultiSelectDropdown
                  name="chinaFabric"
                  options={chinaFabricOptions}
                  value={values.chinaFabric}
                  onChange={(selectedOptions: any) =>
                    setFieldValue("chinaFabric", selectedOptions)
                  }
                />
                <ErrorMessage
                  name="chinaFabric"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">
                Choose Major Fabric
              </label>
              <SearchableDropdown
                name="majorFabric"
                options={[]}
                value={values.majorFabric}
                onChange={(selectedOption: any) =>
                  setFieldValue("majorFabric", selectedOption)
                }
                placeholder="Searchable Dropdown"
              />

              <ErrorMessage
                name="majorFabric"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
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
