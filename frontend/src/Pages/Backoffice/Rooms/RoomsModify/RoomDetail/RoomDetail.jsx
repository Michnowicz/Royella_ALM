
import "../../style.css";


// import required modules
import { useEffect, useState } from "react";
import axios from "axios"
import "keen-slider/keen-slider.min.css";
import { useOutletContext, useParams } from "react-router-dom";

const RoomDetails = () => {

    const [data] = useOutletContext();
    const {id} = useParams()

    const [room, setRoom] = useState(null)
    const [preview, setPreview] = useState(null)
    const [roomImage, setRoomImage] = useState(null)

    const submitForm = (e) => {
        e.preventDefault()
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
        axios.put(`http://127.0.0.1:8000/api/rooms/modify/${id}`, formRoom)
        .then(response=>{
            console.log(response.data);
        })
    }

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



    useEffect(()=>{
        if (data != null) {
            // console.log(data.rooms[id]);
            setRoom(data.rooms[id])
        }
    },[data])
    useEffect(()=>{
        if (room != null) {
            console.log(room);
        }
    },[room])

    return (
        <div className="py-20 2xl:py-[120px] w-full bg-[url('/images/home-1/section-shape2.png')] bg-no-repeat bg-top bg-opacity-[0.07] bg-whiteSmoke dark:bg-lightBlack flex items-center"
        style={{minHeight: "100vh", backgroundPosition: "center"}}>
            <div className="Container m-6">
                { room != null ?
                    <form className="bg-lightBlack  p-[30px] lg:p-[45px] 2xl:p-[61px]" onSubmit={submitForm}>
                        <div className="flex flex-col items-center gap-10">
                            <div className="flex flex-col gap-10 w-full items-center">
                                { preview == null ?
                                    <img src={"http://127.0.0.1:8000"+room.image.image} alt="" className="w-[960px] h-[456px] flex items-center justify-center"/>
                                    :
                                    <img src={preview} alt="" className="w-[960px] h-[456px] flex items-center justify-center"/>
                                }
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
                                    value={room.name}
                                />
                                <input
                                    type="text"
                                    className="h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none w-5/12 box-border"
                                    placeholder="Subtitle"
                                    name="subtitle"
                                    onChange={handleInput}
                                    value={room.subtitle}
                                />
                                <input
                                    type="number"
                                    className="h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none w-5/12 box-border"
                                    placeholder="Beds"
                                    name="bed_number"
                                    onChange={handleInput}
                                    value={room.bed_number}
                                />
                                <input
                                    type="number"
                                    className="h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none w-5/12 box-border"
                                    placeholder="Space"
                                    name="space"
                                    onChange={handleInput}
                                    value={room.space}
                                />
                                <input
                                    type="number"
                                    className="h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none w-5/12 box-border"
                                    min={0}
                                    max={5}
                                    placeholder="Rating"
                                    name="rating"
                                    onChange={handleInput}
                                    value={room.rating}
                                />
                                <input
                                    type="number"
                                    className="h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none w-5/12 box-border"
                                    placeholder="price"
                                    name="price"
                                    onChange={handleInput}
                                    value={room.price}
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
                                    value={room.percentage_reduction}
                                />
                                    <select name="disponibility"
                                    className="h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none w-5/12 box-border"
                                    value={room.disponibility}
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
                                    value={room.phone_number}
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
        </div>
    );
};

export default RoomDetails;
