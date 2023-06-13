import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const MarketDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const companies = useSelector((data) => data.marketResearch.data);
  const company = companies.find((item) => item.id === id);

  useEffect(() => {
    if (!company) {
      navigate('/market-research');
    }
  }, [company, navigate]);

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="bg-gray-200 p-4 rounded-lg">
        <h1 className="text-2xl mb-4">Market Details for {id}</h1>
        <ul className="space-y-4">
          <li>
            <h1 className="text-2xl font-bold mb-2">Competitors</h1>
            <p className="block px-4 py-2 text-blue-500 hover:text-blue-600">{company.competitors}</p>
          </li>
          <li>
            <h1 className="text-2xl font-bold mb-2">Analyze</h1>
            <p className="block px-4 py-2 text-blue-500 hover:text-blue-600">{company.analyze}</p>
          </li>
        </ul>
      </div>
      <button className="bg-green-500 text-white px-4 py-2 mt-4 rounded-lg" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default MarketDetails;
