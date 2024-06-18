import "./hotel.css";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

const HotelAndResort = () => {
    const [, setCurrentSlide] = useState(0);
    const [sliderRef] = useKeenSlider({
        breakpoints: {
        "(min-width:320px)": {
            slides: { perView: 1, spacing: "20" },
        },
        },
        loop: true,
        initial: 0,
        slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
        },
        created() {},
    });


    const [data] = useOutletContext();
    const [hotelResort, setHotelResort] = useState(null)
    const [imageOne, setImageOne] = useState(null)
    const [previewOne, setPreviewOne] = useState(null)
    const [previewTwo, setPreviewTwo] = useState(null)
    const [imageTwo, setImageTwo] = useState(null)
    const [roomNumber, setRoomNumber] = useState(0)
    useEffect(()=>{
        if (data != null) {
            console.log(data);
            setHotelResort(data.hotelResort[0])
            // setHotelResortImg(data.hotelResortImg)
            setImageOne(data.hotelResortImg[0].image)
            setImageTwo(data.hotelResortImg[1].image)
            setRoomNumber(data.rooms.length)
        }
    },[data])

    
    const handleInput = (e) => {
        const {name, value, files} = e.target
        if (name == "imageOne") {
            setImageOne(files[0])
            setPreviewOne(URL.createObjectURL(files[0]))
        } else if (name == "imageTwo") {
            setImageTwo(files[0])
            setPreviewTwo(URL.createObjectURL(files[0]))
        } else {
            setHotelResort({ ...hotelResort, [name]: value });
        }
    }

    // modify hotel and resort section
    const submitForm = (e) => {
        e.preventDefault()
        const formHR = new FormData();
        formHR.append("title", hotelResort.title)
        formHR.append("subtitle", hotelResort.subtitle)
        formHR.append("text", hotelResort.text)
        axios.put(`http://127.0.0.1:8000/api/hotelresort/modify`, formHR)
        .then(response=>{
            console.log(response);
        })
    }

    // modify hotel and resort images
    const submitImageOne = (e) => {
        e.preventDefault()
        const formImageOne = new FormData()
        formImageOne.append("image", imageOne)
        console.log(formImageOne);
        axios.put(`http://127.0.0.1:8000/api/hotelresortimg/modify/1`, formImageOne)
        .then(response=>{
            console.log(response);
        })
    }
    const submitImageTwo = (e) => {
        e.preventDefault()
        const formImageTwo = new FormData()
        formImageTwo.append("image", imageTwo)
        console.log(formImageTwo);
        axios.put(`http://127.0.0.1:8000/api/hotelresortimg/modify/2`, formImageTwo)
        .then(response=>{
            console.log(response);
        })
    }


    useEffect(()=>{
        if (hotelResort != null) {
            // console.log(hotelResort);
            // console.log(imageOne);
            // console.log(previewOne);
            console.log(previewTwo);
        }
    },[hotelResort, imageOne, imageTwo])



    return (
        <section className="dark:bg-mediumBlack py-20 2xl:py-[120px] min-h-screen">
            { hotelResort != null ?
            <div
                className="Container  sm:overflow-hidden lg:overflow-auto p-20"
                data-aos="fade-up"
                data-aos-duration="1000"
            >
                <div className="md:flex items-center justify-between">
                <div
                    className="flex-1 keen-slider w-screen  md:w-[60%] 2xl:w-[580px] md:pr-5 lg:pr-6 xl:pr-8 2xl:pr-9 3xl:pr-10  md:mt-0"
                    ref={sliderRef}
                >
                    {/* slider 1 */}
                    <div className="keen-slider__slide number-slide1 ">
                    <form className="" onSubmit={submitImageOne}>
                        { imageOne != null && previewOne == null ?
                            <>
                            <img
                            src={"http://127.0.0.1:8000"+imageOne}
                            className="h-[85%] lg:h-[90%]"
                            alt="Hotel-slider-image"
                            />
                            </>
                            :
                            <>
                            <img
                            src={previewOne}
                            className="h-[85%] md:h-[100%] lg:h-[90%]"
                            alt="Hotel-slider-image"
                            />
                            </>
                        }
                        <input
                            type="file"
                            className="w-full text-gray dark:text-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:outline-none"
                            name="imageOne"
                            onChange={handleInput}
                        />
                        <div className="flex items-center mt-6">
                            <button type="submit" className="bg-khaki p-1 px-4 text-Garamond border border-khaki text-white mx-auto col-span-2  md:col-span-1 lg:col-span-1 relative z-10 before:absolute before:top-0 before:right-0 before:-z-10 before:w-0 before:h-full before:bg-lightBlack before:transition-all before:duration-500 hover:before:w-full hover:before:left-0">MODIFY</button>
                        </div>
                    </form>
                    </div>
                    <div className="keen-slider__slide number-slide1 ">
                    <form className="" onSubmit={submitImageTwo}>
                        { imageTwo != null && previewTwo == null ?
                            <>
                            <img
                            src={"http://127.0.0.1:8000"+imageTwo}
                            className="h-[85%] lg:h-[90%]"
                            alt="Hotel-slider-image"
                            />
                            </>
                            :
                            <>
                            <img
                            src={previewTwo}
                            className="h-[85%] md:h-[100%] lg:h-[90%]"
                            alt="Hotel-slider-image"
                            />
                            </>
                        }
                        <input
                            type="file"
                            className="w-full text-gray dark:text-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:outline-none"
                            name="imageTwo"
                            onChange={handleInput}
                        />
                        <div className="flex items-center mt-6">
                            <button type="submit" className="bg-khaki p-1 px-4 text-Garamond border border-khaki text-white mx-auto col-span-2  md:col-span-1 lg:col-span-1 relative z-10 before:absolute before:top-0 before:right-0 before:-z-10 before:w-0 before:h-full before:bg-lightBlack before:transition-all before:duration-500 hover:before:w-full hover:before:left-0">MODIFY</button>
                        </div>
                    </form>
                    </div>
                </div>

                {/* text */}
                <form className="flex-1 font-Garamond  mt-5 md:mt-0 md:pl-8 p-5  lg:pl-10 2xl:pl-14" onSubmit={submitForm}>
                    <h5 className="text-base text-khaki leading-[26px] font-medium">
                        <input 
                        type="text"
                        className=" px-4 border border-gray dark:border-lightGray text-khaki outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none box-border w-full"
                        name="title"
                        onChange={handleInput}
                        value={hotelResort.title}
                        />
                    </h5>
                    <h1 className="text-[22px] sm:text-2xl md:text-[21px]  xl:text-3xl 2xl:text-[38px] leading-6 md:leading-7 lg:leading-[30px] 2xl:leading-[44px] text-lightBlack dark:text-white font-semibold my-4">
                        <input 
                        type="text"
                        className=" px-4 border border-gray dark:border-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none box-border w-full"
                        name="subtitle"
                        onChange={handleInput}
                        value={hotelResort.subtitle}
                        />
                    </h1>
                    <p className="text-sm xl:text-base md:text-sm lg:text-base font-Lora text-gray dark:text-lightGray font-normal leading-[26px]">
                        <textarea 
                        type="text"
                        className=" px-4 border border-gray dark:border-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none box-border w-full"
                        name="text"
                        rows={7}
                        onChange={handleInput}
                        value={hotelResort.text}
                        />
                    </p>
                    <div className="flex items-center mt-4 md:mt-3 lg:mt-4">
                    <div>
                        <h1 className="text-4xl md:text-4xl lg:text-5xl xl:text-6xl  3xl:text-[70px] leading-[42px] text-khaki font-medium ">
                        {roomNumber} +
                        </h1>
                        <p className="text-sm sm:text-base md:text-sm lg:text-base leading-[26px] text-gray dark:text-lightGray font-normal font-Lora pt-5 xl:pt-7 md:w-[94px] lg:w-full">
                        Luxury Rooms
                        </p>
                    </div>
                    <div className="ml-10 xl:ml-[60px] 2xl:ml-20 3xl:ml-[100px]">
                        <h1 className="text-4xl md:text-4xl lg:text-5xl xl:text-6xl  3xl:text-[70px] leading-[42px] text-khaki font-medium ">
                        4.9
                        </h1>
                        <p className="text-sm sm:text-base md:text-sm lg:text-base leading-[26px] text-gray dark:text-lightGray font-normal font-Lora pt-5 xl:pt-7 md:w-[134px] lg:w-full">
                        Customer Ratings
                        </p>
                    </div>
                    </div>
                    <div className="py-5 lg:py-7 xl:py-[30px]">
                    <div className="relative overflow-x-hidden ">
                        <hr className="w-full h-[2px] bg-[#ddd] text-[#ddd]" />
                        <span className="w-[60px] h-[2px] bg-khaki rounded-full absolute -top-[0px] animation-move1"></span>
                    </div>
                    </div>
                    <div className="flex items-center mt-6">
                        <button type="submit" className="w-[142px] h-10 lg:h-[50px] text-[15px] bg-khaki text-Garamond border border-khaki text-white mx-auto col-span-2  md:col-span-1 lg:col-span-1 relative z-10 before:absolute before:top-0 before:right-0 before:-z-10 before:w-0 before:h-full before:bg-lightBlack before:transition-all before:duration-500 hover:before:w-full hover:before:left-0">MODIFY</button>
                    </div>
                </form>
                </div>
            </div>
            :
            ""
            }
        </section>
    );
};

export default HotelAndResort;
