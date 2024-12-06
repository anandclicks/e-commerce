import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext({})
export const ProductContextProvider = ({children})=> {
    // category handling usestate and function 
    const [category, setcategory] = useState([])
    const handleCategory = (evt)=> {
        if(evt.target.checked) {
           return setcategory(prev => [...prev, evt.target.name])
        }
        else {
          return  setcategory(prev => prev.filter(e=> e != evt.target.name))
        }
    }
    // design handling usestate and function 
    const [design, setDesign] = useState([])
    const handleDesign = (evt)=> {
        if(evt.target.checked) {
            return setDesign(prev => [...prev, evt.target.name])
        }
        else {
            return setDesign(prev=> prev.filter((item)=> item != evt.target.name))
        }
    }
    // color handling usestate and function 
    const [color, setColor] = useState([])
    const handleColor = (evt)=> {
        if(evt.target.checked) {
            return setColor(prev => [...prev, evt.target.name])
        }
        else {
            return setColor(prev => prev.filter((item)=> item != evt.target.name))
        }
    }


    return (
        <ProductContext.Provider value={{
            handleCategory,
            category,
            handleDesign,
            design,
            handleColor,
            color,
            }}>
            {children}
        </ProductContext.Provider>
    )
}