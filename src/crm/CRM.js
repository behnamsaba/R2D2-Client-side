import { Link } from "react-router-dom";

const CRM = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='bg-gray-200 p-4 rounded-lg'>
        <h1 className='text-2xl mb-4'>R2D2 features for CRM</h1>
        <ul className='space-y-4'>
          <li>
            <Link
              to='/crm/follow-up'
              className='block px-4 py-2 text-blue-500 hover:text-blue-600'>
              Create Follow Up
            </Link>
          </li>
          <li>
            <Link
              to='/crm/welcome-new'
              className='block px-4 py-2 text-blue-500 hover:text-blue-600'>
              Say Hello to new customer
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CRM;
