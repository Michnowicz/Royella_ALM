import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

export default function Dashboard() {
    const [chevron, setChevron] = useState(false)
    const chevronChange = () => {
        setChevron(!chevron)
    }


    return(
            <div className="Banner min-h-screen dark:bg-lightBlack">
                <div className=" py-24 2xl:py-[120px] w-full bg-no-repeat bg-top bg-opacity-[0.07] h-screen flex flex-col gap-20">
                    <div className="Container bg-whiteSmoke dark:bg-normalBlack px-4 md:px-7 lg:px-11 2xl:px-17 py-7 md:py-11 lg:py-15 xl:py-17 2xl:py-[100px]">
                        <h2 className="text-Garamond text-[22px] sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-[38px] leading-7 md:leading-8 lg:leading-9 xl:leading-10 2xl:leading-[44px] text-uppercase text-lightBlack dark:text-white font-semibold my-3 md:my-5 flex items-end cursor-pointer dark:hover:text-khaki hover:text-khaki" onClick={chevronChange}>
                            HOME
                            { chevron === false ?
                            <BiChevronUp className="ml-1"/>
                            :
                            <>
                                <BiChevronDown className="ml-1"/>
                            </>
                            }
                        </h2>

                        { chevron === true ?
                            <div>
                                <NavLink to="/backoffice/banner" className="text-lightBlack dark:text-white dark:hover:text-khaki py-2 block pl-2 text-lg font-semibold hover:text-khaki">
                                    Create Banner
                                </NavLink>
                                <NavLink to="/backoffice/hotelresort" className="text-lightBlack dark:text-white dark:hover:text-khaki py-2 block pl-2 text-lg font-semibold hover:text-khaki">
                                    Hotel & Resort
                                </NavLink>
                                <NavLink to="/backoffice/manager" className="text-lightBlack dark:text-white dark:hover:text-khaki py-2 block pl-2 text-lg font-semibold hover:text-khaki">
                                    Manager
                                </NavLink>
                            </div>
                            :
                            ""
                        }
                    </div>

                    <div className="Container bg-whiteSmoke dark:bg-normalBlack px-4 md:px-7 lg:px-11 2xl:px-17 py-7 md:py-11 lg:py-15 xl:py-17 2xl:py-[100px]">
                        <h2 className="text-Garamond text-[22px] sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-[38px] leading-7 md:leading-8 lg:leading-9 xl:leading-10 2xl:leading-[44px] text-uppercase text-lightBlack dark:text-white font-semibold my-3 md:my-5 flex items-end cursor-pointer dark:hover:text-khaki hover:text-khaki" onClick={chevronChange}>
                        <NavLink to="/backoffice/rooms">
                            ROOMS
                        </NavLink>
                        </h2>
                    </div>
                </div>
            </div>
    )
} 