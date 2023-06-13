import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { getMarketData } from "./redux/marketResearchSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MarketResearch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const s = useSelector((data) => data.marketResearch);
  const [loading, setLoading] = useState(false); // Add loading state
  const [disabled, setDisabled] = useState(false); // Add disabled state

  const formik = useFormik({
    initialValues: {
      prompt: "",
    },
    onSubmit: async (values) => {
      setLoading(true); // Set loading state to true when submitting
      setDisabled(true); // Set disabled state to true when submitting
      await dispatch(getMarketData(values));
      setLoading(false); // Reset loading state to false after submission
      setDisabled(false); // Reset disabled state to false after submission
    },
    validationSchema: Yup.object({
      prompt: Yup.string()
        .max(20, "Company must not exceed 20 characters")
        .required("Company Name is required."),
    }),
  });

  return (
    <div className='flex flex-col items-center bg-white p-6 rounded shadow-lg w-full'>
      <h1 className='text-3xl font-bold mb-6'>Market Research</h1>
      <form
        onSubmit={formik.handleSubmit}
        className='flex flex-col space-y-4 bg-white p-6 rounded shadow-lg w-3/4'>
        <label htmlFor='prompt' className='text-lg font-semibold'>
          Company Name
        </label>
        <input
          id='prompt'
          type='text'
          {...formik.getFieldProps("prompt")}
          placeholder='Provide me a list of companies that are competitors of ...'
          className='border-2 border-gray-300 rounded p-2 focus:border-blue-500 outline-none'
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
            {loading ? "Loading..." : "Get Data"}{" "}
            {/* Change button label when loading */}
          </button>
        </div>
      </form>
      <div>
        <h2 className='text-2xl font-bold mb-3 py-3'>Latest Answer</h2>
        {s.data && s.data.length > 0 ? (
          <div className='w-full mx-auto flex flex-col bg-gray-200 p-6 rounded-lg shadow-lg space-y-4'>
            <h1 className='text-xl font-bold text-gray-700'>Company: </h1>
            <h3 className='text-lg text-gray-600'>
              {s.data[s.data.length - 1].id}
            </h3>
            <h1 className='text-xl font-bold text-gray-700'>
              Major competitors:
            </h1>
            <h3 className='text-lg text-gray-600'>
              {s.data[s.data.length - 1].competitors}
            </h3>
            <h1 className='text-xl font-bold text-gray-700'>Analyze</h1>
            <p className='text-lg text-gray-600'>
              {s.data[s.data.length - 1].analyze}
            </p>
            <h1 className='text-3lg font-bold mb-4'>History</h1>
            <ul className='space-y-4'>
              {s.data.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/market-research/${item.id}`}
                    className='block px-4 py-2 text-blue-500 hover:text-blue-600'>
                    {item.id}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className='text-lg text-gray-500'>No Answer yet...</p>
        )}
      </div>
    </div>
  );
};

export default MarketResearch;
