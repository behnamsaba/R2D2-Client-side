import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InvolveApi from "../api/api";
import { useNavigate } from "react-router-dom";

const WelcomeNew = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Add loading state
  const [disabled, setDisabled] = useState(false); // Add disabled state

  const formik = useFormik({
    initialValues: {
      customerName: "",
      productName: "",
      answer:
        "Create a Customer Service Welcome Message for Jane Jetson, CEO of Moonbase Industries to introduce R2D2",
    },
    onSubmit: async (values) => {
      try {
        setLoading(true); // Set loading state to true when submitting
        setDisabled(true); // Set disabled state to true when submitting

        let res = await InvolveApi.getCRM(values);
        formik.setFieldValue("answer", res.text);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false); // Reset loading state to false after submission
        setDisabled(false); // Reset disabled state to false after submission
      }
    },
    validationSchema: Yup.object({
      customerName: Yup.string().required("Customer Name is required"),
      productName: Yup.string().required("Product Name is required"),
    }),
  });

  const handleCustomerNameChange = (e) => {
    const updatedAnswer = `Create a Customer Service Welcome Message for ${e.target.value}, ${formik.values.productName} to introduce R2D2`;
    formik.setFieldValue("customerName", e.target.value);
    formik.setFieldValue("answer", updatedAnswer);
  };

  const handleProductNameChange = (e) => {
    const updatedAnswer = `Create a Customer Service Welcome Message for ${formik.values.customerName}, CEO of Moonbase Industries to ${e.target.value}`;
    formik.setFieldValue("productName", e.target.value);
    formik.setFieldValue("answer", updatedAnswer);
  };

  return (
    <div className='w-100 mx-auto flex flex-col space-y-4 bg-white p-6 rounded shadow-lg'>
      <h1 className='text-3xl font-bold mb-6'>Send Welcome Message</h1>
      <form
        onSubmit={formik.handleSubmit}
        className='flex flex-col space-y-4 bg-white p-6 rounded shadow-lg'>
        <label htmlFor='customerName' className='text-lg font-semibold'>
          Customer Name
        </label>
        <input
          id='customerName'
          type='text'
          {...formik.getFieldProps("customerName")}
          placeholder='Jane Jetson, CEO of Moonbase Industries'
          onChange={handleCustomerNameChange}
          className='border-2 border-gray-300 rounded p-2 focus:border-blue-500 outline-none'
        />
        {formik.touched.customerName && formik.errors.customerName ? (
          <p className='text-red-500 text-sm italic'>
            {formik.errors.customerName}
          </p>
        ) : null}

        <label htmlFor='productName' className='text-lg font-semibold'>
          Product/Company Name
        </label>
        <input
          id='productName'
          type='text'
          {...formik.getFieldProps("productName")}
          placeholder='R2D2 Revenue Co-pilot'
          onChange={handleProductNameChange}
          className='border-2 border-gray-300 rounded p-2 focus:border-blue-500 outline-none'
        />
        {formik.touched.productName && formik.errors.productName ? (
          <p className='text-red-500 text-sm italic'>
            {formik.errors.productName}
          </p>
        ) : null}

        <textarea
          id='textArea'
          {...formik.getFieldProps("answer")}
          className='border-2 border-gray-300 rounded p-2 focus:border-blue-500 outline-none resize-none h-20'
        />

        <div className='flex justify-center space-x-4'>
          <button
            type='button'
            onClick={() => navigate(-1)}
            className='py-2 px-4 rounded bg-green-500 text-white text-sm font-bold hover:bg-green-700'
            disabled={loading || disabled} // Add disabled attribute
          >
            Back
          </button>
          <button
            type='submit'
            className='py-2 px-4 rounded bg-blue-500 text-white text-sm font-bold hover:bg-blue-700'
            disabled={loading || disabled} // Add disabled attribute
          >
            {loading ? "Loading..." : "Get Message"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default WelcomeNew;
