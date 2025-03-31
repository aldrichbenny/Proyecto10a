import React from 'react';
import NavbarADM from '../../components/NavbarADM';
import AdminSidebar from '../../components/AdminSidebar';
import '../../css/app.css'
import { Outlet } from 'react-router-dom';

const MainAdmin = () => {
    return (
        <>
        <div className="app">
          <div className="navbar">
              <NavbarADM />
          </div>
          <div className="main-content">
              <div className="sidebar">
                  <AdminSidebar />
              </div>
              <div className="content">
                  <Outlet/>
              </div>
          </div>
        </div>
        </>
    );
};

export default MainAdmin;