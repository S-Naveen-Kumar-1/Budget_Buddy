import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [accountDetails,setAccountDetails]=useState([])
  const [isAuth,setIsAuth]=useState(false)
  fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/Account_details`,{
    method:"GET",
    headers:{
      "Content-type":"application/json"
    },
  })
  .then(res=>res.json())
  .then(data=>{
    // console.log(data)
    setAccountDetails(data)
  })
const Login=()=>{
  setIsAuth(true)
}
const Logout=()=>{
  setIsAuth(false)
}
  return (
    <AuthContext.Provider value={{ accountDetails,setAccountDetails,Login,Logout,isAuth,setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
