import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './navigation-bar.css';
import Swal from 'sweetalert2';

const NavigationBar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');

  const showConfirmationDialog = async (title, text) => {
    const result = await Swal.fire({
        icon: 'question',
        title: title || 'Are you sure?',
        text: text || 'Are you sure you want to proceed?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        padding: '1em',
        customClass: 'sweet-alerts',
    });
 
    return result.isConfirmed;
};

const logout = async () => {
  const confirmLogout = await showConfirmationDialog('Logout User', 'Are you sure you want to Logout?');
  if (confirmLogout) {
    localStorage.removeItem('token'); 
    navigate('/form'); 
  }
}

return (
  <>
    <nav className="navigation-bar">
      <ul>
      <li><NavLink to="/form" activeClassName="active">Form</NavLink></li>
      <li><NavLink to="/details" activeClassName="active">Details</NavLink></li>
        {isLoggedIn && (
          <li className="logout-button"><button onClick={logout}>Logout</button></li>
        )}
      </ul>
    </nav>
    <Outlet />
  </>
);
}

export default NavigationBar;
