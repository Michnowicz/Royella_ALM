import { Outlet } from "react-router-dom";
import ScrollToTop from "../../ScrollToTop";
import GoToTop from "../../Shared/GoToTop";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import HelmetChanger from "../../Shared/Helmet/Helmet";
import NavbarBackoffice from "../../Shared/NavbarBackoffice/NavbarBackoffice";
import axios from "axios"

const Backoffice = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);


  // const [token, setToken] = useState(localStorage.getItem('access_token'))
  // const [user, setUser] = useState({})
  // useEffect(()=>{
  //   console.log(token);
  //   if (token != "") {
  //     fetchToken()
  //   }
  // },[token])
  // const fetchToken = async () => {
  //     const response = await axios.get("http://127.0.0.1:8000/api/user/get",
  //     {headers: {
  //         'Authorization' : `Bearer ${token}`
  //     }})
  //     .then(response => {
  //         setUser(response.data.user)
  //         console.log(response.data);
  //     })
  // }

  const [banners, setBanners] = useState(null)

  useEffect(()=>{
    if (banners == null) {
      fetchBanners()
    }
  },[banners])
  const fetchBanners = async () => {
      const response = await axios.get("http://127.0.0.1:8000/api/all/get")
      // console.log(response.data.data.banner);
      setBanners(response.data.data.banner)
  }

  return (
    <>
      <HelmetChanger title="Hotel Booking" />
      <ScrollToTop />
      <GoToTop />
      <NavbarBackoffice/>
      <div>
        {
          banners ?
          <Outlet context={[banners, setBanners]}/>
          :
          ""
        }
      </div>
    </>
  );
};

export default Backoffice;
