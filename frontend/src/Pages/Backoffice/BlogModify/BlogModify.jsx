import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";


export default function BlogModify({}) {
    const [blogs, setBlogs] = useState(null)
    const months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"]

    useEffect(()=>{
        fetchBlog()
    },[])
    const fetchBlog = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/blogs/get")
    console.log(response.data.blogs[0].category.name);
    setBlogs(response.data.blogs)
    }

    return(
        <div className="BlogModify">
            <div className="dark:bg-lightBlack py-20 2xl:py-[120px]">
            <div className="Container grid grid-cols-6 md:grid-cols-7 lg:grid-cols-6 gap-5 ">
            <div className="col-span-6 md:col-span-4">
                <div className="grid items-center gap-5 2xl:gap-y-[30px] grid-cols-1 lg:grid-cols-2">
                {/* Blog */}
                {
                    blogs != null ?
                    blogs.map((b,i)=>(
                    <div
                        className="overflow-hidden 3xl:w-[410px] group"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        key={i}
                    >
                        <div className="relative w-full h-full">
                        <img
                            src={"http://127.0.0.1:8000"+b.images[0].image}
                            // src="/images/home-1/blog-1.jpg "
                            className="w-full h-full object-cover"
                            alt=""
                        />
                        </div>
                        
                        <div className="font-Garamond border border-[#ddd] dark:border-gray border-t-0">
                        <div className="py-6 px-[30px] ">
                            <div className="flex items-center space-x-6 ">
                            <p className="text-sm 2xl:text-base leading-[26px] text-gray dark:text-lightGray font-normal uppercase mr-7 ml-3 relative before:absolute before:w-[7px] before:h-[7px] before:left-[-13px] before:bg-[#d1d1d1] dark:before:bg-khaki before:top-[9px]">
                                {months[parseInt(b.date.slice(5,7))-1]} {b.date.slice(8,10)}, {b.date.slice(0,4)}
                            </p>
                            <p className="text-sm 2xl:text-base leading-[26px] text-gray dark:text-lightGray font-normal uppercase mr-7 ml-3 relative before:absolute before:w-[7px] before:h-[7px] before:left-[-13px] before:bg-[#d1d1d1] dark:before:bg-khaki before:top-[9px]">
                                { b.category != null ?
                                b.category.name
                                :
                                ""
                                }
                            </p>
                            </div>
                            <Link
                            to={`/blog_details/${b.id}`}
                            state={{
                                title: b.title,
                            }}
                            >
                            <h2 className="text-xl md:text-[22px] xl:text-2xl 2xl:text-[26px] leading-[34px] font-semibold text-lightBlack dark:text-white py-2 sm:py-3 md:py-4 hover:underline underline-offset-2">
                                {b.title}
                            </h2>
                            </Link>
                        </div>
                        <div className="border-t-[1px] border-[#ddd] dark:border-gray py-2 sm:py-3 md:py-4 xl:py-5">
                            <Link
                            to={`/blog_details/${b.id}`}
                            className="px-[30px] flex items-center justify-between "
                            >
                            <div className="">
                                <span className=" text-sm sm:text-base flex items-center ">
                                <span className="ml-[10px] leading-[38px] uppercase text-lightBlack dark:text-white font-medium group-hover:text-khaki hover:underline  underline-offset-1">
                                    Read More
                                </span>
                                </span>
                            </div>
                            <span className="">
                                <BsArrowRight
                                className="text-gray dark:text-lightGray group-hover:text-khaki"
                                size={"24px"}
                                />
                            </span>
                            </Link>
                        </div>
                        </div>
                    </div>
                    ))
                    :
                    ""
                }
                </div>
            </div>
            </div>
        </div>
        </div>
    )

}