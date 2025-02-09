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
  const [rooms, setRooms] = useState([])

  const [hotelResort, setHotelResort] = useState(null)
  const [hotelResortImg, setHotelResortImg] = useState(null)
  const [roomNumber, setRoomNumber] = useState(null)
  
  const [facilities, setFacilities] = useState(null)
  const [facilitiesSection, setFacilitiesSection] = useState(null)
  
  const [manager, setManager] = useState(null)

  useEffect(()=>{
    if (banners == null) {
      fetchAll()
    }
  },[])
  const fetchAll = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/all/get")
    // console.log(response.data.data);
    setBanners(response.data.data.banner)
    setRooms(response.data.data.rooms)
    setHotelResort(response.data.data.hotelResort)
    setHotelResortImg(response.data.data.hotelResortImg)
    setRoomNumber(response.data.data.rooms.length)
    setFacilities(response.data.data.facility)
    setFacilitiesSection(response.data.data.facilitySection)

    setManager(response.data.data.manager)
  }

  return (
    <>
      {
        banners ?
        <HeroSection banners={banners} setBanners={setBanners}/>
        :
        ""
      }
      { rooms ?
        <Rooms rooms={rooms}/>
        :
        ""
      }
      { hotelResort && hotelResortImg ?
        <HotelAndResort hotelResort={hotelResort} hotelResortImg={hotelResortImg} roomNumber={roomNumber}/>
        :
        <p>loading ...</p>
      }
      { facilities != null && facilities != undefined ?
        <HotelAndFacilities facilities={facilities}/>
        :
        <p>loading ...</p>
      }
      { manager != null ?
        <Action manager={manager}/>
        :
        <p>loading ...</p>
      }
      { facilitiesSection != null && facilitiesSection != undefined ?
      <Facilities facilitiesSection={facilitiesSection}/>
      :
      ""
      }
      <Offers />
      <Testimonial />
      <LatestBlog />
    </>
  );
};

export default Home1;
