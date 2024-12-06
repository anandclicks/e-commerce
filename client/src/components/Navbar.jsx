import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [search, setsearch] = useState('')
    const searchInputHandler = (evt)=> {
        setsearch(evt.target.value)
    }
    // handler for mouse movement 
    const [mousePosition, setmousePosition] = useState(false)
    const mouseEnterHandler = (state)=> {
      setmousePosition(state)
    }
    const mouseLeaveHandler = (state)=> {
      setmousePosition(state)
    }
    // search background state 
    const [searchBg, setsearchBg] = useState(false)
    const handleSearchBgState = (state)=> {
        setsearchBg(state)
        if(!state || mousePosition) {
          setsearchBg(true)
        }
        else {
          setsearchBg(state)
        }
        console.log(searchBg, mousePosition)
    }
  return (
   <div className="navbarWrapper">
     <div className='navbar'>
        {/* logo  */}
        <div className="logo flex flex-col leading-3">
            <h1 className='text-[20px]'>ᗩᑎᗩᑎᗪ ᑕᒪIᑕKᔕ</h1>
            <p>_________________________</p>
        </div>
        {/* search box  */}
        <div className="searchBox">
        <i className="ri-search-line text-[23px]"></i> <input onBlur={()=> handleSearchBgState(false)} onFocus={()=> handleSearchBgState(true)} onChange={(evt)=> searchInputHandler(evt)} value={search} type="text" placeholder="Whta's in your mind..." />
        </div>
        {/* cart and like item  */}
       <div className="allBtns flex items-center justify-end gap-3 w-[40%]">
       <div className="cartBtn"><i className="ri-shopping-bag-4-fill"></i> Cart</div>
       <div className="likeItems"><i className="ri-heart-3-line"></i> Liked</div>
       {/* <div className="circle">A</div> */}
       </div>
       {/* <div onMouseEnter={()=> mouseEnterHandler(true)} onMouseLeave={()=> mouseLeaveHandler(false)}  className={`${searchBg ? 'searchResult' : 'hideSearchBG'}`}>
        <Link to={'/main'}>Click me to go to main</Link>
       </div> */}
    </div>
   </div>
  )
}

export default Navbar