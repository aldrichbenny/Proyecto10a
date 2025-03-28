import React from 'react';
import { Outlet } from 'react-router-dom';

const MainAdmin = () => {
  return (
    <div className="bg-white h-screen">
      <Outlet />
    </div>
  );
};

export default MainAdmin;
