import React, { Children, useState } from 'react'
import { createContext } from 'react'


export const UserContext = createContext();

 const Store = ({children}) => {
    const [data , setData] = useState([]);
  return (
   <UserContext.Provider value = {{data, setData }}>
   
   {children}
   </UserContext.Provider>
  )
}

export default Store;
