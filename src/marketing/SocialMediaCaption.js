import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InvolveApi from "../api/api";
import { useNavigate } from "react-router-dom";

const SocialMediaCaption = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 
  const [disabled, setDisabled] = useState(false);

  const formik = useFormik({
    initialValues: {
      postContent: "",
      postTone: "",
      answer: "Write a social media caption for R2D2's latest feature launch with an exciting and adventurous tone",
    },
    onSubmit: async (values) => {
      try {
        setLoading(true); 
        setDisabled(true);
        let res = await InvolveApi.getMarketing(values);
        formik.setFieldValue('answer', res);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
        setDisabled(false);
      }
    },
    validationSchema: Yup.object({
      postContent: Yup.string().required('Post Content is required'),
      postTone: Yup.string().required('Post Tone is required'),
    }),
  });

  const handlePostContentChange = (e) => {
    const updatedAnswer = `Write a social media caption for ${e.target.value} with ${formik.values.postTone} tone`;
    formik.setFieldValue("postContent", e.target.value);
    formik.setFieldValue("answer", updatedAnswer);
  };

  const handlePostToneChange = (e) => {
    const updatedAnswer = `Write a social media caption for ${formik.values.postContent} with ${e.target.value} tone`;
    formik.setFieldValue("postTone", e.target.value);
    formik.setFieldValue("answer", updatedAnswer);
  };

  return (
    <div className='w-100 mx-auto flex flex-col space-y-4 bg-white p-6 rounded shadow-lg'>
      <h1 className='text-3xl font-bold mb-6'>Social Media Caption</h1>
      <form
        onSubmit={formik.handleSubmit}
        className='flex flex-col space-y-4 bg-white p-6 rounded shadow-lg'>
        <label
          htmlFor='postContent'
          className='text-lg font-semibold'>
          Post Content
        </label>
        <input
          id='postContent'
          type='text'
          {...formik.getFieldProps("postContent")}
          onChange={handlePostContentChange}
          placeholder="R2D2's latest feature launch"
          className='border-2 border-gray-300 rounded p-2 focus:border-blue-500 outline-none'
        />
        {formik.touched.postContent && formik.errors.postContent ? (
          <p className='text-red-500 text-sm italic'>
            {formik.errors.postContent}
          </p>
        ) : null}

        <label
          htmlFor='postTone'
          className='text-lg font-semibold'>
          Post Tone
        </label>
        <input
          id='postTone'
          type='text'
          {...formik.getFieldProps("postTone")}
          onChange={handlePostToneChange}
          placeholder='Exciting and adventurous'
          className='border-2 border-gray-300 rounded p-2 focus:border-blue-500 outline-none'
        />
        {formik.touched.postTone && formik.errors.postTone ? (
          <p className='text-red-500 text-sm italic'>
            {formik.errors.postTone}
          </p>
        ) : null}

        <textarea
          id='textArea'
          {...formik.getFieldProps('answer')}
          className='border-2 border-gray-300 rounded p-2 focus:border-blue-500 outline-none resize-none h-40'
        />
        <div className='flex justify-center space-x-4'>
          <button
            type='button'
            onClick={() => navigate(-1)}
            className='py-2 px-4 rounded bg-green-500 text-white text-sm font-bold hover:bg-green-700'
            disabled={loading || disabled}>
            Back
          </button>
          <button
            type='submit'
            className='py-2 px-4 rounded bg-blue-500 text-white text-sm font-bold hover:bg-blue-700'
            disabled={loading || disabled}>
            {loading ? "Loading..." : "Get Caption"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SocialMediaCaption;
