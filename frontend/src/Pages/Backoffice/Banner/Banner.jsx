// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./style.css";


// import required modules
import BannerCreate from "./BannerCreate/BannerCreate";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import { useOutletContext } from "react-router-dom";


const Banner = () => {

    const [data] = useOutletContext();
    
    useEffect(()=>{
        // console.log(data);
    },[data])



    return (
        <div className="Banner min-h-screen dark:bg-lightBlack dark:bg-lightBlack">
            <div className=" py-20 2xl:py-[120px] w-full bg-no-repeat bg-top bg-opacity-[0.07]">
                {/* {
                    banners.length != 0 ?
                    <>
                        <BannerCreate/>
                        {
                        banners.map((b,i)=>(
                            <div key={i}></div>
                        ))
                        }
                    </>
                    :
                    <p>loading</p>
                } */}
            </div>
        </div>
    );
};

export default Banner;
