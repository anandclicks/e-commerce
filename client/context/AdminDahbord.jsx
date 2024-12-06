import { createContext, useState } from "react";

export const AdminDashborContext = createContext({})
export const AdminDashbordContextProvider = ({children})=> {
 
    const [DashbordloggedInUser, setDashbordloggedInUser] = useState([{}])
     // usestate for redirect aunauthorized user 
  const [redirectState, setredirectState] = useState(false)
  const handleRedirectState = (state)=> {
    console.log("Setting redirectState:", state); 
    setredirectState(state)
    console.log(redirectState)
  }
  
    return (
       <AdminDashborContext.Provider value={{DashbordloggedInUser,setDashbordloggedInUser,redirectState,setredirectState, handleRedirectState}}>
         {children}
       </AdminDashborContext.Provider>
    )
}