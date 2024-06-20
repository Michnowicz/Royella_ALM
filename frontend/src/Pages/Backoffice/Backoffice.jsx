import { Outlet } from "react-router-dom";
import ScrollToTop from "../../ScrollToTop";
import GoToTop from "../../Shared/GoToTop";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import HelmetChanger from "../../Shared/Helmet/Helmet";
import NavbarBackoffice from "../../Shared/NavbarBackoffice/NavbarBackoffice";
import axios from "axios"
import Connect from "./Connect/Connect";

const Backoffice = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);


  const [user, setUser] = useState(null)
  const [token, setToken] = useState("")
  useEffect(()=>{
    // console.log(token);
    fetchToken()
  },[token])
  const fetchToken = async () => {
    if (token !== "" && user == null) {
      const response = await axios.get("http://127.0.0.1:8000/api/user/get",
      {headers: {
          'Authorization' : `Bearer ${token}`
      }})
      // console.log(response.data.user);
      setUser(response.data.user)
    } else if (localStorage.getItem('access_token') !== null && localStorage.getItem('access_token') !== undefined && user == null) {
      const response = await axios.get("http://127.0.0.1:8000/api/user/get",
      {headers: {
          'Authorization' : `Bearer ${localStorage.getItem('access_token')}`
      }})
      // console.log(response.data.user);
      setUser(response.data.user)
    }
  }

  const [data, setData] = useState(null)
  useEffect(()=>{
    if (data == null) {
      fetchData()
    }
  },[data])
  const fetchData = async () => {
      const response = await axios.get("http://127.0.0.1:8000/api/all/get")
      // console.log(response.data.data);
      setData(response.data.data)
  }

  

  return (
    <>
      <HelmetChanger title="Hotel Booking" />
      <ScrollToTop />
      <GoToTop />
      <NavbarBackoffice setUser={setUser} user={user} token={token} setToken={setToken}/>
      <div>
        { user == null ?
          <Connect/>
          :
          data  ?
          <Outlet context={[data]}/>
          :
          ""
        }
      </div>
    </>
  );
};

export default Backoffice;
