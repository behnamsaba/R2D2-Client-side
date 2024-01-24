import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InvolveApi from "../api/api";
import { useNavigate } from "react-router-dom";

const SocialMediaPost = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const formik = useFormik({
    initialValues: {
      platform: "",
      postObjective: "",
      postContent: "",
      answer:
        "Craft a social media post for Linkedin with the objective to showcase features and content: R2D2 exploring the universe with AI",
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setDisabled(true);
        let res = await InvolveApi.getMarketing(values);
        formik.setFieldValue("answer", res.text);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
        setDisabled(false);
      }
    },
    validationSchema: Yup.object({
      platform: Yup.string().required("Platform is required"),
      postObjective: Yup.string().required("Post Objective is required"),
      postContent: Yup.string().required("Post Content is required"),
    }),
  });

  const handlePlatformChange = (e) => {
    const updatedAnswer = `Craft a social media post for ${e.target.value} with the objective to showcase features and content: ${formik.values.postContent}`;
    formik.setFieldValue("platform", e.target.value);
    formik.setFieldValue("answer", updatedAnswer);
  };

  const handlePostObjectiveChange = (e) => {
    const updatedAnswer = `Craft a social media post for ${formik.values.platform} with the objective to ${e.target.value}: ${formik.values.postContent}`;
    formik.setFieldValue("postObjective", e.target.value);
    formik.setFieldValue("answer", updatedAnswer);
  };

  const handlePostContentChange = (e) => {
    const updatedAnswer = `Craft a social media post for ${formik.values.platform} with the objective to ${formik.values.postObjective}: ${e.target.value}`;
    formik.setFieldValue("postContent", e.target.value);
    formik.setFieldValue("answer", updatedAnswer);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className='flex flex-col space-y-4 bg-white p-6 rounded shadow-lg'>
      <label htmlFor='platform' className='text-lg font-semibold'>
        Platform
      </label>
      <input
        id='platform'
        type='text'
        {...formik.getFieldProps("platform")}
        onChange={handlePlatformChange}
        placeholder='Linkedin'
        className='border-2 border-gray-300 rounded p-2 focus:border-blue-500 outline-none'
      />
      {formik.touched.platform && formik.errors.platform ? (
        <p className='text-red-500 text-sm italic'>{formik.errors.platform}</p>
      ) : null}

      <label htmlFor='postObjective' className='text-lg font-semibold'>
        Post Objective
      </label>
      <input
        id='postObjective'
        type='text'
        {...formik.getFieldProps("postObjective")}
        onChange={handlePostObjectiveChange}
        placeholder="Showcase R2D2's new features"
        className='border-2 border-gray-300 rounded p-2 focus:border-blue-500 outline-none'
      />
      {formik.touched.postObjective && formik.errors.postObjective ? (
        <p className='text-red-500 text-sm italic'>
          {formik.errors.postObjective}
        </p>
      ) : null}

      <label htmlFor='postContent' className='text-lg font-semibold'>
        Post Content
      </label>
      <textarea
        id='postContent'
        {...formik.getFieldProps("postContent")}
        onChange={handlePostContentChange}
        placeholder='R2D2 exploring the universe with AI'
        className='border-2 border-gray-300 rounded p-2 focus:border-blue-500 outline-none resize-none h-20'
      />
      {formik.touched.postContent && formik.errors.postContent ? (
        <p className='text-red-500 text-sm italic'>
          {formik.errors.postContent}
        </p>
      ) : null}

      <textarea
        id='textArea'
        {...formik.getFieldProps("answer")}
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
          {loading ? "Loading..." : "Get Post"}
        </button>
      </div>
    </form>
  );
};

export default SocialMediaPost;
