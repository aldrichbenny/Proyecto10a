import React from 'react';
import NavbarAR from '../../components/Area/NavbarAR';
import SidebarAR from '../../components/Area/SidebarAR';
import '../../css/app.css'

const HistAR = () => {
    return(
        <>
            <div className="app">
                <div className="navbar">
                    <NavbarAR />
                </div>
                <div className="main-content">
                    <div className="sidebar">
                        <SidebarAR />
                    </div>
                    <div className="content">
                        <div className="container">
                            <div className="title-container">
                                Title container
                            </div>
                            <div className="container2">
                                Container de tablas
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HistAR;