import { useEffect, useState } from "react";
interface ApiProps {
  apiFunction: () => Promise<any>;
  dependencies?: any[];
}

const useGetQuery = ({ apiFunction, dependencies = [] }: ApiProps) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiFunction();
        setData(response.data);
      } catch (error: any) {
        setError(error.response?.data?.message || "Something went wrong.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, loading, error };
};

export default useGetQuery;
