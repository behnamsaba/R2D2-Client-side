import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InvolveApi from "./api/api";
import { useNavigate } from "react-router-dom";

const PersonalizeEmail = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Add loading state
  const [disabled, setDisabled] = useState(false); // Add disabled state

  const formik = useFormik({
    initialValues: {
      prompt: "",
    },
    onSubmit: async (values) => {
      try {
        setLoading(true); // Set loading state to true when submitting
        setDisabled(true); // Set disabled state to true when submitting

        let res = await InvolveApi.getPersonalizeEmail(values);
        console.log("res",res)
        formik.setFieldValue("prompt", res.text);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false); // Reset loading state to false after submission
        setDisabled(false); // Reset disabled state to false after submission
      }
    },
    validationSchema: Yup.object({
      prompt: Yup.string().required("Required"),
    }),
  });

  return (
    <div className='w-100 mx-auto flex flex-col bg-white p-6 rounded shadow-lg'>
      <h1 className='text-3xl font-bold mb-6'>Personalize Email</h1>
      <form onSubmit={formik.handleSubmit} className='flex flex-col space-y-4'>
        <label htmlFor='prompt' className='text-lg font-semibold'>
          Email
        </label>
        <textarea
          id='prompt'
          {...formik.getFieldProps("prompt")}
          placeholder='Enter your email to modify ...'
          className='border-2 border-gray-300 rounded p-2 focus:border-blue-500 outline-none resize-none h-40'
        />
        {formik.touched.prompt && formik.errors.prompt ? (
          <p className='text-red-500 text-sm italic'>{formik.errors.prompt}</p>
        ) : null}
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
            {loading ? "Loading..." : "Rewrite"}{" "}
            {/* Change button label when loading */}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalizeEmail;
