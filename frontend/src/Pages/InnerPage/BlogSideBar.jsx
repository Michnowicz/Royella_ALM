import { FaSearch } from "react-icons/fa";
import { BiChevronsRight } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const BlogSideBar = ({search ,setSearch,setCategorySearch, tagSearch, setTagSearch}) => {
  const [tags, setTags] = useState(null)
  const [categories, setCategories] = useState(null)


  useEffect(()=>{
    fetchData()
  },[])
  const fetchData = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/searchbar/get")
    // console.log(response.data.data);
    setTags(response.data.data.tags)
    setCategories(response.data.data.categories)
  }
  
  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase())
  }
  const handleCategory = (category) => {
    if (category === "Uncategories") {
      setCategorySearch("")
    } else {
      setCategorySearch(category)
    }
  }
  const handleTag = (e,tag) => {
    // console.log(e.target.nodeName);
    if (tagSearch === tag) {
      setTagSearch("")
    } else {
      setTagSearch(tag)
    }

    // div color on click
    if (e.target.nodeName === "DIV") {
      Array.from(e.target.parentElement.children).forEach(element => {
        if (element.className.includes("bg-white") && e.target.id === element.id) {
          console.log(element.id);
          element.className = "px-2 sm:px-4 py-2 bg-khaki text-white dark:bg-lightBlack transition-all duration-300 group"
          element.firstChild.className = "text-sm sm:text-base leading-6 lg:leading-[30px] font-Garamond text-white dark:text-white font-medium  group-hover:text-white"
        } else {
          element.className = "px-2 sm:px-4 py-2 bg-white dark:bg-lightBlack hover:bg-khaki transition-all duration-300 group"
          element.firstChild.className = "text-sm sm:text-base leading-6 lg:leading-[30px] font-Garamond text-[#101010] dark:text-white font-medium  group-hover:text-white"
        }
      });
    } else {
      Array.from(e.target.parentElement.parentElement.children).forEach(element => {
        if (element.className.includes("bg-white") && e.target.parentElement.id === element.id) {
          console.log(element.id);
          element.className = "px-2 sm:px-4 py-2 bg-khaki text-white dark:bg-lightBlack transition-all duration-300 group"
          element.firstChild.className = "text-sm sm:text-base leading-6 lg:leading-[30px] font-Garamond text-white dark:text-white font-medium  group-hover:text-white"
        } else {
          element.className = "px-2 sm:px-4 py-2 bg-white dark:bg-lightBlack hover:bg-khaki transition-all duration-300 group"
          element.firstChild.className = "text-sm sm:text-base leading-6 lg:leading-[30px] font-Garamond text-[#101010] dark:text-white font-medium  group-hover:text-white"
        }
      });
    }
  }




  // useEffect(()=>{
  //   if (tags !== null) {
  //     console.log(tags);
  //   }
  //   if (categories !== null) {
  //     console.log(categories);
  //   }
  //   console.log(tagSearch);
  // },[tags, categories, tagSearch])



  
  return (
    <>
      {/* blog search bar*/}
      <div className="bg-whiteSmoke dark:bg-normalBlack items-center w-full p-4 sm:p-8 2xl:p-10 focus:shadow-xl rounded-md">
        <form
          className="flex items-center space-x-2 md:space-x-5 relative"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <input
            placeholder="Search Here"
            type="text"
            className=" px-5 py-[5px] w-full h-12 md:h-14 text-base
                  border-none outline-none rounded-md text-gray dark:text-lightGray focus:border-none placeholder:text-[#515151] focus:ring-0 focus:outline-none dark:bg-lightBlack"
            value={search}
            onChange={handleSearch}
          />
          <Link
            to="#"
            className="absolute top-5 right-4 text-lightGray dark:text-gray"
          >
            <FaSearch className="w-4 h-4 " />
          </Link>
        </form>
      </div>

      {/*Popular Post */}
      <div className="bg-whiteSmoke dark:bg-normalBlack w-full p-4 sm:p-8 2xl:p-10 mt-5 2xl:mt-[30px] rounded-md ">
        <h2 className="text-lg sm:text-xl md:text-[22px] lg:text-2xl leading-6 md:leading-7 lg:leading-[30px] text-lightBlack dark:text-white relative before:w-[50px] before:h-[1px] before:bg-lightBlack dark:before:bg-white before:absolute before:left-0 before:top-9 font-Garamond font-semibold">
          Popular Post
        </h2>
        <div className="pt-10">
          <Link
            to="/blog_details"
            className="flex items-center"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <img
              src="/images/inner/details-post-1.jpg"
              className=" mr-3 2xl:mr-5 "
              alt=""
            />
            <div className="text-left">
              <h4 className="text-base 2xl:text-lg leading-6 text-[#101010] dark:text-white font-medium font-Garamond hover:underline underline-offset-4">
                5 Discount Period every year for Valuable Clients
              </h4>
              <p className="text-sm md:text-[13px] 2xl:text-sm leading-[26px] font-Lora text-gray dark:text-lightGray font-normal">
                August 10, 2023
              </p>
            </div>
          </Link>
          <Link
            to="/blog_details"
            className="mt-5 md:mt-[30px] flex items-center"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <img
              src="/images/inner/details-post-2.jpg"
              className=" mr-3 2xl:mr-5 "
              alt=""
            />
            <div className="text-left">
              <h4 className="text-base 2xl:text-lg leading-6 text-[#101010] dark:text-white font-medium font-Garamond hover:underline underline-offset-4">
                Pre Booking Benifits for the Traveller on our Hotel
              </h4>
              <p className="text-sm md:text-[13px] 2xl:text-sm leading-[26px] font-Lora text-gray dark:text-lightGray font-normal">
                October 10, 2023
              </p>
            </div>
          </Link>
          <Link
            to="/blog_details"
            className="mt-5 md:mt-[30px] flex items-center"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <img
              src="/images/inner/details-post-3.jpg"
              className=" mr-3 2xl:mr-5 "
              alt=""
            />
            <div className="text-left">
              <h4 className="text-base 2xl:text-lg leading-6 text-[#101010] dark:text-white font-medium font-Garamond hover:underline underline-offset-4">
                How to Book a Room online Step by Step Guide
              </h4>
              <p className="text-sm md:text-[13px] 2xl:text-sm leading-[26px] font-Lora text-gray dark:text-lightGray font-normal">
                September 10, 2023
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-whiteSmoke dark:bg-normalBlack w-full p-4 sm:p-8 2xl:p-10 mt-5 2xl:mt-[30px] rounded-md ">
        <h2 className="text-lg sm:text-xl md:text-[22px] lg:text-2xl leading-6 md:leading-7 lg:leading-[30px] text-lightBlack dark:text-white relative before:w-[50px] before:h-[1px] before:bg-lightBlack dark:before:bg-white before:absolute before:left-0 before:top-9 font-Garamond font-semibold">
          Categories
        </h2>
        <div className="pt-10">
          <ul className=" " data-aos="fade-up" data-aos-duration="1000">
            { categories !== null ?
              categories.map((c,i)=>(
                <li className="flex items-center group transition-all duration-300 border-b-[1px] cursor-pointer border-lightGray dark:border-gray pb-3" key={i}>
                  <BiChevronsRight
                    size={16}
                    className="text-lightBlack dark:text-white group-hover:text-khaki mr-2"
                  />
                  <span className="text-sm xl:text-base 2xl:text-lg leading-[26px] text-lightBlack group-hover:text-khaki font-medium font-Garamond dark:text-white"
                  onClick={()=>handleCategory(c.name)}
                  >
                    {c.name}
                  </span>
                </li>
              ))
              :
              ""
            }
          </ul>
        </div>
      </div>
      {/* Tags */}
      <div className="bg-whiteSmoke dark:bg-normalBlack w-full p-4 sm:p-8 2xl:p-10 mt-5 2xl:mt-[30px] rounded-md ">
        <h2 className="text-lg sm:text-xl md:text-[22px] lg:text-2xl leading-6 md:leading-7 lg:leading-[30px] text-lightBlack dark:text-white relative before:w-[50px] before:h-[1px] before:bg-lightBlack dark:before:bg-white before:absolute before:left-0 before:top-9 font-Garamond font-semibold">
          Tag
        </h2>
        <div className="pt-10 " data-aos="fade-up" data-aos-duration="1000">
          <div className="grid items-center grid-cols-2 md:grid-cols-1 2xl:grid-cols-2 gap-3 sm:gap-5  ">
            { tags !== null ?
              tags.map((t,i)=>(
              <div className="px-2 sm:px-4 py-2 bg-white dark:bg-lightBlack hover:bg-khaki transition-all duration-300 group" id={i} key={i}
              onClick={(e)=>handleTag(e,t.name)}>
                <h1 className="text-sm sm:text-base leading-6 lg:leading-[30px] font-Garamond text-[#101010] dark:text-white font-medium  group-hover:text-white">
                  {t.name}
                </h1>
              </div>
              ))
              :
              ""
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogSideBar;
