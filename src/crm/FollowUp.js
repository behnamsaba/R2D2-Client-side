import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InvolveApi from "../api/api";
import { useNavigate } from "react-router-dom";

const FollowUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Add loading state
  const [disabled, setDisabled] = useState(false); // Add disabled state

  const formik = useFormik({
    initialValues: {
      prospectName: "",
      followUpReason: "",
      note: "",
      answer:
        "Create a sales follow Up for Jane Jetson With the following reason: sales and personalize with:",
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
      prospectName: Yup.string().required("Prospect Name is required"),
      followUpReason: Yup.string().required("Follow up reason is required"),
      note: Yup.string().required("Personal Note is required"),
    }),
  });

  // autofil
  const handleProspectNameChange = (e) => {
    const updatedAnswer = `Create a sales follow Up for ${e.target.value} With the following reason: ${formik.values.followUpReason} and personalize with: ${formik.values.note}`;
    formik.setFieldValue("prospectName", e.target.value);
    formik.setFieldValue("answer", updatedAnswer);
  };

  const handleFollowUpReasonChange = (e) => {
    const updatedAnswer = `Create a sales follow Up for ${formik.values.prospectName} With the following reason: ${e.target.value} and personalize with: ${formik.values.note}`;
    formik.setFieldValue("followUpReason", e.target.value);
    formik.setFieldValue("answer", updatedAnswer);
  };

  const handleNoteChange = (e) => {
    const updatedAnswer = `Create a sales follow Up for ${formik.values.prospectName} With the following reason: ${formik.values.followUpReason} and personalize with: ${e.target.value}`;
    formik.setFieldValue("note", e.target.value);
    formik.setFieldValue("answer", updatedAnswer);
  };

  return (
    <div className='w-100 mx-auto flex flex-col space-y-4 bg-white p-6 rounded shadow-lg'>
      <h1 className='text-3xl font-bold mb-6'>Sales Follow Up</h1>
      <form
        onSubmit={formik.handleSubmit}
        className='flex flex-col space-y-4 bg-white p-6 rounded shadow-lg'>
        <label htmlFor='prospectName' className='text-lg font-semibold'>
          Prospect Name
        </label>
        <input
          id='prospectName'
          type='text'
          {...formik.getFieldProps("prospectName")}
          placeholder='Jane Jetson, CEO of Moonbase Industries'
          onChange={handleProspectNameChange}
          className='border-2 border-gray-300 rounded p-2 focus:border-blue-500 outline-none'
        />
        {formik.touched.prospectName && formik.errors.prospectName ? (
          <p className='text-red-500 text-sm italic'>
            {formik.errors.prospectName}
          </p>
        ) : null}

        <label htmlFor='followUpReason' className='text-lg font-semibold'>
          Follow Up Reason
        </label>
        <input
          id='followUpReason'
          type='text'
          {...formik.getFieldProps("followUpReason")}
          placeholder='Discuss our latest space-age solution'
          onChange={handleFollowUpReasonChange}
          className='border-2 border-gray-300 rounded p-2 focus:border-blue-500 outline-none'
        />
        {formik.touched.followUpReason && formik.errors.followUpReason ? (
          <p className='text-red-500 text-sm italic'>
            {formik.errors.followUpReason}
          </p>
        ) : null}

        <label htmlFor='note' className='text-lg font-semibold'>
          Personalize Note
        </label>
        <textarea
          id='note'
          {...formik.getFieldProps("note")}
          placeholder='Remember our chat about cosmic sales goals?'
          onChange={handleNoteChange}
          className='border-2 border-gray-300 rounded p-2 focus:border-blue-500 outline-none resize-none h-20'
        />
        {formik.touched.note && formik.errors.note ? (
          <p className='text-red-500 text-sm italic'>{formik.errors.note}</p>
        ) : null}

        <textarea
          id='answer'
          {...formik.getFieldProps("answer")}
          onChange={handleNoteChange}
          className='border-2 border-gray-300 rounded p-2 focus:border-blue-500 outline-none resize-none h-40'
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
            {loading ? "Loading..." : "Follow up"}{" "}
            {/* Change button label when loading */}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FollowUp;
