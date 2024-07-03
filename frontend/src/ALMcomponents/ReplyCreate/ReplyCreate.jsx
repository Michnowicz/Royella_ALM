import { useState, useEffect } from "react"
import axios from "axios"

export default function ReplyCreate({replyID, setReplyID}) {
    const [reply, setReply] = useState(null)


    const handleInput = (e) => {
        const {name, value} = e.target
        setReply({...reply, [name]: value})
    }

    const createReply = async (e) => {
        e.preventDefault()
    
        const formReply = new FormData()
        formReply.append("name", reply.name)
        formReply.append("email", reply.email)
        formReply.append("text", reply.text)
        formReply.append("image", "user/u3.png")
        formReply.append("comment", replyID)
        const date = new Date()
        formReply.append("date", `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
        
        const response = await axios.put(`http://127.0.0.1:8000/api/reply/create`, formReply)
        
        if (response.data.status == "success") {
            setReplyID(0)
        }
    }
    
    // useEffect(()=>{
    //     if (reply != null) {
    //         console.log(reply);
    //     }
    // },[reply])
    // useEffect(()=>{
    //     if (replyID != null) {
    //         console.log(replyID);
    //     }
    // },[replyID])


    return (
        <form onSubmit={createReply} className="mt-5">
            <div className="flex sm:flex-row flex-col items-center  gap-5 mb-5">
                <input
                    type="text"
                    name="name"
                    className="w-full h-[50px] border-none outline-none focus:ring-0 placeholder:text-base placeholder:text-lightGray placeholder:leading-[38px] placeholder:font-Lora placeholder:font-normal px-5 dark:bg-normalBlack bg-whiteSmoke dark:text-white"
                    placeholder="Your Name"
                    id=""
                    onChange={handleInput}
                />
                <input
                    type="email"
                    name="email"
                    className="w-full h-[50px] border-none outline-none focus:ring-0 placeholder:text-base placeholder:text-lightGray placeholder:leading-[38px] placeholder:font-Lora placeholder:font-normal px-5 dark:bg-normalBlack bg-whiteSmoke dark:text-white"
                    placeholder="Email Address"
                    id=""
                    onChange={handleInput}
                />
            </div>
            <div className="grid items-center gap-5 mb-5 md:mb-0">
                <input
                    type="text"
                    name="website"
                    className="w-full h-[50px] border-none outline-none focus:ring-0 placeholder:text-base placeholder:text-lightGray placeholder:leading-[38px] placeholder:font-Lora placeholder:font-normal px-5 dark:bg-normalBlack bg-whiteSmoke dark:text-white"
                    placeholder="Your Website"
                    id=""
                    onChange={handleInput}
                />

                <textarea
                    className="w-full h-[160px]  border-none outline-none focus:ring-0 placeholder:text-base placeholder:text-lightGray placeholder:leading-[38px] placeholder:font-Lora placeholder:font-normal px-5 dark:bg-normalBlack bg-whiteSmoke dark:text-white resize-none"
                    placeholder="Type Your Reply"
                    name="text"
                    id=""
                    cols="30"
                    onChange={handleInput}
                ></textarea>
                <button className="btn-primary" type="submit">Submit Now</button>
            </div>
        </form>
    )
}