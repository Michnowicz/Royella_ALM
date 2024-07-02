import { Link, useLocation, useParams } from "react-router-dom";
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import BlogSideBar from "./BlogSideBar";
import { BiChevronsRight } from "react-icons/bi";
import { useEffect, useState } from "react";
import axios from "axios";

const BlogDetails = () => {
  const location = useLocation();
  const blogData = location.state && location.state;


  const months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"]
  const {id} = useParams()
  const [blog, setBlog] = useState(null)
  const [count, setCount] = useState(0)


  useEffect(()=>{
    fetchData()
  },[id])
  const fetchData = async () => {
    const response = await axios.get(`http://127.0.0.1:8000/api/blogs/${id}`)
    setBlog(response.data.blog)
    setCount(response.data.count)
  }

  useEffect(()=>{
    if (blog != null) {
      console.log(blog);
    }
    if (count != 0) {
      console.log(count);
    }
  },[blog,count])

  return (
    <div>
      <BreadCrumb title="Blog Details" />
      {/* Blog Details */}
      { blog != null ?
      <div className="dark:bg-lightBlack py-20 2xl:py-[120px]">
        <div className="Container grid grid-cols-6 md:grid-cols-7 lg:grid-cols-6 gap-5 ">
          <div className="col-span-6 md:col-span-4">
            <img
              // src="/images/inner/blog-details.jpg"
              src={"http://127.0.0.1:8000"+blog.images[0].image}
              alt=""
              data-aos="fade-up"
              data-aos-duration="1000"
            />
            {/* Blog Details content */}
            <div className="pt-5 lg:pt-[35px]  pr-3">
              <div data-aos="fade-up" data-aos-duration="1000">
                <p className="text-base font-Garamond text-gray dark:text-lightGray">
                  <span>{months[parseInt(blog.date.slice(5,7))-1]} {blog.date.slice(8,10)}, {blog.date.slice(0,4)} </span> <span className="mx-2">/</span>
                  <span> {blog.category.name}</span>
                </p>
                <h2 className="py-2 sm:py-3 md:py-4 lg:py-[19px] 2xl:py-[25px] font-Garamond text-[22px] sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-[38px] 3xl:text-[40px] leading-6 lg:leading-[26px]  text-lightBlack dark:text-white font-semibold">
                  {blogData && blogData.title
                    ? blogData.title
                    : blog.title}
                </h2>
                <p className="text-sm lg:text-base leading-6 text-gray dark:text-lightGray font-normal font-Lora">
                  {blog.title_text}
                </p>
                {/* <p className="mt-5 2xl:mt-7 text-sm lg:text-base leading-6 text-gray dark:text-lightGray font-normal font-Lora">
                  Conveniently fashion pandemic potentialities for team driven
                  technologies. Proactively orchestrate robust systems rather
                  than user-centric vortals. Distinctively seize top-line
                  e-commerce with premier intellectual capital. Efficiently
                  strategize goal-oriented
                </p> */}
              </div>

              {/* Blog Roles */}
              <div
                className="pt-10 2xl:pt-[60px]"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <h2
                  className="pb-2 sm:pb-3 md:pb-4 lg:pb-[19px] 2xl:pb-6
                font-Garamond text-lg sm:text-xl md:text-2xl xl:text-[28px] leading-6 lg:leading-7 text-lightBlack dark:text-white font-semibold"
                >
                  {blog.subtitle}
                </h2>
                <p className="text-sm lg:text-base leading-6 text-gray dark:text-lightGray font-normal font-Lora">
                  {blog.subtitle_text}
                </p>
                <ul className="space-y-2 lg:space-y-3 ">
                  <li className="flex items-center">
                    <BiChevronsRight size={16} className="text-khaki mr-2" />
                    <span className="text-sm lg:text-base leading-[26px] text-gray dark:text-lightGray font-normal font-Lora">
                      {blog.subtitle_list1}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <BiChevronsRight size={16} className="text-khaki mr-2" />
                    <span className="text-sm lg:text-base leading-[26px] text-gray dark:text-lightGray font-normal font-Lora">
                    {blog.subtitle_list2}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <BiChevronsRight size={16} className="text-khaki mr-2" />
                    <span className="text-sm lg:text-base leading-[26px] text-gray dark:text-lightGray font-normal font-Lora">
                    {blog.subtitle_list3}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <BiChevronsRight size={16} className="text-khaki mr-2" />
                    <span className="text-sm lg:text-base leading-[26px] text-gray dark:text-lightGray font-normal font-Lora">
                    {blog.subtitle_list4}
                    </span>
                  </li>
                </ul>
              </div>
              {/* Extra blog */}
              <div
                className="pt-10 2xl:pt-[60px]"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <div className="pb-2 sm:pb-3 md:pb-4 lg:pb-[19px] 2xl:pb-6 grid items-center grid-cols-1 sm:grid-cols-2 gap-5 2xl:gap-[30px]">
                  <img src={"http://127.0.0.1:8000"+blog.images[1].image} alt="" />
                  <img src={"http://127.0.0.1:8000"+blog.images[2].image} alt="" />
                </div>
                <p className="text-sm lg:text-base leading-6 text-gray dark:text-lightGray font-normal font-Lora">
                  {blog.subtitle_text2}
                </p>
                {/* <p className="mt-5 2xl:mt-7 text-sm lg:text-base leading-6 text-gray dark:text-lightGray font-normal font-Lora">
                  Holisticly innovate global ROI with user-centric total
                  linkage. Collaboratively e-enable efficient markets with
                  multifunctional e-business. Continually incentivize
                  sustainable products for B2B
                </p> */}
              </div>

              <div
                className="my-10 py-5 border-t-[1px] border-b-[1px] border-lightGray dark:border-gray lg:flex items-center justify-between"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <div className="flex items-center space-x-2">
                  <h5 className="text-lg text-[#101010] dark:text-white leading-[28px] font-semibold font-Garamond mr-2">
                    Tags :
                  </h5>
                  {
                  blog.tags.map((t,i)=>(
                    <span className="text-sm border-[1px] border-lightGray dark:border-gray px-3 py-1 dark:text-white" key={i}>
                      {t.name}
                    </span>
                  ))}
                  
                  {/* <span className="text-sm border-[1px] border-lightGray dark:border-gray px-3 py-1 dark:text-white">
                    Luxury
                  </span> */}
                </div>
                {/* social Link */}
                <div className="flex items-center space-x-2 mt-3 lg:mt-0">
                  <h5 className="text-lg text-[#101010] dark:text-white leading-[28px] font-semibold font-Garamond mr-2">
                    Share :
                  </h5>
                  <Link
                    to="#"
                    className="text-sm  px-3 py-1 dark:text-white hover:text-khaki hover:underline underline-offset-4"
                  >
                    FB
                  </Link>
                  <Link
                    to="#"
                    className="text-sm  px-3 py-1 dark:text-white hover:text-khaki hover:underline underline-offset-4"
                  >
                    TW
                  </Link>
                  <Link
                    to="#"
                    className="text-sm  px-3 py-1 dark:text-white hover:text-khaki hover:underline underline-offset-4"
                  >
                    LN
                  </Link>
                  <Link
                    to="#"
                    className="text-sm  px-3 py-1 dark:text-white hover:text-khaki hover:underline underline-offset-4"
                  >
                    PI
                  </Link>
                </div>
              </div>

              {/* gaideline */}
              <div className="lg:flex items-center gap-5  ">
                <div
                  className="p-5 hover:bg-whiteSmoke dark:hover:bg-normalBlack transition-all duration-300 border-[0.5px] border-lightGray dark:border-gray rounded-sm hover:border-whiteSmoke"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <Link to="/blog_details" className="flex items-center">
                    <img
                      src="/images/inner/details-post-1.jpg"
                      className=" mr-3 2xl:mr-5 "
                      alt=""
                    />
                    <div className="text-left">
                      <h4 className="text-base 2xl:text-lg leading-6 text-[#101010] dark:text-white font-medium font-Garamond hover:underline underline-offset-4">
                        How to Book a Room Online Step by Step Guide
                      </h4>
                      <p className="text-sm md:text-[13px] 2xl:text-sm leading-[26px] font-Lora text-gray dark:text-lightGray font-normal">
                        August 10, 2023
                      </p>
                    </div>
                  </Link>
                </div>
                <div
                  className="mt-5 lg:mt-0 p-5 hover:bg-whiteSmoke dark:hover:bg-normalBlack transition-all duration-300 border-[0.5px] border-lightGray dark:border-gray rounded-sm hover:border-whiteSmoke"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <Link
                    to="/blog_details"
                    className="flex flex-row-reverse items-center"
                  >
                    <img
                      src="/images/inner/details-post-2.jpg"
                      className=" ml-3 2xl:ml-5 "
                      alt=""
                    />
                    <div className="text-left">
                      <h4 className="text-base 2xl:text-lg leading-6 text-[#101010] dark:text-white font-medium font-Garamond hover:underline underline-offset-4">
                        Pre Booking Benifits for the Traveller on our Hotel
                      </h4>
                      <p className="text-sm md:text-[13px] 2xl:text-sm leading-[26px] font-Lora text-gray dark:text-lightGray font-normal">
                        August 10, 2023
                      </p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Comment Section */}
              <div className="my-10 2xl:my-[60px] 3xl:my-[80px]">
                <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-[32px] text-lightBlack dark:text-white font-semibold font-Garamond mb-5 2xl:mb-[30px]">
                  ‘{count}’ Comments
                </h3>
                {blog.comments.length != 0 ?
                  blog.comments.map((c,i)=>(
                    <div className="mb-10" key={i}>
                      <div
                        className="border-[1px] border-lightGray dark:border-gray rounded-sm p-4 sm:p-5 md:p-6 2xl:p-[30px]"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                      >
                        <div className="grid gap-3 sm:flex md:grid md:gap-5 lg:flex ">
                          <img
                            src={"http://127.0.0.1:8000/media/"+c.image}
                            alt=""
                            className="w-[70px]  h-[70px]"
                          />

                          <div className="ml-3 2xl:ml-4 w-full">
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center w-full">
                                <span className="text-base sm:text-lg lg:text-xl font-Garamond font-semibold leading-6 md:leading-7 text-lightBlack dark:text-white">
                                  {c.name}
                                </span>
                                <hr className="w-[10px] sm:w-[27px] h-[1px] text-lightBlack dark:text-white mx-1 sm:mx-2 " />
                                <span className="text-[13px] sm:text-[15px] font-Lora font-normal text-gray dark:text-lightGray">
                                {months[parseInt(c.date.slice(5,7))-1]} {c.date.slice(8,10)}, {c.date.slice(0,4)}
                                </span>
                              </div>
                              <span className="text-[13px] sm:text-[15px] font-Lora font-normal text-gray dark:text-lightGray cursor-pointer">
                                REPLY
                              </span>
                            </div>
                            <p className="text-sm sm:text-[15px] font-Lora font-normal text-gray dark:text-lightGray mt-3 xl:mt-[15px]">
                              {c.text}
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* comment -2 */}
                      { c.replies.length > 0 ?
                      c.replies.map((r,i)=>(
                        <div
                          className="border-[1px] border-lightGray dark:border-gray rounded-sm p-4 sm:p-5 md:p-6 2xl:p-[30px] ml-0 lg:ml-10 3xl:ml-14  mt-5"
                          data-aos="fade-up"
                          data-aos-duration="1000"
                          key={i}
                        >
                          <div className="grid gap-3 sm:flex md:grid md:gap-5 lg:flex ">
                            <img
                              src={"http://127.0.0.1:8000/media/"+r.image}
                              alt=""
                              className="w-[70px]  h-[70px] "
                            />

                            <div className="ml-3 2xl:ml-4 w-full">
                              <div className="flex items-center justify-between w-full">
                                <div className="flex items-center w-full">
                                  <span className="text-base sm:text-lg lg:text-xl font-Garamond font-semibold leading-6 md:leading-7 text-lightBlack dark:text-white">
                                    {r.name}
                                  </span>
                                  <hr className="w-[10px] sm:w-[27px] h-[1px] text-lightBlack dark:text-white mx-1 sm:mx-2 " />
                                  <span className="text-[13px] sm:text-[15px] font-Lora font-normal text-gray dark:text-lightGray">
                                    {months[parseInt(r.date.slice(5,7))-1]} {r.date.slice(8,10)}, {r.date.slice(0,4)}
                                  </span>
                                </div>
                                <span className="text-[13px] sm:text-[15px] font-Lora font-normal text-gray dark:text-lightGray cursor-pointer">
                                  REPLY
                                </span>
                              </div>
                              <p className="text-sm sm:text-[15px] font-Lora font-normal text-gray dark:text-lightGray mt-3 xl:mt-[15px]">
                                {r.text}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                      :
                      ""
                      }
                    </div>
                  ))
                  :
                  ""
                }
              </div>

              {/* Comment form */}
              <div data-aos="fade-up" data-aos-duration="1000">
                <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-[32px] text-lightBlack dark:text-white font-semibold font-Garamond mb-5 2xl:mb-[30px]">
                  Leave A Comments
                </h3>
                <div>
                  <div className="flex sm:flex-row flex-col items-center  gap-5 mb-5">
                    <input
                      type="text"
                      name=""
                      className="w-full h-[50px] border-none outline-none focus:ring-0 placeholder:text-base placeholder:text-lightGray placeholder:leading-[38px] placeholder:font-Lora placeholder:font-normal px-5 dark:bg-normalBlack bg-whiteSmoke dark:text-white"
                      placeholder="Your Name"
                      id=""
                    />
                    <input
                      type="email"
                      name=""
                      className="w-full h-[50px] border-none outline-none focus:ring-0 placeholder:text-base placeholder:text-lightGray placeholder:leading-[38px] placeholder:font-Lora placeholder:font-normal px-5 dark:bg-normalBlack bg-whiteSmoke dark:text-white"
                      placeholder="Email Address"
                      id=""
                    />
                  </div>
                  <div className="grid items-center gap-5 mb-5 md:mb-0">
                    <input
                      type="text"
                      name=""
                      className="w-full h-[50px] border-none outline-none focus:ring-0 placeholder:text-base placeholder:text-lightGray placeholder:leading-[38px] placeholder:font-Lora placeholder:font-normal px-5 dark:bg-normalBlack bg-whiteSmoke dark:text-white"
                      placeholder="Your Website"
                      id=""
                    />

                    <textarea
                      className="w-full h-[160px]  border-none outline-none focus:ring-0 placeholder:text-base placeholder:text-lightGray placeholder:leading-[38px] placeholder:font-Lora placeholder:font-normal px-5 dark:bg-normalBlack bg-whiteSmoke dark:text-white resize-none"
                      placeholder="Type Your Comment"
                      name=""
                      id=""
                      cols="30"
                    ></textarea>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        className="border-khaki text-khaki focus:ring-0 focus:outline-none focus:border-none"
                      />
                      <p className="text-[13px] sm:text-[15px] font-Lora font-normal text-gray dark:text-lightGray ml-2">
                        Save your email info in the browser for next comments.
                      </p>
                    </div>
                    <button className="btn-primary">Submit Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Blog Sidebar */}
          <div className="col-span-6 md:col-span-3 lg:col-span-2">
            {/* imported Blog Sidebar */}
            <BlogSideBar />
          </div>
        </div>
      </div>
      :
      ""
      }
    </div>
  );
};

export default BlogDetails;
