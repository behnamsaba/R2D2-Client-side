import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const MarketHistory = () => {
  const s = useSelector((data) => data.marketResearch);
  <div className='w-full bg-gray-300 p-4 rounded-lg'>
    <h1 className='text-3xl font-bold mb-6'>History</h1>
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
  </div>;
};

export default MarketHistory;
