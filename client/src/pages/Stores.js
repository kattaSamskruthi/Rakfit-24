import React from 'react'
import { NavLink } from "react-router-dom";
import header from "../components/assets/header.png"
import frame1 from "../components/assets/Frame 1.png"
import frame2 from "../components/assets/Frame 2.png"
import frame3 from "../components/assets/Frame 3.png"
import frame4 from "../components/assets/Frame 4.png"
import "../components/Store.css"
const Stores = () => {
  return (
    <div className='container'>
        <div>
            <img src={header} alt='heading'/>
        </div>


        <div >
        <NavLink
        to="/"
        >
        <div>
            <img src={frame4} alt='frame4'/>
        </div>
        </NavLink>
        </div>

        <div>
            <img src={frame2} alt='frame2'/>
        </div>

        <div>
            <img src={frame3} alt='frame3'/>
        </div>
        

        <div>
            <img src={frame1} alt='frame1'/>
        </div>

        <p style={{ margin: "20px" }}>Click on the Looks Store to explore</p>

        
    </div>
  )
}

export default Stores