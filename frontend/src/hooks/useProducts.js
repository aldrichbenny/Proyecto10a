import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCurrency } from '../context/CurrencyContext';

export const useProducts = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currency } = useCurrency();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const params = currency === 'USD' ? { currency: 'USD' } : {};
        const response = await axios.get(endpoint, { params });
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, currency]);

  return { data, loading, error };
};