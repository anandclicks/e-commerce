import { createContext, useState } from "react";

export const CustomerContext = createContext({})
export const CustomerContetProvider = ({children})=> {
  // usestate for logged in customer 
  const [loggedInCustomer, setloggedInCustomer] = useState({})
  return (
    <CustomerContext.Provider value={{loggedInCustomer,setloggedInCustomer}}>
      {children}
    </CustomerContext.Provider>
  )
}