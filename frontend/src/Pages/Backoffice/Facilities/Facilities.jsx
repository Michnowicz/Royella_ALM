
import { useEffect, useState } from "react";
import { HiArrowLongRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

const Facilities = () => {

    const [data] = useOutletContext();
    const [facilitiesSection, setFacilitiesSection] = useState(null)
    const [facilityID, setFacilityID] = useState(null)
    const [btnID, setBtnID] = useState(0)

    const [formSection, setFormSection] = useState()
    
    useEffect(()=>{
        if (data != null && facilitiesSection == null) {
            setFacilitiesSection(data.facilitySection)

            const facilitiesID = []
            data.facility.forEach(f => {
                facilitiesID.push(f.id)
            });
            setFacilityID(facilitiesID);
            }
        },[data])

    useEffect(()=>{
        if (facilitiesSection != null) {
            console.log(facilitiesSection);
        }
    },[facilitiesSection])

    const handleForm = (e) => {
        e.preventDefault()
        const change = Array.from(facilitiesSection).filter((f) => f.id == btnID)
        console.log(change[0].id)


        const formFacility = new FormData
        formFacility.append("category",change[0].category)
        formFacility.append("subtitle",change[0].subtitle)
        formFacility.append("description",change[0].description)
        formFacility.append("facility",change[0].facility)

        axios.put(`http://127.0.0.1:8000/api/facilitysection/modify/${change[0].id}`, formFacility)
        .then(response=>{
            console.log(response);
        })
    }



    const handleInput = (e, id) => {
        const {name, value} = e.target
        // console.log(facilitiesSection[id-1].category);
        setFacilitiesSection(fac => fac.map(f => f.id === id ? {...f, [name]: value } : f))
    }




    return (
        <div className="dark:bg-mediumBlack ">
        <section className="Container py-[120px] md:py-0 md:pb-[120px] lg:py-[120px]">
            
        <div className="">
            { facilitiesSection != null && facilityID != null ?
                facilitiesSection.map((f,i)=>(
                <form onSubmit={handleForm} key={i}>
                <hr className="text-[#e8e8e8] dark:text-[#383838] mb-10 mt-10" />
                <div className="flex flex-col">
                    <div className="flex items-center gap-2 py-2 text-lightBlack dark:text-white font-semibold">
                        <div>
                            Current facility ID:
                        </div>
                        <div>
                            {f.facility_info.id}
                        </div>
                    </div>
                    <div className="flex items-center gap-2 py-2">
                        <label htmlFor="facility" className="text-lightBlack dark:text-white">facility ID</label>
                        <select name="facility" id="facility_id" className="bg-transparent text-lightBlack dark:text-white border-none" onChange={(e)=> handleInput(e, f.id)}>
                            <option key={i} value={0}>---</option>
                            { facilityID.map((f,i)=>(
                                <option key={i} value={f}>{f}</option>
                            ))
                            }
                        </select>
                    </div>
                </div>
                { f.id % 2 != 0 ?
                    <div
                    className="grid grid-cols-1 md:grid-cols-2 "
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    >
                    <div className="relative w-full h-[100%] md:pr-[30px]">
                        <img
                        src={"http://127.0.0.1:8000"+f.facility_info.image.image}
                        alt=""
                        className="w-full h-full"
                        />
                        <div className=" hidden md:block absolute -top-[0px] md:-right-[12%] -right-[7%] xl:-right-[5%]">
                        <h2 className="text-3xl md:text-4xl lg:text-[40px] leading-[38px] text-khaki font-Garamond">
                            {`0${f.id}`}
                        </h2>
                        </div>
                    </div>
                    <div className="relative font-Garamond md:ml-[60px] lg:ml-[107px] mt-3 md:mt-0  h-full">
                        <input
                            type="text"
                            className="w-1/2 px-4 border border-gray dark:border-lightGray text-khaki dark:text-khaki outline-none  bg-transparent focus:ring-0 placeholder:text-khaki focus:border-gray dark:focus:border-lightGray focus:outline-none font-semibold leading-[26px] uppercase"
                            placeholder="Category"
                            name="category"
                            onChange={(e)=> handleInput(e, f.id)}
                            value={f.category}
                        />

                        <h1 className="text-2xl md:text-3xl 2xl:text-[32px] leading-[26px] font-semibold text-lightBlack dark:text-white">
                        <input
                            type="text"
                            className="w-full px-4 border border-gray dark:border-lightGray outline-none  bg-transparent focus:ring-0 focus:border-gray dark:focus:border-lightGray focus:outline-none font-semibold leading-[26px] uppercase text-2xl md:text-3xl 2xl:text-[32px] leading-[26px] font-semibold text-lightBlack dark:text-white"
                            placeholder="Subtitle"
                            name="subtitle"
                            onChange={(e)=> handleInput(e, f.id)}
                            value={f.subtitle}
                        />
                        </h1>

                        <p className="font-Lora text-sm sm:text-base text-gray dark:text-lightGray leading-[26px] font-normal my-10 lg:mt-[46px] lg:mb-[40px] before:absolute before:h-[30px] before:left-0 before:top-[-35px] before:bg-[#ddd] before:w-[1px] relative">
                        <textarea
                            type="text"
                            className="w-full border border-gray dark:border-lightGray outline-none  bg-transparent focus:ring-0 focus:border-gray dark:focus:border-lightGray focus:outline-none font-Lora text-sm sm:text-base text-gray dark:text-lightGray leading-[26px] font-normal before:absolute before:h-[30px] before:left-0 before:top-[-35px] before:bg-[#ddd] before:w-[1px] relative "
                            rows={5}
                            placeholder="Description"
                            name="description"
                            onChange={(e)=> handleInput(e, f.id)}
                            value={f.description}
                        />
                        </p>

                        <div className="flex items-center mt-6">
                            <button id={f.id} type="submit" className="w-[142px] h-10 lg:h-[50px] text-[15px] bg-khaki text-Garamond border border-khaki text-white mx-auto col-span-2  md:col-span-1 lg:col-span-1 relative z-0 before:absolute before:top-0 before:right-0 before:-z-10 before:w-0 before:h-full before:bg-lightBlack before:transition-all before:duration-500 hover:before:w-full hover:before:left-0" onClick={()=>setBtnID(f.id)}>MODIFY</button>
                        </div>
                    </div>
                    </div>
                    :
                    <div
                    className="grid grid-cols-1 md:grid-cols-2 "
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    >
                    <div className=" font-Garamond md:mr-[2px] lg:mr-[110px]  h-full">
                        <h4 className="text-base font-semibold text-khaki leading-[26px] pb-[6px] uppercase ">
                        <input
                            type="text"
                            className="w-1/2 px-4 border border-gray dark:border-lightGray text-khaki dark:text-khaki outline-none  bg-transparent focus:ring-0 placeholder:text-khaki focus:border-gray dark:focus:border-lightGray focus:outline-none font-semibold leading-[26px] uppercase"
                            placeholder="Category"
                            name="category"
                            onChange={(e)=> handleInput(e, f.id)}
                            value={f.category}
                        />
                        </h4>
                        <h1 className="text-2xl md:text-3xl 2xl:text-[32px] leading-[26px] font-semibold text-lightBlack dark:text-white">
                        <input
                            type="text"
                            className="w-full px-4 border border-gray dark:border-lightGray outline-none  bg-transparent focus:ring-0 focus:border-gray dark:focus:border-lightGray focus:outline-none font-semibold leading-[26px] uppercase text-2xl md:text-3xl 2xl:text-[32px] leading-[26px] font-semibold text-lightBlack dark:text-white"
                            placeholder="Subtitle"
                            name="subtitle"
                            onChange={(e)=> handleInput(e, f.id)}
                            value={f.subtitle}
                        />
                        </h1>

                        <p className="font-Lora relative text-sm sm:text-base text-gray dark:text-lightGray leading-[26px] font-normal my-10 lg:mt-[46px] lg:mb-[40px] before:absolute before:h-[30px] before:left-0 before:top-[-35px] before:bg-[#ddd] before:w-[1px]">
                        <textarea
                            type="text"
                            className="w-full border border-gray dark:border-lightGray outline-none  bg-transparent focus:ring-0 focus:border-gray dark:focus:border-lightGray focus:outline-none font-Lora text-sm sm:text-base text-gray dark:text-lightGray leading-[26px] font-normal before:absolute before:h-[30px] before:left-0 before:top-[-35px] before:bg-[#ddd] before:w-[1px] relative "
                            rows={5}
                            placeholder="Description"
                            name="description"
                            onChange={(e)=> handleInput(e, f.id)}
                            value={f.description}
                        />
                        </p>
                        <div className="flex items-center mt-6">
                            <button id={f.id} type="submit" className="w-[142px] h-10 lg:h-[50px] text-[15px] bg-khaki text-Garamond border border-khaki text-white mx-auto col-span-2  md:col-span-1 lg:col-span-1 relative z-0 before:absolute before:top-0 before:right-0 before:-z-10 before:w-0 before:h-full before:bg-lightBlack before:transition-all before:duration-500 hover:before:w-full hover:before:left-0" onClick={()=>setBtnID(f.id)}>MODIFY</button>
                        </div>
                    </div>

                    <div className="w-full  md:pl-[30px] relative mt-5 md:mt-0">
                        <img
                        src={"http://127.0.0.1:8000"+f.facility_info.image.image}
                        alt=""
                        className="w-full h-full"
                        />
                        <div className="hidden md:block absolute -top-[0px] -left-[12%] xl:-left-[6%]">
                        <h1 className="text-3xl md:text-4xl lg:text-[40px] leading-[38px] text-khaki  font-Garamond">
                            {`0${f.id}`}
                        </h1>
                        </div>
                    </div>
                    </div>
                }
                </form>
                ))
            :
            ""
            }
        </div>

        </section>
        </div>
    );
};

export default Facilities;
