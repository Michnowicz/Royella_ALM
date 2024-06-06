import { useEffect, useState } from "react"
import "./SignIn.css"
import { IoIosClose } from "react-icons/io"


export default function SignIn({signIn, setSignIn}) {

    const [user, setUser] = useState({})
    const [image, setImage] = useState(null)

    // handle autoscroll when the modal is open
    const handleModal = () => {
        document.body.style.overflow = "auto"
        setSignIn(false)
    }

    // handle input changes
    const handleInput = (e) => {
        const {name, value} = e.target
        setUser({...user, [name]:value})
    }

    const handleImage = (e) => {
        setImage(e.target.files[0])
    }

    useEffect(()=>{
        console.log(user);
    },[user])
    useEffect(()=>{
        console.log(image);
    },[image])

    // handle log in submit
    const submitLogIn = (e) => {
        e.preventDefault()
        document.body.style.overflow = "auto"
        setSignIn(false)
    }



    return(
        <section className={signIn == false ? "hidden" : "SignIn"}>
            <div className="absolute h-screen w-screen z-10" onClick={handleModal}></div>
            <form onSubmit={submitLogIn} className="bg-whiteSmoke dark:bg-normalBlack  p-[30px] lg:p-[45px] 2xl:p-[61px] flex flex-col gap-10 z-20">
                <div className="flex justify-end">
                    <IoIosClose size={48} className="text-khaki group-hover:text-whiteSmoke cursor-pointer" onClick={handleModal}/>
                </div>
                <div className="flex flex-col gap-10">
                    <h2 className="text-center text-3xl text-Garamond text-gray dark:text-lightGray">Sign In</h2>
                    <div>
                        <div className="flex flex-col gap-10">
                            <div className="flex gap-10">
                                <div>
                                    {/* <label htmlFor="first_name" className="text-gray dark:text-lightGray">Firstname</label> */}
                                    <input type="text" placeholder="firstname" name="first_name" className="w-full h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent mt-4 focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none" onChange={handleInput}/>
                                </div>
                                <div>
                                    {/* <label htmlFor="last_name" className="text-gray dark:text-lightGray">Lastname</label> */}
                                    <input type="text" placeholder="lastname" name="last_name" className="w-full h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent mt-4 focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none" onChange={handleInput}/>
                                </div>
                            </div>
                            <div>
                                {/* <label htmlFor="email" className="text-gray dark:text-lightGray">Email</label> */}
                                <input type="email" placeholder="email" name="last_name" className="w-full h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent mt-4 focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none" onChange={handleInput}/>
                            </div>
                            <div>
                                {/* <label htmlFor="password" className="text-gray dark:text-lightGray">Password</label> */}
                                <input type="password" placeholder="password" name="last_name" className="w-full h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent mt-4 focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none" onChange={handleInput}/>
                            </div>
                            <div>
                                <input type="file" name="image" className="w-full h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent mt-4 focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none" onChange={handleImage}/>
                            </div>
                            <div>
                                <button className="w-full bg-khaki text-white text-center h-10 2xl:h-[55px] mt-5" type="submit">
                                    SIGN IN
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    )
} 
