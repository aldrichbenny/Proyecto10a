import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaHome, FaUser, FaCog, FaChartBar } from 'react-icons/fa';
import '../../css/Sidebar2.css';

const Sidebar2 = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
            <button className="toggle-btn" onClick={toggleSidebar}>
                {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
            </button>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <a href="#option1" className="nav-link">
                        <FaHome className="icon" />
                        {!collapsed && 'Opción 1'}
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#option2" className="nav-link">
                        <FaUser className="icon" />
                        {!collapsed && 'Opción 2'}
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#option3" className="nav-link">
                        <FaChartBar className="icon" />
                        {!collapsed && 'Opción 3'}
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#option4" className="nav-link">
                        <FaCog className="icon" />
                        {!collapsed && 'Opción 4'}
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar2;