import Action from "../../Components/CallDoAction/Action";
import Facilities from "../../Components/Facilities/Facilities";
import HeroSection from "../../Components/HeroSection/HeroSection";
import HotelAndFacilities from "../../Components/HotelAndFacilities/HotelAndFacilities";
import HotelAndResort from "../../Components/HotelAndResort/HotelAndResort";
import LatestBlog from "../../Components/LatestBlog/LatestBlog";
import Offers from "../../Components/Offers/Offers";
import Rooms from "../../Components/Rooms/Rooms";
import Testimonial from "../../Components/Testimonial/Testimonial";

import axios from "axios"
import { useState, useEffect } from "react";

const Home1 = () => {

  const [banners, setBanners] = useState(null)

  useEffect(()=>{
    if (banners == null) {
      fetchBanners()
    }
  },[])
  const fetchBanners = async () => {
      const response = await axios.get("http://127.0.0.1:8000/api/all/get")
      // console.log(response.data.data.banner);
      setBanners(response.data.data.banner)
  }

  return (
    <>
      {
        banners ?
        <HeroSection banners={banners} setBanners={setBanners}/>
        :
        ""
      }
      <Rooms />
      <HotelAndResort />
      <HotelAndFacilities />
      <Action />
      <Facilities />
      <Offers />
      <Testimonial />
      <LatestBlog />
    </>
  );
};

export default Home1;
