

import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import axios from "axios";


export default function BannerModify() {
    const [data] = useOutletContext();
    const {id} = useParams()

    const [banner, setBanner] = useState(null)


    useEffect(()=>{
        if (data != null) {
            const banner = Array.from(data.banner).filter((d) => d.id == id);
            // console.log(banner[0]);
            setBanner(banner[0])
        }
    },[data])
    useEffect(()=>{
        if (banner != null) {
            console.log(banner);
        }
    },[banner])

    const handleInput = (e) => {
        const {name, value} = e.target
        setBanner({ ...banner, [name]: value });
    }

    const submitForm = (e) => {
        e.preventDefault()
        const formBanner = new FormData();
        formBanner.append("title", banner.title)
        formBanner.append("subtitle", banner.subtitle)
        formBanner.append("subtitle_bottom", banner.subtitle_bottom)
        formBanner.append("room", banner.room)
        axios.put(`http://127.0.0.1:8000/api/banners/modify/${id}`, formBanner)
        .then(response=>{
            console.log(response);
        })
    }




    return(
        <div className="py-20 2xl:py-[120px] w-full bg-[url('/images/home-1/section-shape2.png')] bg-no-repeat bg-top bg-opacity-[0.07] bg-whiteSmoke dark:bg-lightBlack flex items-center"
        style={{minHeight: "100vh", backgroundPosition: "center"}}>
            <div className="Container m-6">
                { banner != null ?
                    <form className="bg-lightBlack dark:bg-normalBlack p-[30px] lg:p-[45px] 2xl:p-[61px]" onSubmit={submitForm}>
                        <div className="flex flex-col items-center gap-10">
                            <div className="flex flex-col w-full items-center gap-10">
                                <div className="flex gap-10 items-center w-full">
                                    <label htmlFor="room" className="text-gray dark:text-lightGray w-1/5">Room ID</label>
                                    <input
                                        type="text"
                                        className="h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none w-5/12 box-border"
                                        placeholder="Room ID"
                                        name="room"
                                        onChange={handleInput}
                                        value={banner.room.id}
                                    />
                                </div>
                                <div className="flex gap-10 items-center w-full">
                                    <label htmlFor="title" className="text-gray dark:text-lightGray w-1/5">Banner title</label>
                                    <input
                                        type="text"
                                        className="h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none w-5/12 box-border"
                                        placeholder="Banner title"
                                        name="title"
                                        onChange={handleInput}
                                        value={banner.title}
                                    />
                                </div>
                                <div className="flex gap-10 items-center w-full">
                                    <label htmlFor="subtitle" className="text-gray dark:text-lightGray w-1/5">Banner subtitle</label>
                                    <input
                                        type="text"
                                        className="h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none w-5/12 box-border"
                                        placeholder="Banner subtitle"
                                        name="subtitle"
                                        onChange={handleInput}
                                        value={banner.subtitle}
                                    />
                                </div>
                                <div className="flex gap-10 items-center w-full">
                                    <label htmlFor="subtitle_bottom" className="text-gray dark:text-lightGray w-1/5">Banner bottom subtitle</label>
                                    <input
                                        type="text"
                                        className="h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none w-5/12 box-border"
                                        placeholder="Banner bottom subtitle"
                                        name="subtitle_bottom"
                                        onChange={handleInput}
                                        value={banner.subtitle_bottom}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center mt-6">
                                <button type="submit" className="w-[142px] h-10 lg:h-[50px] text-[15px] bg-khaki text-Garamond border border-khaki text-white mx-auto col-span-2  md:col-span-1 lg:col-span-1 relative z-10 before:absolute before:top-0 before:right-0 before:-z-10 before:w-0 before:h-full before:bg-lightBlack before:transition-all before:duration-500 hover:before:w-full hover:before:left-0">MODIFY</button>
                            </div>
                        </div>
                    </form>
                    :
                    ""
                }
            </div>
        </div>
    )
}