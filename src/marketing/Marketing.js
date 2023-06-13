import { Link } from 'react-router-dom';

const Marketing = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-300 p-4 rounded-lg">
        <h1>Browse R2D2 Marketing features</h1>
        <ul className="space-y-4">
          <li>
            <Link
              to="/marketing/create-caption"
              className="block px-4 py-2 text-blue-500 hover:text-blue-600"
            >
              Social-Media caption
            </Link>
          </li>
          <li>
            <Link
              to="/marketing/create-post"
              className="block px-4 py-2 text-blue-500 hover:text-blue-600"
            >
              Social-Media Post
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Marketing;
