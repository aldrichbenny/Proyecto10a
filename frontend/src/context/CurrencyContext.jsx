import React, { createContext, useState, useContext, useEffect } from 'react';

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    const saved = localStorage.getItem('preferredCurrency');
    return saved || 'MXN';
  });

  useEffect(() => {
    localStorage.setItem('preferredCurrency', currency);
  }, [currency]);

  const toggleCurrency = () => {
    setCurrency(prev => {
      const newCurrency = prev === 'MXN' ? 'USD' : 'MXN';
      // Forzar recarga de la página para actualizar todos los precios
      window.location.reload();
      return newCurrency;
    });
  };

  return (
    <CurrencyContext.Provider value={{ currency, toggleCurrency }}>
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
