
import "../style.css";


// import required modules
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import axios from "axios"

const RoomCreate = ({}) => {

    const [chevron, setChevron] = useState(false)
    const [roomImage, setRoomImage] = useState(null)
    const [preview, setPreview] = useState("")
    const [room, setRoom] = useState(null)

    const [status, setStatus] = useState("")
    const [roomID, setRoomID] = useState(0)

    const chevronChange = () => {
        setChevron(!chevron)
    }

    const submitForm = (e) => {
        e.preventDefault()
        if (roomImage != null) {
            const formRoom = new FormData();
            formRoom.append("name", room.name)
            formRoom.append("subtitle", room.subtitle)
            formRoom.append("bed_number", room.bed_number)
            formRoom.append("space", room.space)
            formRoom.append("rating", room.rating)
            formRoom.append("price", room.price)
            formRoom.append("percentage_reduction", room.percentage_reduction)
            if (room.disponibility == "true") {
                formRoom.append("disponibility", true)
            } else {
                formRoom.append("disponibility", false)
            }
            formRoom.append("phone_number", room.phone_number)

            axios.post("http://127.0.0.1:8000/api/rooms/create", formRoom)
            .then(response=>{
                // console.log(response.data);
                setStatus(response.data.status)
                setRoomID(response.data.data.id)
            })
        }
    }

    useEffect(()=> {
        if (status === "success") {
            const formRoomImg = new FormData()
            formRoomImg.append('image', roomImage)
            formRoomImg.append('room', parseInt(roomID))

            axios.post("http://127.0.0.1:8000/api/roomsimg/create", formRoomImg)
            .then(response=>{
                console.log(response.data);
            })
        }
    },[status])

    const handleInput = (e) => {
        const {name, value, files} = e.target
        if (name === 'image') {
            setRoomImage(files[0])
            setPreview(URL.createObjectURL(files[0]))
        } else if (name === "price" || name === "percentage_reduction") {
            setRoom({ ...room, [name]: parseFloat(value)});
        } else {
            setRoom({ ...room, [name]: value });
        }
    }

    return (
        <div className="Container bg-whiteSmoke dark:bg-normalBlack px-7 md:px-10 lg:px-14 2xl:px-20 py-10 md:py-14 lg:py-18 xl:py-20 2xl:py-[100px]">
            <h2 className="text-Garamond text-[22px] sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-[38px] leading-7 md:leading-8 lg:leading-9 xl:leading-10 2xl:leading-[44px] text-uppercase text-lightBlack dark:text-white font-semibold my-3 md:my-5 flex items-end cursor-pointer" onClick={chevronChange}>
                Create Room
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
                    <div className="flex flex-col items-center gap-10">
                        <div className="flex flex-col gap-10 w-full">
                            <img src={preview} alt="" className="w-full h-96 flex items-center justify-center"/>
                            <input
                                type="file"
                                className="w-full h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none"
                                name="image"
                                onChange={handleInput}
                            />
                        </div>
                        <div className="flex w-full gap-10 flex-wrap justify-center">
                            <input
                                type="text"
                                className="h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none w-5/12 box-border"
                                placeholder="Name"
                                name="name"
                                onChange={handleInput}
                            />
                            <input
                                type="text"
                                className="h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none w-5/12 box-border"
                                placeholder="Subtitle"
                                name="subtitle"
                                onChange={handleInput}
                            />
                            <input
                                type="number"
                                className="h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none w-5/12 box-border"
                                placeholder="Beds"
                                name="bed_number"
                                onChange={handleInput}
                            />
                            <input
                                type="number"
                                className="h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none w-5/12 box-border"
                                placeholder="Space"
                                name="space"
                                onChange={handleInput}
                            />
                            <input
                                type="number"
                                className="h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none w-5/12 box-border"
                                min={0}
                                max={5}
                                placeholder="Rating"
                                name="rating"
                                onChange={handleInput}
                            />
                            <input
                                type="number"
                                className="h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none w-5/12 box-border"
                                placeholder="price"
                                name="price"
                                onChange={handleInput}
                            />
                            <input
                                type="number"
                                className="h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none w-5/12 box-border"
                                min={0}
                                max={1}
                                step={0.01}
                                placeholder="Reduction"
                                name="percentage_reduction"
                                onChange={handleInput}
                            />
                                <select name="disponibility"
                                className="h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none w-5/12 box-border"
                                onChange={handleInput}>
                                    <option value="">Disponibility</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </select>
                            <input
                                type="text"
                                className="h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none w-5/12 box-border"
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

export default RoomCreate;
