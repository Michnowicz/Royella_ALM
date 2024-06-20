import { Link, useLocation, NavLink } from "react-router-dom";
import { BiChevronDown, BiSun } from "react-icons/bi";
import { useEffect, useState } from "react";
import axios from "axios"

import LogIn from "../LogIn/LogIn.jsx"
import SignIn from "../SignIn/SignIn.jsx"

const Log = () => {

  const [logIn, setLogIn] = useState(false)
  const [signIn, setSignIn] = useState(false)
  const [token, setToken] = useState("")
  const [message, setMessage] = useState("")
  const [user, setUser] = useState(null)

  const handleclick = (e) => {
    document.body.style.overflow = "hidden"
    if (e.target.id === "login") {
      setLogIn(!logIn)
    }
    if (e.target.id === "signin") {
      setSignIn(!signIn)
    }
    if (e.target.id === "disconnect") {
      logout()
    }
  }

  const logout = async () => {
    localStorage.removeItem('access_token')
    const response = axios.post('http://127.0.0.1:8000/api/user/disconnect')
      .then(response => {
        setMessage(response.data.message)
        // console.log(response.data);
        setToken("")
        setUser(null)
      }
    )
  }

  // const fetchTokenTwo = async () => {
  //   if (token !== "" && user == null) {
  //     const response = await axios.get("http://127.0.0.1:8000/api/user/get",
  //     {headers: {
  //         'Authorization' : `Bearer ${token}`
  //     }})
  //     console.log(response.data.user);
  //     setUser(response.data.user)
  //   } else if (localStorage.getItem('access_token') !== null && localStorage.getItem('access_token') !== undefined && user == null) {
  //     const response = await axios.get("http://127.0.0.1:8000/api/user/get",
  //     {headers: {
  //         'Authorization' : `Bearer ${localStorage.getItem('access_token')}`
  //     }})
  //     console.log(response.data.user);
  //     setUser(response.data.user)
  //   }
  // }

  // verify if the user is connected
  useEffect(()=>{
      fetchToken()
  },[token])
  const fetchToken = async () => {
    if (token !== "" && user == null) {
      const response = await axios.get("http://127.0.0.1:8000/api/user/get",
      {headers: {
          'Authorization' : `Bearer ${token}`
      }})
      console.log(response.data.user);
      setUser(response.data.user)
    } else if (localStorage.getItem('access_token') !== null && localStorage.getItem('access_token') !== undefined && user == null) {
      const response = await axios.get("http://127.0.0.1:8000/api/user/get",
      {headers: {
          'Authorization' : `Bearer ${localStorage.getItem('access_token')}`
      }})
      console.log(response.data.user);
      setUser(response.data.user)
    }
  }


  // useEffect(()=>{
  //   console.log(signIn);
  //   console.log(logIn);
  // },[signIn, logIn])


  return(
    <>
      <LogIn logIn={logIn} setLogIn={setLogIn} setToken={setToken}/>
      <SignIn signIn={signIn} setSignIn={setSignIn}/>

      {/* {Connection menu} */}
      <NavLink className={`text-lightBlack lg:text-white dark:text-white  lg:border-b-0 px-3 py-2 w-full block transition-all duration-300 group relative `} to="#">
        <span className="flex items-center pl-5 pr-5">
          CONNECTION
          <BiChevronDown className="ml-1"/>
        </span>
        <div className="absolute pt-4 lg:pt-8 z-20">
          <ul className="shadow-2xl hidden group-hover:block rounded-sm bg-white text-black w-60 text-left dark:bg-normalBlack dark:text-white transition-all duration-500 text-sm  py-4">
          { user != null && user.role != 2 ?
              <>
                <div className=" px-5 group hover:bg-khaki hover:text-white">
                    <NavLink to="/backoffice/dashboard" className={`py-2 block`}>
                      BACKOFFICE
                    </NavLink>
                </div>
                <div className=" px-5 group hover:bg-khaki hover:text-white">
                  <li className="hover:ml-3 duration-300 py-2" onClick={handleclick} id="disconnect">
                    DISCONNECT
                  </li>
                </div>
              </>
                :
                user != null && user.role == 2 ?
                <div className=" px-5 group hover:bg-khaki hover:text-white">
                <li className="hover:ml-3 duration-300 py-2" onClick={handleclick} id="disconnect">
                  DISCONNECT
                </li>
                </div>
                :
              <>
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
              </>
              }
          </ul>
        </div>
        
      </NavLink>


    </>
  )
};

export default Log;
