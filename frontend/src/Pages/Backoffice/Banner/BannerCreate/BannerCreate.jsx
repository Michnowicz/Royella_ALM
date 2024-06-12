
import "../style.css";


// import required modules
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import axios from "axios"

const BannerCreate = () => {

    const [chevron, setChevron] = useState(false)
    const [bannerImage, setBannerImage] = useState(null)
    const [preview, setPreview] = useState("")
    const [banner, setBanner] = useState(null)

    const chevronChange = () => {
        setChevron(!chevron)
    }

    const submitForm = (e) => {
        const formImage = new FormData();
        formImage.append("image",bannerImage);
        e.preventDefault()
        const response= axios.post("http://127.0.0.1:8000/api/bannerimg/create", formImage)
        .then(response=>{
            // console.log(response);
        })
    }

    const handleInput = (e) => {
        const {name, value, files} = e.target
        if (name === 'image') {
            setBannerImage(files[0])
            setPreview(URL.createObjectURL(files[0]))
        } else {
            setBanner({ ...banner, [name]: value });
        }
    }

    // useEffect(()=>{
    //     console.log(banner);
    // },[banner])
    // useEffect(()=>{
    //     console.log(bannerImage);
    // },[bannerImage])

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
                    <div className="flex items-center gap-20 flex">
                        <div className="w-2/4 min-w-96 flex flex-col gap-10">
                            <img src={preview} alt="" className="w-96 h-48 flex items-center justify-center"/>
                            <input
                                type="file"
                                className="w-full h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none"
                                name="image"
                                onChange={handleInput}
                            />
                        </div>
                        <div className="w-2/4 min-w-96">
                            <input
                                type="text"
                                className="w-full h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none"
                                placeholder="Title"
                                name="title"
                                onChange={handleInput}
                            />
                            <input
                                type="text"
                                className="w-full h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent mt-4 focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none"
                                placeholder="Subtitle"
                                name="subtitle"
                                onChange={handleInput}
                            />
                            <input
                                type="text"
                                className="w-full h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent mt-4 focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none"
                                placeholder="Subtitle bottom"
                                name="subtitle_bottom"
                                onChange={handleInput}
                            />
                            <input
                                type="number"
                                className="w-full h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent mt-4 focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none"
                                placeholder="Rating"
                                max={5}
                                min={0}
                                name="rating"
                                onChange={handleInput}
                            />
                            <input
                                type="text"
                                className="w-full h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent mt-4 focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none"
                                placeholder="Phone number"
                                name="phone_number"
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
