import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [exchangeRate, setExchangeRate] = useState(null);
  const [currency, setCurrency] = useState('MXN');

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await axios.get('https://v6.exchangerate-api.com/v6/2825636e580e1a8a59c9542f/latest/USD');
        setExchangeRate(response.data.conversion_rates.MXN);
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    };
    fetchExchangeRate();
  }, []);

  const formatPrice = (priceInMXN) => {
    if (!priceInMXN) return currency === 'MXN' ? '$0.00 MXN' : '$0.00 USD';
    
    let price = parseFloat(priceInMXN);
    if (currency === 'USD' && exchangeRate) {
      price = price / exchangeRate;
    }
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const toggleCurrency = () => {
    setCurrency(prev => prev === 'MXN' ? 'USD' : 'MXN');
  };

  return (
    <CurrencyContext.Provider value={{ currency, toggleCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};