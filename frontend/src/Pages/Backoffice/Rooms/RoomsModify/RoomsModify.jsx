
import "../style.css"


// import required modules
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import axios from "axios"
import { useKeenSlider } from "keen-slider/react";
import { BsArrowRight } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import "keen-slider/keen-slider.min.css";
import { BiBed } from "react-icons/bi";

const RoomModify = ({rooms}) => {

    const [chevron, setChevron] = useState(false)
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loaded] = useState(false);

    const chevronChange = () => {
        setChevron(!chevron)
    }

    // useEffect(()=>{
    //     if (rooms != null) {
    //         console.log(rooms);
    //     }
    // },[])

    return (
        <div className="Container bg-whiteSmoke dark:bg-normalBlack px-7 md:px-10 lg:px-14 2xl:px-20 py-10 md:py-14 lg:py-18 xl:py-20 2xl:py-[100px]">
            <h2 className="text-Garamond text-[22px] sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-[38px] leading-7 md:leading-8 lg:leading-9 xl:leading-10 2xl:leading-[44px] text-uppercase text-lightBlack dark:text-white font-semibold my-3 md:my-5 flex items-end cursor-pointer" onClick={chevronChange}>
                Modify Room
                { chevron === false ?
                    <BiChevronUp className="ml-1"/>
                    :
                    <>
                        <BiChevronDown className="ml-1"/>
                    </>
                }
            </h2>
            { chevron === true ?
                
                <div className="relative">
                    <div className="mt-14 2xl:mt-[60px] flex flex-wrap justify-center gap-20">
                    {/* slide */}
                    { rooms && rooms.length > 0 ?
                        rooms.map((r,i)=>(
                        <div className="keen-slider__slide number-slide1 w-96" key={i}>
                            <div data-aos="fade-up-left" data-aos-duration="1000">
                            <div className="overflow-x-hidden 3xl:w-[410px] group relative">
                                <div className="relative">
                                <div className="overflow-hidden">
                                    {
                                        r.image != null ?
                                        <img
                                        src={"http://127.0.0.1:8000"+r.image.image}
                                        className="w-[410px] h-[320px] object-cover group-hover:scale-110 transition-all duration-300"
                                        alt=""
                                        />
                                        :
                                        <img
                                            src="/images/home-1/room-1.jpg"
                                            alt="room_section_logo"
                                            className="w-[410px] h-[320px]"
                                        />
                                    }
                                </div>
                                <div className="">
                                    <Link to={`/backoffice/rooms/${r.id}`}>
                                    <button className="flex items-center justify-center text-[15px] leading-[38px] bg-lightBlack absolute bottom-0 -left-40 px-5 text-white  group-hover:left-0 transition-all duration-300 hover:bg-khaki">
                                        Modify{" "}
                                        <BsArrowRight className="w-4 h-4 ml-2  text-white" />{" "}
                                    </button>
                                    </Link>
                                </div>
                                </div>
                                <div className="font-Garamond">
                                <div className="px-5 3xl:px-6 py-2 inline-flex bg-khaki text-sm  items-center justify-center text-white  absolute top-[10px] right-[10px] font-Lora font-normal leading-[26px]">
                                    <span className="">${r.price}</span>
                                    <span className="mx-2">|</span>
                                    <span>Night</span>
                                </div>

                                <div className=" border-[1px] border-[#e8e8e8] dark:border-[#424242] border-t-0">
                                    <div className="py-6 px-[30px]">
                                    <h4 className="text-sm leading-[26px] text-khaki uppercase font-semibold">
                                        {r.subtitle}
                                    </h4>
                                    <Link to="/room">
                                        <h2 className="text-2xl lg:text-[28px] leading-[26px] font-semibold text-lightBlack dark:text-white py-4">
                                        {r.name}
                                        </h2>
                                    </Link>
                                    <p className="text-sm font-normal text-gray  dark:text-lightGray font-Lora">
                                        {r.space} SQ.FT/Rooms
                                    </p>
                                    </div>
                                    <div className="  border-t-[1px] border-[#e8e8e8] dark:border-[#424242] py-5">
                                    <div className="px-[30px] flex items-center justify-between">
                                        <div className="">
                                        <span className="font-Lora text-base flex items-center ">
                                            <img
                                            src="/images/home-1/room-bottom-icon.png"
                                            alt=""
                                            />
                                            <span className="ml-[10px] text-gray dark:text-lightGray">
                                            {r.bed_number} King Bed
                                            </span>
                                        </span>
                                        </div>
                                        <span className="w-[1px] h-[25px] bg-[#ddd] dark:bg-gray"></span>
                                        <ul className="flex items-center text-black space-x-[5px]">
                                        {[...Array(r.rating)].map((x, i) =>
                                            <li>
                                                <FaStar className="w-[14px] h-[14px] lg:w-[16px] lg:h-[16px] text-khaki" key={i}/>
                                            </li>
                                        )}
                                        {[...Array(5-r.rating)].map((x, i) =>
                                            <li>
                                                <FaStar className="w-[14px] h-[14px] lg:w-[16px] lg:h-[16px] text-black" key={i}/>
                                            </li>
                                        )}
                                        </ul>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        ))
                        :
                        ""
                    }
                    </div>

                    {/* slider breckpoints */}
                    <div className="mx-auto ">
                    {loaded && instanceRef.current && (
                        <div className="dots flex items-center justify-center">
                        {[
                            ...Array(
                            instanceRef.current.track.details.slides.length
                            ).keys(),
                        ].map((idx) => {
                            return (
                            <button
                                key={idx}
                                onClick={() => {
                                instanceRef.current?.moveToIdx(idx);
                                }}
                                className={
                                "dot" + (currentSlide === idx ? " active" : "")
                                }
                            ></button>
                            );
                        })}
                        </div>
                    )}
                    </div>
                </div>

                :
                ""
            }
        </div>
    );
};

export default RoomModify;
