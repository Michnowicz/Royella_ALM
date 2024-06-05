import { useEffect, useState } from "react"
import "./LogIn.css"
import { IoIosClose } from "react-icons/io"


export default function LogIn({logIn, setLogIn}) {

    const [user, setUser] = useState({})

    // handle autoscroll when the modal is open
    const handleModal = () => {
        document.body.style.overflow = "auto"
        setLogIn(false)
    }

    // handle input changes
    const handleInput = (e) => {
        const {name, value} = e.target
        setUser({...user, [name]:value})
    }
    useEffect(()=>{
        console.log(user);
    },[user])

    // handle log in submit
    const submitLogIn = (e) => {
        e.preventDefault()
        document.body.style.overflow = "auto"
        setLogIn(false)
    }

    

    return(
        <section className={logIn == false ? "hidden" : "LogIn"}>
            <div className="absolute h-screen w-screen z-10" onClick={handleModal}></div>
            <form onSubmit={submitLogIn} className="bg-whiteSmoke dark:bg-normalBlack  p-[30px] lg:p-[45px] 2xl:p-[61px] flex flex-col gap-10 w-1/3 z-20">
                <div className="flex justify-end">
                    <IoIosClose size={48} className="text-khaki group-hover:text-whiteSmoke cursor-pointer" onClick={handleModal}/>
                </div>
                <div className="flex flex-col gap-10">
                    <h2 className="text-center text-3xl text-Garamond text-gray dark:text-lightGray">Log In</h2>
                    <div className="flex flex-col gap-10">
                        <input type="email" placeholder="Email" name="email" className="w-full h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent mt-4 focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none" onChange={handleInput}/>
                        <input type="password" placeholder="password" name="password" className="w-full h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent mt-4 focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none" onChange={handleInput}/>
                        <div>
                            <button className="w-full bg-khaki text-white text-center h-10 2xl:h-[55px] mt-5" type="submit">
                                LOG IN
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    )
} 
