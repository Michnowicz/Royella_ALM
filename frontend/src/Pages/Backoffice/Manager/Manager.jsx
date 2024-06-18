import { BsPlay } from "react-icons/bs";
import { useState, useEffect } from "react";
import FsLightbox from "fslightbox-react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";


const Manager = () => {
    const [toggler, setToggler] = useState(false);
    const [data] = useOutletContext();
    const [employeesNumber, setEmployeesNumber] = useState(0)

    const [manager, setManager] = useState()
    const [managerID, setManagerID] = useState(0)
    const [preview, setPreview] = useState(null)

    useEffect(()=>{
        if (data != null) {
        console.log(data);
        setManager(data.manager)
        setEmployeesNumber(data.employees.length)
        setManagerID(data.manager.manager.id)
        }
    },[data])


    useEffect(()=>{
        if (manager != null) {
            console.log(manager.manager.id);
            console.log(managerID);
        }
    },[manager, managerID])
    // useEffect(()=>{
    //     if (managerID != null) {
    //         console.log(managerID);
    //     }
    // },[managerID])
    // useEffect(()=>{
    //     if (video != null) {
    //         console.log(video);
    //     }
    // },[video])
    // useEffect(()=>{
    //     if (preview != null) {
    //         console.log(preview);
    //     }
    // },[preview])


    const submitForm = (e) => {
        e.preventDefault()

        if (preview != null) {
            const formImage = new FormData()
            formImage.append("image", manager.image)
            axios.put(`http://127.0.0.1:8000/api/managerImg/modify`, formImage)
            .then(response=>{
                console.log(response);
            })
        }

        const formManager = new FormData();
        formManager.append("title", manager.title)
        formManager.append("subtitle", manager.subtitle)
        formManager.append("description", manager.description)
        formManager.append("video", manager.video)
        formManager.append("manager", managerID)

        axios.put(`http://127.0.0.1:8000/api/manager/modify`, formManager)
        .then(response=>{
            console.log(response);
        })

    }


    const handleInput = (e) => {
        const {name, value, files} = e.target
        if (name === "manager") {
            setManagerID(value);
        } else if (name === "image") {
            setManager({ ...manager, [name]: files[0] });
            setPreview(URL.createObjectURL(files[0]))
        } else if (name === "video") {
            setManager({ ...manager, [name]: value });
            // setVideo(value)
        } else if (name === "manager") {
            setManagerID(value)
        } else {
            setManager({ ...manager, [name]: value });
        }
    }

    return (
        <div className="dark:bg-mediumBlack h-screen flex items-center">
            { manager != null ?
            <form className="Container dark:z-[1]" onSubmit={submitForm}>
                <div className=" w-full grid grid-cols-1 lg:grid-cols-2 items-center ">
                <div
                    className="bg-[#f8f6f3] dark:bg-normalBlack space-y-[14px] flex-1 font-Garamond px-5 sm:px-7 md:px-9 lg:pl-[70px] py-10 md:py-[96px] lg:pr-[70px]"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                >
                    <h5 className="text-base text-khaki leading-[26px] font-semibold">
                    <input
                        type="text"
                        className="text-khaki w-full text-gray dark:text-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:outline-none"
                        name="title"
                        onChange={handleInput}
                        value={manager.title}
                    />
                    </h5>
                    <h1 className="text-[22px] sm:text-2xl md:text-[28px] xl:text-[32px] 2xl:text-[38px] leading-[38px] lg:leading-[44px] text-lightBlack dark:text-white font-semibold">
                    <input
                        type="text"
                        className=" font-semibold text-lightBlack dark:text-white w-full text-gray dark:text-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:outline-none"
                        name="subtitle"
                        onChange={handleInput}
                        value={manager.subtitle}
                    />
                    </h1>
                    <p className="text-sm sm:text-base font-Lora text-gray dark:text-lightGray font-normal leading-[26px]">
                    <textarea 
                        type="text"
                        className=" px-4 border border-gray dark:border-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none box-border w-full"
                        name="description"
                        rows={5}
                        onChange={handleInput}
                        value={manager.description}
                    />
                    </p>
                    <p className="text-sm sm:text-base font-Lora italic leading-[26px] underline  text-gray dark:text-lightGray font-normal ">
                    “ Model. Appropriately create interactive infrastructures after
                    main Holisticly facilitate stand-alone inframe of the world ”
                    </p>
                    <div className="flex items-center space-x-6 pt-5">
                    <img
                        src={"http://127.0.0.1:8000"+manager.manager.image.image}
                        className="w-[65px] h-[65px] object-cover"
                        alt=""
                    />

                    <div className="">
                        <h4 className="text-lg sm:text-[22px] leading-[26px] text-lightBlack dark:text-white font-semibold font-Garamond">
                        {manager.manager.firstname} {manager.manager.lastname}
                        </h4>
                        <p className="pt-1 text-base leading-[26px] font-normal text-gray dark:text-lightGray flex items-center font-Lora">
                        <span className="w-5 h-[1px] inline-block text-khaki bg-khaki mr-2"></span>
                        {manager.manager.occupation}
                        </p>
                    </div>
                    <div className="flex flex-col">
                    <label htmlFor="manager" className="text-gray dark:text-lightGray">manager ID</label>
                    { employeesNumber != 0 ?
                        <input
                            type="number"
                            className="w-20 text-gray dark:text-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:outline-none"
                            name="manager"
                            max={employeesNumber}
                            min={1}
                            step={1}
                            onChange={handleInput}
                            // value={manager.manager.id}
                            value={managerID}
                        />
                        :
                        ""
                    }
                    </div>
                    </div>
                    <div className="flex items-center mt-6">
                        <button type="submit" className="bg-khaki p-1 px-4 text-Garamond border border-khaki text-white mx-auto col-span-2  md:col-span-1 lg:col-span-1 relative z-10 before:absolute before:top-0 before:right-0 before:-z-10 before:w-0 before:h-full before:bg-lightBlack before:transition-all before:duration-500 hover:before:w-full hover:before:left-0">MODIFY</button>
                    </div>
                </div>
                <div
                    className="flex-1 h-[100%] w-full relative "
                    data-aos="fade-up"
                    data-aos-duration="1000"
                >
                    { preview == null ?
                        <img
                        src={"http://127.0.0.1:8000"+manager.image.image}
                        className="h-full w-full md:h-[80%] lg:h-full 2xl:h-[99%] "
                        alt=""
                        />
                        :
                        <img
                        src={preview}
                        className="h-full w-full md:h-[80%] lg:h-full 2xl:h-[99%] "
                        alt=""
                        />
                    }
                    <input
                        type="file"
                        className="w-full text-gray dark:text-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:outline-none"
                        name="image"
                        onChange={handleInput}
                    />
                    <input
                        type="text"
                        className="w-full text-gray dark:text-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:outline-none"
                        name="video"
                        onChange={handleInput}
                        value={manager.video}
                    />

                    <div
                    className="w-[70px] h-[70px]  text-white absolute top-1/2 md:top-[35%] lg:top-1/2 left-[45%] bg-khaki rounded-full flex items-center justify-center cursor-pointer z-[1] "
                    onClick={() => setToggler(!toggler)}
                    >
                    <BsPlay className="w-8 h-8" />
                    </div>
                    <span className=" top-[47%] md:top-[33%] lg:top-[48%] left-[42%] lg:left-[43.5%] border w-[90px] h-[90px] rounded-full absolute border-white video-animation">
                    </span>
                </div>
                <FsLightbox
                toggler={toggler}
                sources={[manager.video]}
                />
                </div>
                
            </form>
            :
            ""
            }
        </div>
    );
};

export default Manager;
