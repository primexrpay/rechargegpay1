import React from 'react'

import { FaBars } from "react-icons/fa"

import { FaCircleUser } from "react-icons/fa6";

import Logo from '../assets/images/gpaylogo.png'

import { Link } from 'react-router-dom';

const Header = () => {

   return (

    <div className="py-4 px-6 bg-white flex items-center justify-between border-b border-slate-100 mb-0">

      <div className="flex items-center">

        <FaBars className="text-blue-500 mr-3" size={19} />

        <Link to="/"><img src={Logo} alt="" className="h-8" /></Link>

      </div>

      <div>
       <FaCircleUser size={25} className="text-blue-500" />
      </div>

    </div>

  )

}



export default Header

