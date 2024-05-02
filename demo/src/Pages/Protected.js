import React from 'react';

import { Navigate, Outlet } from 'react-router';

function  Protected () {

    let login = localStorage.getItem('token');
        // if(!login){
        //   navigate('login');
        // } 
    return (

        login ? <Outlet/> :  <Navigate to = '/login'/>
        
    )
}

export default Protected;