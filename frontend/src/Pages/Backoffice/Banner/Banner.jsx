// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./style.css";


// import required modules
import BannerCreate from "./BannerCreate/BannerCreate";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

import { useOutletContext } from "react-router-dom";


const Banner = () => {

    const [data] = useOutletContext();

    const [banners, setBanners] = useState(null)
    const [roomNumber, setRoomNumber] = useState(0)
    const [create, setCreate] = useState(false)

    useEffect(()=>{
        if (data != null) {
            setBanners(data.banner)
            setRoomNumber(data.rooms.length)
        }
    },[data])


    const [chevron, setChevron] = useState(false)
    const chevronChange = () => {
        setChevron(!chevron)
    }



    
    useEffect(()=>{
        if (data != null) {
            console.log(data);
        }
    },[data])



    return (
        <div className="Banner min-h-screen dark:bg-lightBlack dark:bg-lightBlack">
            <div className=" py-20 2xl:py-[120px] w-full bg-no-repeat bg-top bg-opacity-[0.07] flex flex-col gap-10">
                <BannerCreate roomNumber={roomNumber} setBanners={setBanners} setRoomNumber={setRoomNumber}/>

                <div className="Container bg-whiteSmoke dark:bg-normalBlack px-4 md:px-7 lg:px-11 2xl:px-17 py-7 md:py-11 lg:py-15 xl:py-17 2xl:py-[100px]">
                    <h2 className="text-Garamond text-[22px] sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-[38px] leading-7 md:leading-8 lg:leading-9 xl:leading-10 2xl:leading-[44px] text-uppercase text-lightBlack dark:text-white font-semibold my-3 md:my-5 flex items-end cursor-pointer" onClick={chevronChange}>
                        Modify Banner
                        { chevron === false ?
                            <BiChevronUp className="ml-1"/>
                            :
                            <>
                                <BiChevronDown className="ml-1"/>
                            </>
                        }
                    </h2>

                { chevron === true && banners != null ?
                <table className="table-auto w-full ">
                    <thead style={{borderBottom: "1px solid #acacac"}}>
                        <tr>
                            <th className="text-left">id</th>
                            <th className="text-left">title</th>
                            <th className="text-left">room_id</th>
                            <th className="text-left">actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        banners.map((b,i)=>(
                            <>
                                <tr key={i} style={{borderBottom: "1px solid #acacac38"}} className="pt-1 pb-10">
                                    <td>{b.id}</td>
                                    <td>{b.title}</td>
                                    <td>{b.room.id}</td>
                                    <td className="flex gap-3">
                                        <Link to={`/backoffice/banner/${b.id}`}
                                        className="bg-blue-600 h-10 2xl:h-[50px] text-white text-Garamond font-semibold px-5 hover-animBg after:rounded-none after:bg-normalBlack flex items-center">MODIFY</Link>
                                        <button className="bg-red-600 h-10 2xl:h-[50px] text-white text-Garamond font-semibold px-5 hover-animBg after:rounded-none after:bg-normalBlack">DELETE</button>
                                    </td>
                                </tr>
                            </>
                        ))
                        }
                    </tbody>
                </table>
                    :
                    ""
                }
                </div>
            </div>
        </div>
    );
};

export default Banner;
