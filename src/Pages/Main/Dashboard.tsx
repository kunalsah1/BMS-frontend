import { useEffect, useState } from "react";
import {
  getQuotationAmount,
  getQuotationCount,
} from "../../authentication/apis";

const Dashboard = () => {
  const [counts, setCounts] = useState([]);
  const [amounts, setAmounts] = useState([]);

  const fetchQuotationCount = async () => {
    try {
      const res = await getQuotationCount();

      setCounts(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchQuotationAmount = async () => {
    try {
      const res = await getQuotationAmount();

      setAmounts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQuotationCount();
    fetchQuotationAmount();
  }, []);
  return (
    <div className="py-20 text-white">
      <div className="p-2 w-full">
        <p className="font-medium border-b border-white">Quantity</p>
        {counts.map((count, index) => (
          <div
            key={index}
            className=" p-4 m-2 w-full flex items-center gap-5  "
          >
            {Object.entries(count).map(([key, value]) => (
              <div
                key={key}
                className="bg-white text-black font-bold p-2 rounded-md h-20 w-40 flex flex-col gap-2"
              >
                <p>{key}</p>
                <p>{String(value)}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="p-2 w-full">
        <p className="font-medium border-b border-white">Amount</p>
        {amounts.map((amount, index) => (
          <div
            key={index}
            className=" p-4 m-2 w-full flex items-center gap-5  "
          >
            {Object.entries(amount).map(([key, value]) => (
              <div
                key={key}
                className="bg-white text-black font-bold p-2 rounded-md h-20 w-40 flex flex-col gap-2"
              >
                <p>{key}</p>
                <p>₹ {String(value)}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
