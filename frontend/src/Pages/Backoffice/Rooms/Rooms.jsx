// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./style.css";


// import required modules
import { useEffect, useState } from "react";
import RoomCreate from "./RoomCreate/RoomCreate.jsx"
import { useOutletContext } from "react-router-dom";


const Rooms = () => {

    const [data] = useOutletContext();
    const [rooms, setRooms] = useState(null)

    useEffect(()=>{
        if (data != null) {
            setRooms(data.rooms)
        }
    },[data])
    // useEffect(()=>{
    //     if (rooms != null) {
    //         console.log(rooms);
    //     }
    // },[rooms])


    return (
        <div className="Banner min-h-screen dark:bg-lightBlack dark:bg-lightBlack">
            <div className=" py-20 2xl:py-[120px] w-full bg-no-repeat bg-top bg-opacity-[0.07]">
                {
                    rooms != null && rooms.length > 0 ?
                    <RoomCreate/>
                    :
                    ""
                }
            </div>
        </div>
    );
};

export default Rooms;
