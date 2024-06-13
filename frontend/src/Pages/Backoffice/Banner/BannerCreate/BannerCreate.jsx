
import "../style.css";


// import required modules
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import axios from "axios"

const BannerCreate = ({roomNumber, setBanners, setRoomNumber}) => {

    const [chevron, setChevron] = useState(false)
    const [banner, setBanner] = useState(null)

    const chevronChange = () => {
        setChevron(!chevron)
    }

    const submitForm = (e) => {
        e.preventDefault()

        const formBanner = new FormData();
        formBanner.append("title",banner.title)
        formBanner.append("subtitle",banner.subtitle)
        formBanner.append("subtitle_bottom",banner.subtitle_bottom)
        formBanner.append("room",banner.room)
        
        const response= axios.put("http://127.0.0.1:8000/api/banners/create", formBanner)
        .then(response=>{
            console.log(response);
            if (response.data.status == "success") {
                setBanners(response.data.data)
                setRoomNumber(response.data.data.length)
            }
        })
    }

    const handleInput = (e) => {
        const {name, value} = e.target
        setBanner({ ...banner, [name]: value });
    }

    useEffect(()=>{
        console.log(banner);
    },[banner])

    return (
        <div className="Container bg-whiteSmoke dark:bg-normalBlack px-4 md:px-7 lg:px-11 2xl:px-17 py-7 md:py-11 lg:py-15 xl:py-17 2xl:py-[100px]">
            <h2 className="text-Garamond text-[22px] sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-[38px] leading-7 md:leading-8 lg:leading-9 xl:leading-10 2xl:leading-[44px] text-uppercase text-lightBlack dark:text-white font-semibold my-3 md:my-5 flex items-end cursor-pointer" onClick={chevronChange}>
                Create Banner
                { chevron === false ?
                    <BiChevronUp className="ml-1"/>
                    :
                    <>
                        <BiChevronDown className="ml-1"/>
                    </>
                }
            </h2>
            { chevron === true ?
                <form className="bg-lightBlack  p-[30px] lg:p-[45px] 2xl:p-[61px]" onSubmit={submitForm}>
                    <div>
                        <div className="flex items-center gap-10 flex-wrap justify-center">
                            <input
                                type="text"
                                className="w-1/2 h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none"
                                placeholder="Title"
                                name="title"
                                onChange={handleInput}
                            />
                            <input
                                type="text"
                                className="w-1/2 h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none"
                                placeholder="Subtitle"
                                name="subtitle"
                                onChange={handleInput}
                            />
                            <input
                                type="text"
                                className="w-1/2 h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none"
                                placeholder="Subtitle bottom"
                                name="subtitle_bottom"
                                onChange={handleInput}
                            />
                            <input
                                type="number"
                                className="w-1/2 h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none"
                                placeholder="Room"
                                max={roomNumber}
                                min={1}
                                step={1}
                                name="room"
                                onChange={handleInput}
                            />
                        </div>
                    </div>
                    <div className="flex items-center mt-6">
                        <button type="submit" className="w-[142px] h-10 lg:h-[50px] text-[15px] bg-khaki text-Garamond border border-khaki text-white mx-auto col-span-2  md:col-span-1 lg:col-span-1 relative z-10 before:absolute before:top-0 before:right-0 before:-z-10 before:w-0 before:h-full before:bg-lightBlack before:transition-all before:duration-500 hover:before:w-full hover:before:left-0">CREATE</button>
                    </div>
                </form>
                :
                ""
            }
        </div>
    );
};

export default BannerCreate;
