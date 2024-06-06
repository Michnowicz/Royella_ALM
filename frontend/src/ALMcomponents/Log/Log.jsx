import { Link, useLocation, NavLink } from "react-router-dom";
import { BiChevronDown, BiSun } from "react-icons/bi";
import { useEffect, useState } from "react";

import LogIn from "../LogIn/LogIn.jsx"
import SignIn from "../SignIn/SignIn.jsx"

const Log = () => {

  const [logIn, setLogIn] = useState(false)
  const [signIn, setSignIn] = useState(false)

  const handleclick = (e) => {
    document.body.style.overflow = "hidden"
    if (e.target.id == "login") {
      setLogIn(!logIn)
    } else {
      setSignIn(!signIn)
    }
  }


  return(
    <>
      {/* {Connection menu} */}
      <NavLink className={ `text-lightBlack lg:text-white dark:text-white  lg:border-b-0 px-3 py-2 w-full block transition-all duration-300 group relative `} to="#">
        <span className="flex items-center pl-5 pr-5">
          CONNECTION
          <BiChevronDown className="ml-1"/>
        </span>
        <div className="absolute pt-4 lg:pt-8 z-20">
          <ul className="shadow-2xl hidden group-hover:block rounded-sm bg-white text-black w-60 text-left dark:bg-normalBlack dark:text-white transition-all duration-500 text-sm  py-4">
            <div className="px-5 group hover:bg-khaki hover:text-white">
              <li className="hover:ml-3 duration-300 py-2" onClick={handleclick} id="login">
                LOG IN
              </li>
            </div>
            <div className=" px-5 group hover:bg-khaki hover:text-white">
              <li className="hover:ml-3 duration-300 py-2" onClick={handleclick} id="signin">
                SIGN IN
              </li>
            </div>
          </ul>
        </div>
      </NavLink>

      <LogIn logIn={logIn} setLogIn={setLogIn}/>
      <SignIn signIn={signIn} setSignIn={setSignIn} />
    </>
  )
};

export default Log;
